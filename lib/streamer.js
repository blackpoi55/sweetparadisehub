// lib/streamer.js — 📡 ระบบสตรีมเมอร์ TikTok (ฝั่งผู้เล่น · เว็บสาธารณะ)
//
//   TikTok LIVE → TikFinity ("Trigger WebHook") → /api/stream/hook/<uid>/<token>/<cardId>
//   → เช็คไวท์ลิสต์ → Open Cloud MessagingService (StreamFx_v1)
//   → StreamerServer ในเซิร์ฟที่สตรีมเมอร์อยู่ → เอฟเฟกต์บนตัวสตรีมเมอร์คนเดียว (+ เช็คคูลดาวน์ต่อการ์ด)
//
// เว็บนี้ไม่มีฐานข้อมูล — ทุกอย่างอยู่ใน DataStore "StreamerLink_v1" ของเกม:
//   whitelist     = { "<userId>": { name, by, at } }   ← แอดมินแก้ (ในเกม / เว็บแอดมิน) · เว็บนี้อ่านอย่างเดียว
//   code_<6 หลัก> = { u, name, dn, exp }                ← เกมเขียน · เว็บนี้อ่านแล้วลบ (ใช้ได้ครั้งเดียว)
//   s_<userId>    = { name, dn, token, ver, effects }  ← เว็บนี้เขียน (การ์ดเอฟเฟกต์ของสตรีมเมอร์)
//
// ☠️ key ที่ใช้ต้องแคบที่สุด: DataStore เขียน/ลบได้เฉพาะ StreamerLink_v1 + Messaging publish
//    (ROBLOX_STREAM_API_KEY แยกจาก ROBLOX_API_KEY ที่อ่านได้อย่างเดียว) — เว็บนี้เปิดให้ทุกคนเข้า
// ☠️ ห้ามให้เงิน/ไอเทมในเกมจากของขวัญ TikTok · ห้ามส่งชื่อ/ข้อความคนดูเข้าเกม
// ☠️ ห้ามโชว์ลิงก์เว็บนี้ในเกม — ในเกมมีแค่รหัส

import crypto from "node:crypto";
import { streamerEmotes } from "@/json/streamerEmotes";

const UNIVERSE = process.env.ROBLOX_UNIVERSE_ID;
const KEY = () => process.env.ROBLOX_STREAM_API_KEY || process.env.ROBLOX_API_KEY;
const DS_BASE = `https://apis.roblox.com/datastores/v1/universes/${UNIVERSE}/standard-datastores/datastore/entries/entry`;
const MSG_URL = `https://apis.roblox.com/messaging-service/v1/universes/${UNIVERSE}/topics/StreamFx_v1`; // ☠️ ตรงกับ STREAM_TOPIC ในเกม
const STORE = "StreamerLink_v1";

export const COOKIE = "sp_streamer";
const SESSION_TTL = 60 * 60 * 24 * 30;
export const MAX_EFFECTS = 40;

export class StreamError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

// ───────────────────────── ชนิดเอฟเฟกต์ ─────────────────────────

export const KINDS = ["dance", "soak", "launch", "slap", "firework", "text"];
const TEXT_STYLES = ["pink", "gold", "blue", "green", "white", "rainbow"];
const FW_COLORS = ["rainbow", "pink", "gold", "blue", "green"];
const EMOTE_SET = new Set(streamerEmotes.map((e) => e.name));
const KIND_LABEL = { dance: "💃 เต้น", soak: "💦 โดนฉีดน้ำ", launch: "🌊 กระเด็น", slap: "👋 โดนตบล้ม", firework: "🎆 พลุ", text: "💬 ข้อความลอย" };

/** ตัดตาม "ตัวอักษร" — ภาษาไทย/อีโมจิไม่ขาดครึ่งตัว */
const clampChars = (s, n) => Array.from(String(s ?? "").replace(/[\r\n\t]+/g, " ")).slice(0, n).join("");
function num(v, lo, hi, d) {
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : d;
}

