import { StreamError, errorResponse, readSession, sanitizeEffect, updateProfile } from "@/lib/streamer";

export const dynamic = "force-dynamic";

// แก้การ์ด · ส่งมาแค่ { enabled } ก็ได้ (ที่เหลือใช้ค่าเดิม)
export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const s = await readSession(req);
    if (!s) return Response.json({ error: "ยังไม่ได้เข้าสู่ระบบ" }, { status: 401 });
    const body = await req.json().catch(() => ({}));
    let saved;
    await updateProfile(s.uid, (p) => {
      const i = (p.effects || []).findIndex((e) => e.id === id);
      if (i < 0) throw new StreamError("ไม่พบการ์ดนี้", 404);
      saved = sanitizeEffect({ ...p.effects[i], ...body, kind: p.effects[i].kind }, id);
      p.effects[i] = saved;
      return p;
    });
    return Response.json({ ok: true, effect: saved });
  } catch (err) {
    return errorResponse(err);
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const s = await readSession(req);
    if (!s) return Response.json({ error: "ยังไม่ได้เข้าสู่ระบบ" }, { status: 401 });
    await updateProfile(s.uid, (p) => ({ ...p, effects: (p.effects || []).filter((e) => e.id !== id) }));
    return Response.json({ ok: true });
  } catch (err) {
    return errorResponse(err);
  }
}
