import { MAX_EFFECTS, StreamError, errorResponse, readSession, sanitizeEffect, updateProfile } from "@/lib/streamer";

export const dynamic = "force-dynamic";

// สร้างการ์ดใหม่
export async function POST(req) {
  try {
    const s = await readSession(req);
    if (!s) return Response.json({ error: "ยังไม่ได้เข้าสู่ระบบ" }, { status: 401 });
    const eff = sanitizeEffect(await req.json().catch(() => ({})));
    await updateProfile(s.uid, (p) => {
      p.effects = p.effects || [];
      if (p.effects.length >= MAX_EFFECTS) throw new StreamError(`สร้างได้สูงสุด ${MAX_EFFECTS} การ์ด`);
      p.effects.push(eff);
      return p;
    });
    return Response.json({ ok: true, effect: eff });
  } catch (err) {
    return errorResponse(err);
  }
}
