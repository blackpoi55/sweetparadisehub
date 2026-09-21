import { findHookEffect, fire, isWhitelisted, rateOk } from "@/lib/streamer";

export const dynamic = "force-dynamic";

// 🔗 webhook สาธารณะสำหรับ TikFinity ("Trigger WebHook")
// ไม่มี cookie — ลิงก์นี้คือกุญแจ (token สุ่มของสตรีมเมอร์) · รับทั้ง GET/POST
// ไม่อ่าน body เลย (☠️ ห้ามส่งชื่อ/ข้อความคนดูเข้าเกม) · คูลดาวน์ต่อการ์ดเกมเช็คเอง
async function handle(_req, { params }) {
  const { uid, token, id } = await params;
  try {
    const eff = await findHookEffect(uid, token, id);
    if (!eff) return Response.json({ error: "not found" }, { status: 404 });
    if (!eff.enabled) return Response.json({ ok: false, reason: "disabled" });
    if (!(await isWhitelisted(uid))) return Response.json({ ok: false, reason: "not-whitelisted" }, { status: 403 });
    if (!rateOk(`s:${uid}`)) return Response.json({ ok: false, reason: "rate" });
    await fire(uid, eff);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, reason: "unavailable" }, { status: 503 });
  }
}

export const GET = handle;
export const POST = handle;
