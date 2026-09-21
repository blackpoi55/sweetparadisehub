"use client";

// 📡 หน้าสตรีมเมอร์ — ล็อกอินด้วยรหัส 6 หลักจากแอพ "สตรีมเมอร์" ในโทรศัพท์ในเกม
// การ์ด 1 ใบ = ลิงก์ webhook 1 ลิงก์ → วางใน TikFinity (Actions → Trigger WebHook)
// ใช้ได้เฉพาะคนที่แอดมินให้สิทธิ์ (ไวท์ลิสต์ในเกม) · เอฟเฟกต์เกิดกับตัวสตรีมเมอร์เท่านั้น

import { useCallback, useEffect, useMemo, useState } from "react";
import { streamerEmotes as EMOTES } from "@/json/streamerEmotes";

const KINDS = [
  { kind: "dance", icon: "💃", label: "เต้น", hint: "ตัวละครเต้นท่าที่เลือก" },
  { kind: "soak", icon: "💦", label: "โดนฉีดน้ำ", hint: "เปียกทั้งตัว คนรอบ ๆ เห็นน้ำกระจาย" },
  { kind: "launch", icon: "🌊", label: "กระเด็น", hint: "โดนน้ำแรงดันลอยไปข้างหลัง" },
  { kind: "slap", icon: "👋", label: "โดนตบล้ม", hint: "ล้มกลิ้งไปด้านข้าง จอสั่น" },
  { kind: "firework", icon: "🎆", label: "พลุ", hint: "ยิงพลุเหนือตัวละคร คนรอบ ๆ เห็นด้วย" },
  { kind: "text", icon: "💬", label: "ข้อความลอย", hint: "ลอยขึ้นบนจอคุณคนเดียว คนอื่นไม่เห็น" },
];
const KIND_OF = Object.fromEntries(KINDS.map((k) => [k.kind, k]));
const TEXT_STYLES = [
  { v: "pink", label: "ชมพู", cls: "from-pink-200 to-pink-500" },
  { v: "gold", label: "ทอง", cls: "from-yellow-100 to-amber-400" },
  { v: "blue", label: "ฟ้า", cls: "from-sky-100 to-sky-500" },
  { v: "green", label: "เขียว", cls: "from-emerald-100 to-emerald-500" },
  { v: "white", label: "ขาว", cls: "from-white to-slate-300" },
  { v: "rainbow", label: "รุ้ง", cls: "from-pink-400 via-yellow-300 to-sky-400" },
];
const FW_COLORS = [
  { v: "rainbow", label: "🌈 สุ่มสี" },
  { v: "pink", label: "ชมพู" },
  { v: "gold", label: "ทอง" },
  { v: "blue", label: "ฟ้า" },
  { v: "green", label: "เขียว" },
];

const card = "rounded-2xl border border-white/10 bg-black/45 p-4 md:p-5 backdrop-blur";
const btnPrimary =
  "inline-flex items-center justify-center gap-1.5 rounded-xl bg-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 transition hover:bg-pink-400 disabled:cursor-not-allowed disabled:opacity-50";
const btnGhost =
  "inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-pink-50 transition hover:bg-white/10 disabled:opacity-50";
const field =
  "w-full rounded-xl border border-white/10 bg-slate-900/70 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-pink-400 focus:ring-2 focus:ring-pink-500/30";
const labelCls = "mb-1.5 block text-xs font-medium text-pink-200/70";

function blank(kind = "dance") {
  const params =
    kind === "dance"
      ? { emote: "", sec: 6 }
      : kind === "slap"
        ? { power: 1 }
        : kind === "firework"
          ? { color: "rainbow", n: 3 }
          : kind === "text"
            ? { text: "", style: "pink", sec: 3 }
            : {};
  return { name: "", kind, params, times: 1, cooldown: kind === "text" ? 1 : 3 };
}

async function api(url, init) {
  const res = await fetch(url, { ...init, headers: { "content-type": "application/json", ...(init?.headers || {}) } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || `ผิดพลาด (${res.status})`), { status: res.status });
  return data;
}

function describe(e) {
  const p = e.params || {};
  if (e.kind === "dance") return `${EMOTES.find((x) => x.name === p.emote)?.label ?? p.emote} · ${p.sec} วิ`;
  if (e.kind === "slap") return `แรง ${p.power}x`;
  if (e.kind === "firework") return `${p.n} ลูก · ${FW_COLORS.find((c) => c.v === p.color)?.label ?? p.color}`;
  if (e.kind === "text") return `“${p.text}”`;
  return KIND_OF[e.kind]?.hint;
}

