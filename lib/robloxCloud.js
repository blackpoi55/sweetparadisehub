// lib/robloxCloud.js
import { itemall } from "@/json/item";

const ROBLOX_API_KEY = process.env.ROBLOX_API_KEY;
const ROBLOX_UNIVERSE_ID = process.env.ROBLOX_UNIVERSE_ID;

const ROBLOX_DS_BASE = `https://apis.roblox.com/datastores/v1/universes/${ROBLOX_UNIVERSE_ID}`;
const DEFAULT_DS_NAME = process.env.ROBLOX_DATASTORE_NAME || "ItemAssignments_v1";
const DEFAULT_DS_SCOPE = process.env.ROBLOX_DATASTORE_SCOPE || "global";
const DEFAULT_ITEM_ENTRY_KEY =
  process.env.ROBLOX_ITEM_ASSIGNMENTS_ENTRY_KEY || "ItemAssignments_v1";

// รูป fallback ถ้าไม่มี icon ไอเท็ม
const ITEM_PLACEHOLDER_ICON = "/images/showprofile/lollipop.png";

function ensureEnv() {
  if (!ROBLOX_API_KEY || !ROBLOX_UNIVERSE_ID) {
    throw new Error(
      "ROBLOX_API_KEY หรือ ROBLOX_UNIVERSE_ID ไม่ได้เซ็ตใน .env.local"
    );
  }
}

/**
 * อ่านค่าจาก DataStore (handle 404 แบบไม่ทำให้ทั้งหน้าแตก)
 */
async function getDataStoreEntry(datastoreName, scope, entryKey) {
  ensureEnv();

  const params = new URLSearchParams({
    datastoreName,
    scope,
    entryKey,
  });

  const url = `${ROBLOX_DS_BASE}/standard-datastores/datastore/entries/entry?${params.toString()}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": ROBLOX_API_KEY,
    },
    cache: "no-store",
  });

  if (res.status === 404) {
    const text = await res.text().catch(() => "");
    console.warn(
      "[getDataStoreEntry] 404 EntryNotFound",
      { datastoreName, scope, entryKey },
      text
    );
    // คืน null แทนการ throw → ไป handle ต่อใน getItemAssignmentsSummary
    return null;
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("[getDataStoreEntry] error", res.status, text);
    throw new Error(`Roblox DS error ${res.status}: ${text}`);
  }

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/**
 * ดึงข้อมูลผู้ใช้ Roblox (ชื่อ + displayName) จาก userIds[]
 */
async function fetchRobloxUsersBasic(userIds) {
  const uniqueIds = Array.from(
    new Set(
      userIds
        .map((id) => Number(id))
        .filter((n) => Number.isFinite(n) && n > 0)
    )
  );

  if (uniqueIds.length === 0) return [];

  const result = [];
  const BATCH = 100;

  for (let i = 0; i < uniqueIds.length; i += BATCH) {
    const chunk = uniqueIds.slice(i, i + BATCH);

    try {
      const res = await fetch("https://users.roblox.com/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userIds: chunk }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");

        if (res.status === 429) {
          // โดน rate limit → เตือนเฉย ๆ แล้วใช้ข้อมูลเท่าที่มี
          console.warn(
            "[fetchRobloxUsersBasic] rate limited (429) – ใช้ข้อมูลเท่าที่ดึงได้ก่อนหน้าเท่านั้น"
          );
          break;
        }

        // error อื่นค่อยให้เป็นแดง
        console.error("[fetchRobloxUsersBasic] error", res.status, text);
        break;
      }

      const data = await res.json().catch(() => null);
      if (data && Array.isArray(data.data)) {
        result.push(...data.data);
      }
    } catch (err) {
      console.error("[fetchRobloxUsersBasic] exception", err);
      break;
    }
  }

  return result;
}


/**
 * ดึง avatar headshot thumbnails สำหรับ userIds[]
 */
async function fetchRobloxUserAvatars(userIds) {
  const uniqueIds = Array.from(
    new Set(
      userIds
        .map((id) => Number(id))
        .filter((n) => Number.isFinite(n) && n > 0)
    )
  );

  if (uniqueIds.length === 0) return {};

  const avatarMap = {};
  const BATCH = 100;

  for (let i = 0; i < uniqueIds.length; i += BATCH) {
    const chunk = uniqueIds.slice(i, i + BATCH);

    const params = new URLSearchParams({
      userIds: chunk.join(","),
      size: "150x150",
      format: "Png",
      isCircular: "false",
    });

    try {
      const res = await fetch(
        `https://thumbnails.roblox.com/v1/users/avatar-headshot?${params.toString()}`,
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("[fetchRobloxUserAvatars] error", res.status, text);
        break;
      }

      const data = await res.json().catch(() => null);
      if (data && Array.isArray(data.data)) {
        for (const entry of data.data) {
          if (!entry) continue;
          const id = String(entry.targetId);
          if (entry.state === "Completed" && entry.imageUrl) {
            avatarMap[id] = entry.imageUrl;
          }
        }
      }
    } catch (err) {
      console.error("[fetchRobloxUserAvatars] exception", err);
      break;
    }
  }

  return avatarMap;
}

