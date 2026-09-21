import { NextResponse } from "next/server";
import { COOKIE, readSession, updateProfile } from "@/lib/streamer";

export const dynamic = "force-dynamic";

// ?all=1 → ออกจากระบบทุกเครื่อง (เพิ่ม ver ให้ cookie เก่าทุกใบใช้ไม่ได้)
export async function POST(req) {
  if (req.nextUrl.searchParams.get("all") === "1") {
    const s = await readSession(req).catch(() => null);
    if (s) await updateProfile(s.uid, (p) => ({ ...p, ver: (p.ver || 1) + 1 })).catch(() => null);
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