function Msg({ bad, children }) {
  return (
    <p
      className={`rounded-lg border px-3 py-2 text-sm ${
        bad ? "border-red-500/30 bg-red-500/10 text-red-200" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
      }`}
    >
      {children}
    </p>
  );
}

function Range({ label, unit, min, max, step = 1, value, onChange }) {
  return (
    <div>
      <label className={labelCls}>
        {label}: <span className="text-pink-300">{value} {unit}</span>
      </label>
      <input type="range" className="w-full accent-pink-500" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}

// ───────────────────────── ล็อกอิน ─────────────────────────

function Login({ onDone }) {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const digits = code.replace(/\D/g, "");
  async function submit(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await api("/api/stream/login", { method: "POST", body: JSON.stringify({ code: digits }) });
      onDone();
    } catch (x) {
      setErr(x.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="mx-auto max-w-md py-6">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-500 text-3xl shadow-lg shadow-pink-500/30">📡</div>
        <h1 className="text-2xl font-bold text-white">สตรีมเมอร์</h1>
        <p className="mt-1 text-sm text-pink-200/70">เชื่อมไลฟ์ TikTok กับตัวละครของคุณในเกม</p>
      </div>
      <form onSubmit={submit} className={`${card} space-y-4`}>
        <div>
          <label className={labelCls} htmlFor="code">รหัสเชื่อมต่อ 6 หลัก</label>
          <input
            id="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            className={`${field} text-center font-mono text-3xl tracking-[0.4em]`}
            placeholder="000000"
            maxLength={7}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^\d ]/g, ""))}
          />
        </div>
        {err && <Msg bad>{err}</Msg>}
        <button className={`${btnPrimary} w-full`} disabled={busy || digits.length !== 6}>
          {busy ? "กำลังเชื่อมต่อ…" : "เชื่อมต่อ"}
        </button>
      </form>
      <ol className="mt-6 space-y-2 text-sm text-pink-200/70">
        <li>1. เข้าเกม เปิดโทรศัพท์ → แอพ 📡 สตรีมเมอร์</li>
        <li>2. กด “ขอรหัส” แล้วเอาตัวเลขมาใส่ที่นี่ (ใช้ได้ครั้งเดียว · 10 นาที)</li>
        <li>3. ไม่เห็นแอพ = ยังไม่มีสิทธิ์ ติดต่อแอดมินในเกม</li>
      </ol>
    </div>
  );
}

// ───────────────────────── ฟอร์มการ์ด ─────────────────────────

