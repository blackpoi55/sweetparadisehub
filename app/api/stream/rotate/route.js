import { errorResponse, readSession, rotateToken, updateProfile } from "@/lib/streamer";

export const dynamic = "force-dynamic";

// เปลี่ยนลิงก์ webhook ทั้งหมด (ลิงก์หลุด) — ต้องไปวางใน TikFinity ใหม่ทุกอัน
export async function POST(req) {
  try {
    const s = await readSession(req);
    if (!s) return Response.json({ error: "ยังไม่ได้เข้าสู่ระบบ" }, { status: 401 });
    await updateProfile(s.uid, rotateToken);
    return Response.json({ ok: true });
  } catch (err) {
    return errorResponse(err);
  }
}
