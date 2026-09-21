import { errorResponse, hookUrl, isWhitelisted, readSession } from "@/lib/streamer";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const s = await readSession(req);
    if (!s) return Response.json({ error: "ยังไม่ได้เข้าสู่ระบบ" }, { status: 401 });
    // null = อ่านไวท์ลิสต์ไม่ได้ตอนนี้ (ไม่ใช่ "ไม่มีสิทธิ์")
    const allowed = await isWhitelisted(s.uid).catch(() => null);
    const origin = req.nextUrl.origin;
    return Response.json(
      {
        streamer: { userId: s.uid, name: s.prof.name, displayName: s.prof.dn || "" },
        allowed,
        effects: (s.prof.effects || []).map((e) => ({ ...e, url: hookUrl(origin, s.uid, s.prof.token, e.id) })),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    return errorResponse(err);
  }
}
