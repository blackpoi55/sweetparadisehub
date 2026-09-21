import { NextResponse } from "next/server";
import { COOKIE, cookieOptions, createSession, errorResponse, rateOk, redeemCode } from "@/lib/streamer";

export const dynamic = "force-dynamic";

// ล็อกอินด้วยรหัส 6 หลักจากแอพ "📡 สตรีมเมอร์" ในเกม (ใช้ได้ครั้งเดียว · 10 นาที)
export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "?";
  // รหัส 6 หลักเดาได้ถ้าปล่อยยิงไม่จำกัด
  if (!rateOk(`login:${ip}`, 6, 60_000)) return Response.json({ error: "ลองบ่อยเกินไป รอ 1 นาที" }, { status: 429 });
  try {
    const body = await req.json().catch(() => ({}));
    const { uid, prof } = await redeemCode(body.code);
    const res = NextResponse.json({ ok: true, name: prof.name });
    res.cookies.set(COOKIE, createSession(uid, prof.ver), cookieOptions);
    return res;
  } catch (err) {
    return errorResponse(err);
  }
}