/** ทำความสะอาดการ์ดจากหน้าเว็บ — ค่าที่ผ่านตรงนี้ถูกส่งเข้าเกม (เกม clamp ซ้ำอีกชั้น) */
export function sanitizeEffect(input, id) {
  const kind = String(input?.kind ?? "");
  if (!KINDS.includes(kind)) throw new StreamError("ไม่รู้จักชนิดเอฟเฟกต์");
  const p = input?.params && typeof input.params === "object" ? input.params : {};
  let params = {};
  if (kind === "dance") {
    if (!EMOTE_SET.has(String(p.emote))) throw new StreamError("เลือกท่าเต้นก่อน");
    params = { emote: String(p.emote), sec: Math.round(num(p.sec, 1, 20, 6)) };
  } else if (kind === "slap") {
    params = { power: num(p.power, 0.5, 2, 1) };
  } else if (kind === "firework") {
    params = { color: FW_COLORS.includes(p.color) ? p.color : "rainbow", n: Math.round(num(p.n, 1, 6, 3)) };
  } else if (kind === "text") {
    const text = clampChars(String(p.text ?? "").trim(), 80);
    if (!text) throw new StreamError("พิมพ์ข้อความก่อน");
    params = { text, style: TEXT_STYLES.includes(p.style) ? p.style : "pink", sec: Math.round(num(p.sec, 1, 8, 3)) };
  }
  return {
    id: id || crypto.randomBytes(6).toString("base64url"),
    name: clampChars(String(input?.name ?? "").trim(), 40) || KIND_LABEL[kind],
    kind,
    params,
    times: Math.round(num(input?.times, 1, 5, 1)),
    cooldown: Math.round(num(input?.cooldown, 0, 3600, 3)),
    enabled: input?.enabled !== false,
  };
}

// ───────────────────────── Open Cloud ─────────────────────────

function ensureEnv() {
  if (!KEY() || !UNIVERSE) throw new StreamError("เว็บยังไม่ได้ตั้งค่า Roblox", 503);
}

async function fetchRetry(url, init, retries = 2) {
  let last;
  for (let i = 0; i <= retries; i++) {
    const res = await fetch(url, init);
    if (res.status !== 429 && res.status < 500) return res;
    last = res;
    await new Promise((r) => setTimeout(r, 300 * 2 ** i));
  }
  return last;
}

const entryUrl = (key, extra = {}) =>
  `${DS_BASE}?${new URLSearchParams({ datastoreName: STORE, scope: "global", entryKey: key, ...extra })}`;

async function robloxFail(res) {
  const t = await res.text().catch(() => "");
  if (res.status === 403) return new StreamError("เว็บยังไม่มีสิทธิ์เขียนข้อมูลสตรีมเมอร์ (API key) — แจ้งแอดมิน", 503);
  return new StreamError(`Roblox ${res.status}: ${t.slice(0, 200)}`, 502);
}

/** อ่านคีย์ → { value, version } · ไม่มีคีย์ = { value: null } */
async function readEntry(key) {
  ensureEnv();
  const res = await fetchRetry(entryUrl(key), { headers: { "x-api-key": KEY() }, cache: "no-store" });
  if (res.status === 404) return { value: null, version: null };
  if (!res.ok) throw await robloxFail(res);
  return { value: await res.json(), version: res.headers.get("roblox-entry-version") };
}

/** เขียนคีย์ · matchVersion = กันสองแท็บเขียนทับกัน */
async function writeEntry(key, value, matchVersion) {
  ensureEnv();
  const body = JSON.stringify(value);
  const extra = matchVersion ? { matchVersion } : { exclusiveCreate: "true" };
  const res = await fetchRetry(entryUrl(key, extra), {
    method: "POST",
    headers: {
      "x-api-key": KEY(),
      "content-type": "application/json",
      "content-md5": crypto.createHash("md5").update(body).digest("base64"),
    },
    body,
    cache: "no-store",
  });
  if (res.status === 412 || res.status === 409) throw new StreamError("ข้อมูลเพิ่งถูกแก้จากอีกหน้าต่าง — โหลดใหม่แล้วลองอีกครั้ง", 409);
  if (!res.ok) throw await robloxFail(res);
}

