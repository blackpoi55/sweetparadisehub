import { NextResponse } from "next/server";
import { robuxItems } from "@/json/robuxshop";

// แคช 1 ชม. — ดึงฝั่ง server เลี่ยง CORS
export const revalidate = 3600;

async function fetchThumbMap(url) {
  const map = {};
  try {
    const r = await fetch(url, { next: { revalidate: 3600 } });
    const j = await r.json();
    for (const d of j.data || []) {
      if (d.state === "Completed" && d.imageUrl) map[String(d.targetId)] = d.imageUrl;
    }
  } catch (e) {
    console.error("[robux-icons] thumb fail", e);
  }
  return map;
}

// resolve external thumbnail URL ต่อ item (เกมพาส→game-passes, อื่น→assets)
async function resolveUrls(items) {
  const passIds = items.filter((i) => i.pid).map((i) => i.pid);
  const assetIds = items.filter((i) => !i.pid && i.iconId).map((i) => i.iconId);
  const [passMap, assetMap] = await Promise.all([
    passIds.length ? fetchThumbMap(`https://thumbnails.roblox.com/v1/game-passes?gamePassIds=${passIds.join(",")}&size=150x150&format=Png`) : {},
    assetIds.length ? fetchThumbMap(`https://thumbnails.roblox.com/v1/assets?assetIds=${assetIds.join(",")}&size=150x150&format=Png&isCircular=false`) : {},
  ]);
  const out = {};
  for (const it of items) out[it.id] = it.pid ? passMap[String(it.pid)] || null : assetMap[String(it.iconId)] || null;
  return out;
}

async function toDataUri(url) {
  try {
    const r = await fetch(url, { next: { revalidate: 3600 } });
    const buf = Buffer.from(await r.arrayBuffer());
    const ct = r.headers.get("content-type") || "image/png";
    return `data:${ct};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format"); // "data" = คืน base64 (ไว้แคปรูป)
  const idsParam = searchParams.get("ids"); // จำกัดเฉพาะบางชิ้น (เช่นของในตะกร้า)

  const idSet = idsParam ? new Set(idsParam.split(",")) : null;
  const items = idSet ? robuxItems.filter((i) => idSet.has(i.id)) : robuxItems;

  const urls = await resolveUrls(items);

  if (format === "data") {
    const entries = await Promise.all(
      items.map(async (it) => [it.id, urls[it.id] ? await toDataUri(urls[it.id]) : null])
    );
    return NextResponse.json({ icons: Object.fromEntries(entries) });
  }

  return NextResponse.json({ icons: urls });
}