/**
 * สรุปสำหรับหน้า Market Items (ItemAssignments_v1)
 */
export async function getItemAssignmentsSummary() {
  let rawEntry;
  try {
    rawEntry = await getDataStoreEntry(
      DEFAULT_DS_NAME,
      DEFAULT_DS_SCOPE,
      DEFAULT_ITEM_ENTRY_KEY
    );
  } catch (err) {
    console.error("[getItemAssignmentsSummary] DS error", err);
    return { items: [], userMap: {} };
  }

  if (!rawEntry) {
    console.warn(
      "[getItemAssignmentsSummary] No entry found. ตรวจ .env.local ว่า ROBLOX_DATASTORE_NAME / ROBLOX_ITEM_ASSIGNMENTS_ENTRY_KEY ตรงกับในเกมหรือยัง"
    );
    return { items: [], userMap: {} };
  }

  if (typeof rawEntry !== "object") {
    console.warn(
      "[getItemAssignmentsSummary] invalid entry type",
      typeof rawEntry
    );
    return { items: [], userMap: {} };
  }

  const items = [];
  const ownerIdSet = new Set();

  for (const [code, ownersRaw] of Object.entries(rawEntry)) {
    let ownerIds = [];

    if (Array.isArray(ownersRaw)) {
      ownerIds = ownersRaw.map((id) => String(id));
    } else if (ownersRaw && typeof ownersRaw === "object") {
      ownerIds = Object.keys(ownersRaw);
    }

    const def = itemall.find((it) => it.code === code);
    const grouptype = def?.grouptype || "อื่น ๆ";
    const isDoll = grouptype === "ตุ๊กตา";

    const totalOwners = ownerIds.length;
    const ownersForUi = isDoll ? [] : ownerIds;

    if (!isDoll) {
      for (const id of ownerIds) {
        ownerIdSet.add(id);
      }
    }

    items.push({
      code,
      nameTH: def?.nameTH || code,
      icon: def?.icon || ITEM_PLACEHOLDER_ICON,
      detail: def?.detail || "",
      grouptype,
      getby: def?.getby || "",
      totalOwners,
      owners: ownersForUi,
      isDoll,
    });
  }

  const MAX_USERS_FETCH = 400;
  const allUserIds = Array.from(ownerIdSet).slice(0, MAX_USERS_FETCH);

  const [basicUsers, avatarMap] = await Promise.all([
    fetchRobloxUsersBasic(allUserIds),
    fetchRobloxUserAvatars(allUserIds),
  ]);

  const userMap = {};

  for (const u of basicUsers) {
    if (!u) continue;
    const id = String(u.id);
    userMap[id] = {
      id,
      name: u.name,
      displayName: u.displayName,
      avatarUrl: avatarMap[id] || null,
    };
  }

  for (const [id, avatarUrl] of Object.entries(avatarMap)) {
    if (!userMap[id]) {
      userMap[id] = {
        id,
        name: id,
        displayName: "",
        avatarUrl,
      };
    }
  }

  items.sort((a, b) => {
    if (a.grouptype === b.grouptype) {
      if (b.totalOwners !== a.totalOwners) {
        return b.totalOwners - a.totalOwners;
      }
      return a.nameTH.localeCompare(b.nameTH, "th-TH");
    }
    return a.grouptype.localeCompare(b.grouptype, "th-TH");
  });

  return { items, userMap };
}

/**
 * รายชื่อครอบครัวทั้งหมด (สด) จาก DataStore FamilyRegistry_v1 คีย์ "all"
 * โครงในเกม: { [fid] = { tag, name, members(จำนวน), cap, head(ชื่อหัวหน้า) } }
 */
export async function getFamilyRegistry() {
  const dsName = process.env.ROBLOX_FAMILY_REGISTRY_DS || "FamilyRegistry_v1";
  let raw;
  try {
    raw = await getDataStoreEntry(dsName, DEFAULT_DS_SCOPE, "all");
  } catch (err) {
    console.error("[getFamilyRegistry] DS error", err);
    return { families: [], ok: false, error: String(err) };
  }
  if (!raw || typeof raw !== "object") {
    return { families: [], ok: raw === null ? false : true };
  }

  const families = Object.entries(raw)
    .map(([fid, f]) => ({
      fid,
      tag: (f && f.tag) || "",
      name: (f && f.name) || fid,
      head: (f && f.head) || "",
      members: Number((f && f.members) || 0),
      cap: Number((f && f.cap) || 0),
    }))
    .sort(
      (a, b) => b.members - a.members || a.name.localeCompare(b.name, "th-TH")
    );

  return { families, ok: true };
}