async function deleteEntry(key) {
  ensureEnv();
  const res = await fetchRetry(entryUrl(key), { method: "DELETE", headers: { "x-api-key": KEY() }, cache: "no-store" });
  if (!res.ok && res.status !== 404) throw await robloxFail(res);
}

async function publish(payload) {
  ensureEnv();
  const res = await fetchRetry(MSG_URL, {
    method: "POST",
    headers: { "x-api-key": KEY(), "content-type": "application/json" },
    body: JSON.stringify({ message: JSON.stringify(payload) }), // เกม JSONDecode เอง
    cache: "no-store",
  });
  if (!res.ok) throw await robloxFail(res);
}

// ───────────────────────── ไวท์ลิสต์ (อ่านอย่างเดียว) ─────────────────────────

let wlCache = null;
export async function isWhitelisted(uid) {
  if (!wlCache || Date.now() - wlCache.at > 30_000) {
    const { value } = await readEntry("whitelist");
    // ไวท์ลิสต์ว่างเกมเซฟเป็น [] (ตาราง Lua ว่าง)
    wlCache = { at: Date.now(), data: value && typeof value === "object" && !Array.isArray(value) ? value : {} };
  }
  return Object.prototype.hasOwnProperty.call(wlCache.data, String(uid));
}

// ───────────────────────── ข้อมูลสตรีมเมอร์ ─────────────────────────

const profCache = new Map(); // uid → { at, value } · webhook ยิงถี่ ไม่อ่าน DataStore ทุกครั้ง
const newToken = () => crypto.randomBytes(18).toString("base64url");

export async function getProfile(uid) {
  const { value, version } = await readEntry(`s_${uid}`);
  if (value) profCache.set(String(uid), { at: Date.now(), value });
  return { value, version };
}

async function getProfileCached(uid) {
  const c = profCache.get(String(uid));
  if (c && Date.now() - c.at < 10_000) return c.value;
  return (await getProfile(uid)).value;
}

/** อ่าน-แก้-เขียน s_<uid> · fn คืนค่าใหม่ */
export async function updateProfile(uid, fn) {
  const { value, version } = await getProfile(uid);
  if (!value) throw new StreamError("ไม่พบบัญชีสตรีมเมอร์ — เข้าสู่ระบบใหม่", 401);
  const next = fn(structuredClone(value));
  await writeEntry(`s_${uid}`, next, version);
  profCache.set(String(uid), { at: Date.now(), value: next });
  return next;
}

/** แลกรหัส 6 หลักจากแอพในเกม · ลบรหัสทันที (ใช้ได้ครั้งเดียว) */
export async function redeemCode(raw) {
  const code = String(raw ?? "").replace(/\D/g, "");
  if (code.length !== 6) throw new StreamError("รหัสต้องเป็นตัวเลข 6 หลัก");
  const { value: rec } = await readEntry(`code_${code}`);
  if (!rec || typeof rec.u !== "number") throw new StreamError("ไม่พบรหัสนี้ — ขอรหัสใหม่ในแอพสตรีมเมอร์ในเกม");
  await deleteEntry(`code_${code}`);
  if (rec.exp < Date.now() / 1000) throw new StreamError("รหัสหมดอายุแล้ว — ขอรหัสใหม่ในเกม");
  if (!(await isWhitelisted(rec.u))) throw new StreamError("บัญชีนี้ยังไม่มีสิทธิ์ใช้ระบบสตรีมเมอร์ — ติดต่อแอดมิน", 403);

  const uid = String(rec.u);
  const { value, version } = await getProfile(uid);
  const prof = value
    ? { ...value, name: rec.name ?? value.name, dn: rec.dn ?? value.dn, login: Date.now() }
    : { name: rec.name ?? uid, dn: rec.dn ?? "", token: newToken(), ver: 1, effects: [], login: Date.now() };
  await writeEntry(`s_${uid}`, prof, version);
  profCache.set(uid, { at: Date.now(), value: prof });
  return { uid, prof };
}