function EffectForm({ initial, onCancel, onSaved }) {
  const [d, setD] = useState(initial);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("dance");
  const setP = (k, v) => setD((x) => ({ ...x, params: { ...x.params, [k]: v } }));

  const emotes = useMemo(() => {
    const s = q.trim().toLowerCase();
    return EMOTES.filter((e) => (cat === "all" || e.cat === cat) && (!s || e.label.toLowerCase().includes(s)));
  }, [q, cat]);

  async function save() {
    setErr("");
    setBusy(true);
    try {
      const body = JSON.stringify({ name: d.name, kind: d.kind, params: d.params, times: d.times, cooldown: d.cooldown });
      if (d.id) await api(`/api/stream/effects/${d.id}`, { method: "PATCH", body });
      else await api("/api/stream/effects", { method: "POST", body });
      onSaved();
    } catch (x) {
      setErr(x.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`${card} space-y-5 border-pink-500/30`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">{d.id ? "✏️ แก้การ์ด" : "➕ การ์ดใหม่"}</h2>
        <button onClick={onCancel} className={btnGhost}>ยกเลิก</button>
      </div>

      {!d.id && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {KINDS.map((k) => (
            <button
              key={k.kind}
              onClick={() => setD({ ...blank(k.kind), name: d.name })}
              className={`rounded-xl border p-3 text-center transition ${
                d.kind === k.kind ? "border-pink-400 bg-pink-500/15" : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              <div className="text-2xl">{k.icon}</div>
              <div className="mt-1 text-xs font-semibold text-white">{k.label}</div>
            </button>
          ))}
        </div>
      )}
      <p className="text-sm text-pink-200/70">{KIND_OF[d.kind].icon} {KIND_OF[d.kind].hint}</p>

      {d.kind === "dance" && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {[["dance", "💃 เต้น"], ["emote", "😊 อีโมท"], ["pose", "📸 โพส"], ["all", "ทั้งหมด"]].map(([c, l]) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${cat === c ? "bg-pink-500 text-white" : "bg-white/5 text-pink-100 hover:bg-white/10"}`}
              >
                {l}
              </button>
            ))}
            <input className={`${field} max-w-[14rem] py-1.5`} placeholder="🔎 ค้นหาท่า" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="grid max-h-64 grid-cols-2 gap-1.5 overflow-y-auto rounded-xl border border-white/10 bg-slate-900/40 p-2 sm:grid-cols-3 lg:grid-cols-4">
            {emotes.map((e) => (
              <button
                key={e.name}
                onClick={() => setP("emote", e.name)}
                className={`truncate rounded-lg px-2.5 py-2 text-left text-sm ${d.params.emote === e.name ? "bg-pink-500 text-white" : "bg-white/5 text-pink-50 hover:bg-white/10"}`}
              >
                {e.label}
              </button>
            ))}
            {emotes.length === 0 && <p className="col-span-full p-3 text-sm text-slate-500">ไม่พบท่า</p>}
          </div>
          <Range label="เต้นนาน" unit="วิ" min={1} max={20} value={Number(d.params.sec ?? 6)} onChange={(v) => setP("sec", v)} />
        </div>
      )}

      {d.kind === "slap" && (
        <Range label="แรงตบ" unit="x" step={0.5} min={0.5} max={2} value={Number(d.params.power ?? 1)} onChange={(v) => setP("power", v)} />
      )}

      {d.kind === "firework" && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {FW_COLORS.map((c) => (
              <button
                key={c.v}
                onClick={() => setP("color", c.v)}
                className={`rounded-lg px-3 py-1.5 text-sm ${d.params.color === c.v ? "bg-pink-500 text-white" : "bg-white/5 text-pink-50 hover:bg-white/10"}`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <Range label="จำนวนลูก" unit="ลูก" min={1} max={6} value={Number(d.params.n ?? 3)} onChange={(v) => setP("n", v)} />
        </div>
      )}

      {d.kind === "text" && (
        <div className="space-y-3">
          <div>
            <label className={labelCls}>ข้อความ (ไม่เกิน 80 ตัวอักษร · ขึ้นบนจอคุณคนเดียว)</label>
            <input
              className={field}
              placeholder="เช่น ขอบคุณสำหรับกุหลาบ 🌹"
              value={String(d.params.text ?? "")}
              onChange={(e) => setP("text", Array.from(e.target.value).slice(0, 80).join(""))}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {TEXT_STYLES.map((s) => (
              <button
                key={s.v}
                onClick={() => setP("style", s.v)}
                className={`rounded-lg border bg-white/5 px-3 py-1.5 text-sm ${d.params.style === s.v ? "border-pink-400" : "border-white/10"}`}
              >
                <span className={`bg-gradient-to-b ${s.cls} bg-clip-text font-black text-transparent`}>{s.label}</span>
              </button>
            ))}
          </div>
          <Range label="ลอยนาน" unit="วิ" min={1} max={8} value={Number(d.params.sec ?? 3)} onChange={(v) => setP("sec", v)} />
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelCls}>ชื่อการ์ด (ไว้จำเอง)</label>
          <input className={field} placeholder={`${KIND_OF[d.kind].icon} ${KIND_OF[d.kind].label}`} value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} />
        </div>
        <Range label="เล่นซ้ำต่อครั้ง" unit="รอบ" min={1} max={5} value={d.times} onChange={(v) => setD({ ...d, times: v })} />
        <Range label="คูลดาวน์" unit="วิ" min={0} max={120} value={d.cooldown} onChange={(v) => setD({ ...d, cooldown: v })} />
      </div>

      {err && <Msg bad>{err}</Msg>}
      <button onClick={save} className={`${btnPrimary} w-full`} disabled={busy}>
        {busy ? "กำลังบันทึก…" : d.id ? "บันทึก" : "สร้างการ์ด"}
      </button>
    </div>
  );
}

// ───────────────────────── การ์ด ─────────────────────────

function EffectCard({ e, onEdit, onChanged, flash }) {
  const [busy, setBusy] = useState(false);
  async function run(fn, ok) {
    setBusy(true);
    try {
      await fn();
      if (ok) flash(ok);
      onChanged();
    } catch (x) {
      flash(x.message, true);
    } finally {
      setBusy(false);
    }
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(e.url);
      flash("ก๊อปลิงก์แล้ว — ไปวางใน TikFinity");
    } catch {
      flash("ก๊อปไม่ได้ — กดค้างที่ลิงก์แล้วก๊อปเอง", true);
    }
  }
  const k = KIND_OF[e.kind] || KINDS[0];
  return (
    <div className={`${card} space-y-3 ${e.enabled ? "" : "opacity-60"}`}>
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-2xl">{k.icon}</div>
        <div className="min-w-0 flex-1">
          <div className="truncate font-bold text-white">{e.name}</div>
          <div className="truncate text-sm text-pink-200/70">{describe(e)}</div>
          <div className="mt-0.5 text-xs text-slate-500">×{e.times} · คูลดาวน์ {e.cooldown} วิ</div>
        </div>
        <label className="flex cursor-pointer items-center gap-1.5 text-xs text-pink-200/70">
          <input
            type="checkbox"
            className="accent-pink-500"
            checked={e.enabled}
            disabled={busy}
            onChange={() => run(() => api(`/api/stream/effects/${e.id}`, { method: "PATCH", body: JSON.stringify({ enabled: !e.enabled }) }))}
          />
          เปิด
        </label>
      </div>
      <button
        onClick={copy}
        className="block w-full truncate rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-left font-mono text-xs text-sky-300 hover:border-sky-400/50"
        title="กดเพื่อก๊อป"
      >
        {e.url}
      </button>
      <div className="flex flex-wrap gap-2">
        <button onClick={copy} className={btnGhost}>📋 ก๊อปลิงก์</button>
        <button
          disabled={busy}
          onClick={() => run(() => api(`/api/stream/effects/${e.id}/test`, { method: "POST" }), `ยิง “${e.name}” แล้ว — ดูในเกม`)}
          className={`${btnPrimary} px-3 py-1.5 text-xs`}
        >
          ▶ ลองยิง
        </button>
        <button onClick={onEdit} className={btnGhost}>✏️ แก้</button>
        <button
          disabled={busy}
          onClick={() => {
            if (confirm(`ลบการ์ด “${e.name}”? ลิงก์นี้ใน TikFinity จะใช้ไม่ได้`)) run(() => api(`/api/stream/effects/${e.id}`, { method: "DELETE" }), "ลบแล้ว");
          }}
          className={`${btnGhost} ml-auto text-red-300`}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

// ───────────────────────── หน้า ─────────────────────────

export default function StreamerPage() {
  const [me, setMe] = useState(null);
  const [state, setState] = useState("loading");
  const [draft, setDraft] = useState(null);
  const [toast, setToast] = useState(null);
  const [guide, setGuide] = useState(false);

  const flash = useCallback((m, bad) => {
    setToast({ m, bad });
    setTimeout(() => setToast((t) => (t?.m === m ? null : t)), 3500);
  }, []);

  const load = useCallback(async () => {
    try {
      setMe(await api("/api/stream/me"));
      setState("ready");
    } catch (x) {
      if (x.status === 401) setState("login");
      else {
        setState((s) => (s === "loading" ? "login" : s));
        flash(x.message, true);
      }
    }
  }, [flash]);

  useEffect(() => {
    load();
  }, [load]);

  async function logout(all) {
    await fetch(`/api/stream/logout${all ? "?all=1" : ""}`, { method: "POST" });
    setMe(null);
    setState("login");
  }
  async function rotate() {
    if (!confirm("เปลี่ยนลิงก์ทั้งหมด? ลิงก์เก่าใน TikFinity จะใช้ไม่ได้ ต้องก๊อปไปวางใหม่ทุกอัน")) return;
    try {
      await api("/api/stream/rotate", { method: "POST" });
      flash("เปลี่ยนลิงก์แล้ว — อย่าลืมไปแก้ใน TikFinity");
      load();
    } catch (x) {
      flash(x.message, true);
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      {state === "loading" && <p className="py-16 text-center text-pink-200/60">กำลังโหลด…</p>}
      {state === "login" && <Login onDone={load} />}
      {state === "ready" && me && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500 text-xl shadow-lg shadow-pink-500/30">📡</div>
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-white">สตรีมเมอร์</h1>
              <p className="truncate text-xs text-pink-200/70">
                {me.streamer.displayName || me.streamer.name} <span className="text-slate-500">@{me.streamer.name}</span>
              </p>
            </div>
            <button onClick={() => logout(false)} className={`${btnGhost} ml-auto`}>ออกจากระบบ</button>
          </div>

          {me.allowed === false && <Msg bad>⛔ สิทธิ์สตรีมเมอร์ของบัญชีนี้ถูกถอดแล้ว — เอฟเฟกต์จะไม่ทำงานจนกว่าแอดมินจะเพิ่มกลับ</Msg>}

          <div className={`${card} flex flex-wrap items-center gap-3`}>
            <div className="flex-1 text-sm text-pink-50">
              <b>การ์ด 1 ใบ = ลิงก์ 1 ลิงก์</b> เอาไปวางใน TikFinity แล้วเลือกว่าเกิดตอนไหน (ของขวัญ / คอมเมนต์ / ไลก์ / ฟอล)
              <br />
              <span className="text-pink-200/60">เอฟเฟกต์เกิดกับตัวละครคุณเท่านั้น · ต้องอยู่ในเกมตอนไลฟ์</span>
            </div>
            <button onClick={() => setGuide((g) => !g)} className={btnGhost}>📖 วิธีตั้ง TikFinity</button>
            <button onClick={() => setDraft(blank())} className={btnPrimary} disabled={!!draft}>➕ การ์ดใหม่</button>
          </div>

          {guide && (
            <div className={`${card} space-y-2 text-sm text-pink-50`}>
              <h3 className="font-bold text-white">ตั้งค่า TikFinity (ครั้งเดียว)</h3>
              <ol className="list-decimal space-y-1.5 pl-5">
                <li>เปิด TikFinity แล้วเชื่อมกับบัญชี TikTok ของคุณ</li>
                <li>ไปที่ <b>Actions &amp; Events</b> → <b>Create new Action</b> → ติ๊ก <b>Trigger WebHook</b> แล้ววางลิงก์ของการ์ดที่ต้องการ</li>
                <li>ไปแท็บ <b>Events</b> → <b>Create new Event</b> → เลือกว่าเกิดเมื่อไหร่ (เช่น Gift = Rose, Follow, Like ครบ 100, คอมเมนต์ “!เต้น”) แล้วเลือก Action จากข้อ 2</li>
                <li>เข้าเกม แล้วกด “▶ ลองยิง” บนการ์ดที่นี่ ตัวละครต้องขยับ = ใช้ได้</li>
              </ol>
              <p className="text-pink-200/60">
                ของขวัญมารัว ๆ ไม่พัง — มีคูลดาวน์ต่อการ์ดและคิวในเกม · ลิงก์หลุดไปให้คนอื่น กด “เปลี่ยนลิงก์ทั้งหมด” ด้านล่าง
              </p>
            </div>
          )}

          {draft && (
            <EffectForm
              key={draft.id ?? draft.kind}
              initial={draft}
              onCancel={() => setDraft(null)}
              onSaved={() => {
                setDraft(null);
                flash("บันทึกแล้ว");
                load();
              }}
            />
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {me.effects.map((e) => (
              <EffectCard
                key={e.id}
                e={e}
                flash={flash}
                onChanged={load}
                onEdit={() => {
                  setDraft({ id: e.id, name: e.name, kind: e.kind, params: e.params, times: e.times, cooldown: e.cooldown });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            ))}
          </div>
          {me.effects.length === 0 && !draft && <p className="py-10 text-center text-pink-200/60">ยังไม่มีการ์ด — กด “➕ การ์ดใหม่” เพื่อเริ่ม</p>}

          <div className="flex flex-wrap justify-end gap-2 border-t border-white/10 pt-4">
            <button onClick={rotate} className={btnGhost}>🔄 เปลี่ยนลิงก์ทั้งหมด</button>
            <button onClick={() => logout(true)} className={btnGhost}>🚪 ออกจากระบบทุกเครื่อง</button>
          </div>
        </div>
      )}

      {toast && (
        <div
          className={`fixed bottom-4 left-1/2 z-50 max-w-[90vw] -translate-x-1/2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-lg ${
            toast.bad ? "bg-red-600" : "bg-emerald-600"
          }`}
        >
          {toast.m}
        </div>
      )}
    </div>
  );
}
