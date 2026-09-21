import { errorResponse, fire, isWhitelisted, rateOk, readSession } from "@/lib/streamer";

export const dynamic = "force-dynamic";

// ปุ่ม "ลองยิง" บนหน้าเว็บ — ข้ามคูลดาวน์
export async function POST(req, { params }) {
  try {
    const { id } = await params;
    const s = await readSession(req);
    if (!s) return Response.json({ error: "ยังไม่ได้เข้าสู่ระบบ" }, { status: 401 });
    const eff = (s.prof.effects || []).find((e) => e.id === id);
    if (!eff) return Response.json({ error: "ไม่พบการ์ดนี้" }, { status: 404 });
    if (!(await isWhitelisted(s.uid))) return Response.json({ error: "สิทธิ์สตรีมเมอร์ถูกถอดแล้ว — ติดต่อแอดมิน" }, { status: 403 });
    if (!rateOk(`s:${s.uid}`)) return Response.json({ error: "ยิงถี่เกินไป รอสักครู่" }, { status: 429 });
    await fire(s.uid, eff, true);
    return Response.json({ ok: true });
  } catch (err) {
    return errorResponse(err);
  }
}