export function rotateToken(prof) {
  prof.token = newToken();
  return prof;
}

// ───────────────────────── session (cookie ลงลายเซ็น) ─────────────────────────

function secret() {
  // ใช้ STREAMER_SESSION_SECRET ถ้าตั้งไว้ · ไม่ตั้ง = แปลงจาก API key (อยู่ฝั่งเซิร์ฟอย่างเดียว ไม่หลุดไปเบราว์เซอร์)
  const s = process.env.STREAMER_SESSION_SECRET || `sp-streamer:${KEY() || ""}`;
  return crypto.createHash("sha256").update(s).digest();
}
const sign = (data) => crypto.createHmac("sha256", secret()).update(data).digest("base64url");

export function createSession(uid, ver) {
  const data = Buffer.from(JSON.stringify({ u: String(uid), v: ver, exp: Math.floor(Date.now() / 1000) + SESSION_TTL })).toString("base64url");
  return `${data}.${sign(data)}`;
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL,
};

/** cookie → { uid, prof } หรือ null (เช็ค ver ให้ "ออกจากระบบทุกเครื่อง" ได้) */
export async function readSession(req) {
  const raw = req.cookies.get(COOKIE)?.value || "";
  const [data, sig] = raw.split(".");
  if (!data || !sig) return null;
  const good = Buffer.from(sign(data));
  const got = Buffer.from(sig);
  if (good.length !== got.length || !crypto.timingSafeEqual(good, got)) return null;
  let s;
  try {
    s = JSON.parse(Buffer.from(data, "base64url").toString());
  } catch {
    return null;
  }
  if (!/^\d+$/.test(s.u) || s.exp < Date.now() / 1000) return null;
  const { value } = await getProfile(s.u);
  if (!value || value.ver !== s.v) return null;
  return { uid: s.u, prof: value };
}

// ───────────────────────── ยิงเอฟเฟกต์ ─────────────────────────

const burst = new Map();
/** กันยิงรัวต่อ instance (เกมมีคิว 20 + คูลดาวน์ต่อการ์ดอีกชั้น) */
export function rateOk(key, max = 8, windowMs = 10_000) {
  const now = Date.now();
  const arr = (burst.get(key) || []).filter((t) => now - t < windowMs);
  if (arr.length >= max) {
    burst.set(key, arr);
    return false;
  }
  arr.push(now);
  burst.set(key, arr);
  return true;
}

/** test = ปุ่มลองยิงบนเว็บ (ข้ามคูลดาวน์) */
export async function fire(uid, eff, test = false) {
  await publish({ u: Number(uid), k: eff.kind, p: eff.params || {}, n: eff.times || 1, e: eff.id, cd: test ? 0 : eff.cooldown || 0 });
}

/** webhook: หาโปรไฟล์ + การ์ดจาก URL · token ผิด = null */
export async function findHookEffect(uid, token, id) {
  if (!/^\d{1,20}$/.test(uid) || !/^[\w-]{16,40}$/.test(token) || !/^[\w-]{4,20}$/.test(id)) return null;
  const prof = await getProfileCached(uid);
  if (!prof?.token) return null;
  const a = Buffer.from(prof.token);
  const b = Buffer.from(token);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  return (prof.effects || []).find((e) => e.id === id) || null;
}

export function hookUrl(origin, uid, token, id) {
  return `${origin.replace(/\/$/, "")}/api/stream/hook/${uid}/${token}/${id}`;
}

export function errorResponse(err) {
  const status = err instanceof StreamError ? err.status : 500;
  return Response.json({ error: err instanceof Error ? err.message : "ผิดพลาด" }, { status });
}
