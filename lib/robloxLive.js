// lib/robloxLive.js — สถานะสด: จำนวนคนออนไลน์ทั้งหมด + รายการเซิร์ฟเวอร์ (Roblox public API)
// หมายเหตุ: Roblox ปิด playerTokens ในเซิร์ฟลิสต์สาธารณะแล้ว → ดึงได้แค่ "จำนวน" คนต่อเซิร์ฟ ไม่ได้ชื่อ/รูป

const PLACE_ID = process.env.ROBLOX_PLACE_ID || "115633751220614";
const UNIVERSE_ID = process.env.ROBLOX_UNIVERSE_ID || "8343085084";

// cache ในหน่วยความจำ กันยิง Roblox ถี่เกิน (ผู้เข้าชมหลายคน) + กันโดน rate limit
let _cache = { at: 0, data: null };
const TTL_MS = 12000;

async function fetchGameStats() {
  try {
    const res = await fetch(
      `https://games.roblox.com/v1/games?universeIds=${UNIVERSE_ID}`,
      { cache: "no-store", headers: { accept: "application/json" } }
    );
    if (!res.ok) return null;
    const j = await res.json().catch(() => null);
    const d = j && Array.isArray(j.data) ? j.data[0] : null;
    if (!d) return null;
    return {
      name: String(d.name || "Sweet Paradise").trim(),
      playing: Number(d.playing || 0),
      visits: Number(d.visits || 0),
      favorites: Number(d.favoritedCount || 0),
      maxPlayers: Number(d.maxPlayers || 0),
    };
  } catch {
    return null;
  }
}

async function fetchServers(maxPages = 6) {
  const servers = [];
  let cursor = "";
  for (let i = 0; i < maxPages; i++) {
    const url = new URL(
      `https://games.roblox.com/v1/games/${PLACE_ID}/servers/Public`
    );
    url.searchParams.set("sortOrder", "Desc");
    url.searchParams.set("excludeFullGames", "false");
    url.searchParams.set("limit", "100");
    if (cursor) url.searchParams.set("cursor", cursor);

    let j;
    try {
      const res = await fetch(url, {
        cache: "no-store",
        headers: { accept: "application/json" },
      });
      if (!res.ok) break;
      j = await res.json().catch(() => null);
    } catch {
      break;
    }
    if (!j || !Array.isArray(j.data)) break;

    for (const s of j.data) {
      servers.push({
        id: String(s.id),
        playing: Number(s.playing || 0),
        maxPlayers: Number(s.maxPlayers || 0),
        fps: Math.round(Number(s.fps || 0)),
        ping: Math.round(Number(s.ping || 0)),
      });
    }
    cursor = j.nextPageCursor || "";
    if (!cursor) break;
  }
  // เซิร์ฟคนเยอะ + ปิงต่ำขึ้นก่อน
  servers.sort((a, b) => b.playing - a.playing || a.ping - b.ping);
  return servers;
}

export async function getLiveStatus() {
  const now = Date.now();
  if (_cache.data && now - _cache.at < TTL_MS) return _cache.data;

  const [game, servers] = await Promise.all([fetchGameStats(), fetchServers()]);
  const ok = !!(game || servers.length);

  const data = {
    ok,
    fetchedAt: now,
    placeId: PLACE_ID,
    game:
      game || {
        name: "Sweet Paradise",
        playing: 0,
        visits: 0,
        favorites: 0,
        maxPlayers: 0,
      },
    servers,
    totalServers: servers.length,
    // จำนวนคนออนไลน์ทั้งหมด: เอาจาก game stats เป็นหลัก (แม่นสุด), ถ้าไม่มีค่อยรวมจากเซิร์ฟ
    totalPlaying: game
      ? game.playing
      : servers.reduce((s, x) => s + x.playing, 0),
  };
  _cache = { at: now, data };
  return data;
}