/**
 * รายชื่อคู่รักทั้งหมด (สด) จาก DataStore CoupleRegistry_v1 คีย์ "all"
 * โครงในเกม: { [cid] = { a(userId), b(userId), bond } } — resolve ชื่อ/avatar ให้ด้วย
 */
export async function getCoupleRegistry() {
  const dsName = process.env.ROBLOX_COUPLE_REGISTRY_DS || "CoupleRegistry_v1";
  let raw;
  try {
    raw = await getDataStoreEntry(dsName, DEFAULT_DS_SCOPE, "all");
  } catch (err) {
    console.error("[getCoupleRegistry] DS error", err);
    return { couples: [], userMap: {}, ok: false, error: String(err) };
  }
  if (!raw || typeof raw !== "object") {
    return { couples: [], userMap: {}, ok: raw === null ? false : true };
  }

  const couples = Object.entries(raw)
    .map(([cid, c]) => ({
      cid,
      a: String((c && c.a) ?? ""),
      b: String((c && c.b) ?? ""),
      bond: Math.floor(Number((c && c.bond) || 0)),
    }))
    .filter((c) => c.a && c.b)
    .sort((x, y) => y.bond - x.bond);

  const ids = Array.from(new Set(couples.flatMap((c) => [c.a, c.b]))).slice(0, 400);
  const [users, avatars] = await Promise.all([
    fetchRobloxUsersBasic(ids),
    fetchRobloxUserAvatars(ids),
  ]);

  const userMap = {};
  for (const u of users) {
    if (!u) continue;
    const id = String(u.id);
    userMap[id] = {
      id,
      name: u.name,
      displayName: u.displayName,
      avatarUrl: avatars[id] || null,
    };
  }
  for (const [id, url] of Object.entries(avatars)) {
    if (!userMap[id]) userMap[id] = { id, name: id, displayName: "", avatarUrl: url };
  }

  return { couples, userMap, ok: true };
}

// ===== helper: อ่าน entry แบบเงียบ (คืน null ถ้าพัง) =====
async function getEntrySilent(dsName, entryKey) {
  try {
    return await getDataStoreEntry(dsName, DEFAULT_DS_SCOPE, entryKey);
  } catch (err) {
    console.error("[getEntrySilent]", dsName, entryKey, err);
    return null;
  }
}

/**
 * ครอบครัวทั้งหมด + สมาชิกข้างใน + แต้มสนิทจริง
 * FamilyRegistry_v1 "all" -> fids ; Family_v1 "f_<fid>" -> {tag,name,headUid,cap,bond,members,memberBond}
 */
export async function getFamiliesFull() {
  const regDs = process.env.ROBLOX_FAMILY_REGISTRY_DS || "FamilyRegistry_v1";
  let reg;
  try {
    reg = await getDataStoreEntry(regDs, DEFAULT_DS_SCOPE, "all");
  } catch (err) {
    console.error("[getFamiliesFull] registry error", err);
    return { families: [], userMap: {}, ok: false };
  }
  if (!reg || typeof reg !== "object") {
    return { families: [], userMap: {}, ok: reg === null ? false : true };
  }

  const fids = Object.keys(reg).slice(0, 60);
  const records = await Promise.all(
    fids.map((fid) => getEntrySilent("Family_v1", "f_" + fid).then((r) => [fid, r]))
  );

  const uidSet = new Set();
  const families = records.map(([fid, rec]) => {
    const meta = reg[fid] || {};
    let members = [];
    let bond = 0;
    if (rec && typeof rec === "object") {
      bond = Math.floor(Number(rec.bond || 0));
      const mb = rec.memberBond || {};
      for (const [us, m] of Object.entries(rec.members || {})) {
        const uid = Number(us);
        members.push({
          uid,
          name: (m && m.name) || us,
          isHead: uid === Number(rec.headUid),
          bond: Math.floor(Number((mb[us] != null ? mb[us] : m && m.bondContrib) || 0)),
        });
        uidSet.add(String(uid));
      }
      members.sort((a, b) => (b.isHead ? 1 : 0) - (a.isHead ? 1 : 0) || b.bond - a.bond);
    }
    return {
      fid,
      tag: meta.tag || (rec && rec.tag) || "",
      name: meta.name || (rec && rec.name) || fid,
      head: meta.head || "",
      members,
      memberCount: members.length || Number(meta.members || 0),
      cap: Number(meta.cap || (rec && rec.cap) || 0),
      bond,
    };
  });
  families.sort(
    (a, b) => b.bond - a.bond || b.memberCount - a.memberCount || a.name.localeCompare(b.name, "th-TH")
  );

  const avatars = await fetchRobloxUserAvatars(Array.from(uidSet).slice(0, 400));
  const userMap = {};
  for (const [id, url] of Object.entries(avatars)) userMap[id] = { avatarUrl: url };
  return { families, userMap, ok: true };
}

