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