/**
 * คู่รักทั้งหมด + แต้มสนิทปัจจุบัน (อ่านจาก Couple_v1) + avatar (แยก uid จาก cid "C<lo>_<hi>")
 */
export async function getCouplesFull() {
  const regDs = process.env.ROBLOX_COUPLE_REGISTRY_DS || "CoupleRegistry_v1";
  let reg;
  try {
    reg = await getDataStoreEntry(regDs, DEFAULT_DS_SCOPE, "all");
  } catch (err) {
    console.error("[getCouplesFull] registry error", err);
    return { couples: [], userMap: {}, ok: false };
  }
  if (!reg || typeof reg !== "object") {
    return { couples: [], userMap: {}, ok: reg === null ? false : true };
  }

  const parsed = Object.entries(reg)
    .slice(0, 200)
    .map(([cid, c]) => {
      const m = /^C(\d+)_(\d+)$/.exec(cid);
      return {
        cid,
        a: (c && c.a) || "?",
        b: (c && c.b) || "?",
        lo: m ? m[1] : null,
        hi: m ? m[2] : null,
        bond: Math.floor(Number((c && c.bond) || 0)),
      };
    });

  // แต้มสนิทปัจจุบันจาก Couple_v1 u_<lo>
  await Promise.all(
    parsed.map(async (p) => {
      if (!p.lo) return;
      const rec = await getEntrySilent("Couple_v1", "u_" + p.lo);
      if (rec && typeof rec === "object" && rec.bond != null) p.bond = Math.floor(Number(rec.bond));
    })
  );
  parsed.sort((x, y) => y.bond - x.bond);

  const ids = Array.from(new Set(parsed.flatMap((p) => [p.lo, p.hi]).filter(Boolean)));
  const avatars = await fetchRobloxUserAvatars(ids);
  const userMap = {};
  for (const [id, url] of Object.entries(avatars)) userMap[id] = { avatarUrl: url };
  return { couples: parsed, userMap, ok: true };
}

/**
 * สินค้าในตลาดฝากขาย (สด) — Market_Listings_v1 "L" = { nextId, items:[{id,sellerName,item,qty,unit,featuredUntil,...}] }
 */
export async function getMarketListings() {
  let raw;
  try {
    raw = await getDataStoreEntry("Market_Listings_v1", DEFAULT_DS_SCOPE, "L");
  } catch (err) {
    console.error("[getMarketListings]", err);
    return { listings: [], ok: false };
  }
  if (!raw || typeof raw !== "object" || !Array.isArray(raw.items)) {
    return { listings: [], ok: raw === null ? false : true };
  }
  const now = Math.floor(Date.now() / 1000);
  const listings = raw.items
    .map((l) => ({
      id: l.id,
      item: String(l.item || ""),
      qty: Number(l.qty || 0),
      unit: Number(l.unit || 0),
      sellerName: String(l.sellerName || "?"),
      featured: Number(l.featuredUntil || 0) > now,
    }))
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.unit * a.qty - b.unit * b.qty);
  return { listings, ok: true };
}

/**
 * งวดหวยปัจจุบัน (สด) — LuckyRound_v1 "round" = { roundId, drawAt, status, pot, buyers:{uid:{name,count}}, lastResult }
 */
export async function getLuckyRound() {
  let r;
  try {
    r = await getDataStoreEntry("LuckyRound_v1", DEFAULT_DS_SCOPE, "round");
  } catch (err) {
    console.error("[getLuckyRound]", err);
    return { ok: false };
  }
  if (!r || typeof r !== "object") return { ok: r === null ? false : true, empty: true };

  const buyersObj = r.buyers && typeof r.buyers === "object" ? r.buyers : {};
  let totalTickets = 0;
  const buyers = [];
  for (const b of Object.values(buyersObj)) {
    const count = Number((b && b.count) || 0);
    totalTickets += count;
    buyers.push({ name: (b && b.name) || "?", count });
  }
  buyers.sort((x, y) => y.count - x.count);

  return {
    ok: true,
    pot: Math.floor(Number(r.pot || 0)),
    totalTickets,
    buyerCount: buyers.length,
    buyers: buyers.slice(0, 50),
    drawAtMs: r.drawAt ? Number(r.drawAt) * 1000 : null,
    lastResult: r.lastResult || null,
  };
}
