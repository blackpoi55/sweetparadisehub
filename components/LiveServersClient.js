"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const fmt = (n) => (Number(n) || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

function fillColor(p) {
  if (p >= 1) return "from-rose-500 to-red-500";
  if (p >= 0.85) return "from-amber-400 to-orange-500";
  return "from-emerald-400 to-green-500";
}
function pingChip(ping) {
  if (!ping) return "border-white/15 text-gray-400";
  if (ping < 100) return "border-emerald-400/40 text-emerald-300";
  if (ping < 200) return "border-amber-400/40 text-amber-300";
  return "border-rose-400/40 text-rose-300";
}

export default function LiveServersClient({ initial }) {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [ago, setAgo] = useState(0);
  // เวลาที่ "client" รับข้อมูลล่าสุด (นาฬิกา browser ล้วน — กัน clock skew กับ server)
  const lastSync = useRef(0);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/live", { cache: "no-store" });
      const j = await res.json();
      if (j) {
        setData(j);
        lastSync.current = Date.now();
        setAgo(0);
      }
    } catch {
      /* เงียบไว้ ใช้ข้อมูลเดิม */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    lastSync.current = Date.now();
    refresh(); // ดึงสดทันทีตอนโหลด (กัน SSR ส่งข้อมูล cache เก่า)
    const poll = setInterval(refresh, 25000);
    const tick = setInterval(() => {
      if (lastSync.current) setAgo(Math.max(0, Math.round((Date.now() - lastSync.current) / 1000)));
    }, 1000);
    const onFocus = () => refresh();
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(poll);
      clearInterval(tick);
      window.removeEventListener("focus", onFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const g = data?.game || {};
  const servers = data?.servers || [];
  const totalPlaying = data?.totalPlaying || 0;
  const maxPlayers = g.maxPlayers || 70;
  const offline = !data?.ok;

  return (
    <div className="mx-auto max-w-6xl">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-pink-500/30 bg-gradient-to-br from-black via-slate-950 to-black p-6 md:p-8">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between">
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              LIVE • สถานะสด
            </span>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
              เซิร์ฟเวอร์ {g.name || "Sweet Paradise"}
            </h1>
            <p className="mt-1 text-xs text-pink-200/70 md:text-sm">
              จำนวนคนออนไลน์และเซิร์ฟเวอร์ทั้งหมด อัปเดตอัตโนมัติทุก 25 วินาที
            </p>
          </div>

          {/* total online */}
          <div className="flex flex-col items-center rounded-2xl border border-emerald-400/30 bg-black/50 px-8 py-4">
            <span className="text-[11px] font-medium uppercase tracking-widest text-emerald-300/80">
              ออนไลน์ทั้งหมด
            </span>
            <span className="bg-gradient-to-b from-emerald-200 to-emerald-400 bg-clip-text text-5xl font-black leading-none text-transparent md:text-6xl">
              {fmt(totalPlaying)}
            </span>
            <span className="mt-1 text-[11px] text-emerald-300/70">คนกำลังเล่น</span>
          </div>
        </div>

        {/* stat chips */}
        <div className="relative z-10 mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { i: "🖥️", label: "เซิร์ฟที่เปิด", v: fmt(data?.totalServers || 0) },
            { i: "👥", label: "จุ/เซิร์ฟ", v: maxPlayers },
            { i: "👁️", label: "เข้าชมรวม", v: fmt(g.visits || 0) },
            { i: "⭐", label: "รายการโปรด", v: fmt(g.favorites || 0) },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-pink-500/20 bg-black/40 px-4 py-3 text-center"
            >
              <div className="text-lg">{s.i}</div>
              <div className="mt-0.5 text-lg font-bold text-white">{s.v}</div>
              <div className="text-[11px] text-pink-300/60">{s.label}</div>
            </div>
          ))}
        </div>

        {/* refresh row */}
        <div className="relative z-10 mt-5 flex items-center justify-center gap-3 md:justify-end">
          <span className="text-[11px] text-pink-300/60" suppressHydrationWarning>
            {mounted ? (loading ? "กำลังอัปเดต…" : `อัปเดตเมื่อ ${ago} วินาทีที่แล้ว`) : ""}
          </span>
          <button
            onClick={refresh}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-500/20 disabled:opacity-50"
          >
            <span className={loading ? "inline-block animate-spin" : "inline-block"}>↻</span>
            รีเฟรช
          </button>
        </div>
      </section>

      {/* privacy note */}
      <div className="mt-4 flex items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[12px] text-pink-200/70">
        <span className="text-base">🔒</span>
        <p>
          Roblox ไม่เปิดเผย “ชื่อผู้เล่น” ในแต่ละเซิร์ฟเวอร์แล้ว (เพื่อความเป็นส่วนตัว) — จึงแสดงได้แค่
          <b className="text-pink-100"> จำนวนคน</b> ต่อเซิร์ฟ กดปุ่ม “เข้าเซิร์ฟนี้” เพื่อเข้าเล่นเซิร์ฟที่ต้องการได้เลย
        </p>
      </div>

      {/* SERVER LIST */}
      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            รายการเซิร์ฟเวอร์
            <span className="ml-2 text-sm font-normal text-pink-300/60">
              {servers.length} เซิร์ฟ
            </span>
          </h2>
        </div>

        {offline ? (
          <div className="rounded-2xl border border-rose-400/30 bg-rose-500/5 px-6 py-10 text-center text-sm text-rose-200/80">
            ⚠️ ดึงสถานะเซิร์ฟไม่สำเร็จตอนนี้ ลองกด “รีเฟรช” อีกครั้ง
          </div>
        ) : servers.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-black/40 px-6 py-12 text-center">
            <div className="text-4xl">😴</div>
            <p className="mt-2 text-sm text-pink-200/70">ยังไม่มีเซิร์ฟเวอร์เปิดอยู่ตอนนี้</p>
            <a
              href="https://www.roblox.com/th/games/115633751220614/Sweet-paradise"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-black"
            >
              ▶ เปิดเซิร์ฟแรก!
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {servers.map((s, i) => {
              const cap = s.maxPlayers || maxPlayers;
              const p = cap ? Math.min(1, s.playing / cap) : 0;
              const full = s.playing >= cap;
              const joinUrl = `https://www.roblox.com/games/start?placeId=${data.placeId}&gameInstanceId=${s.id}`;
              return (
                <div
                  key={s.id}
                  className="flex flex-col rounded-2xl border border-pink-500/20 bg-black/50 p-4 transition hover:border-pink-400/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-pink-100">เซิร์ฟ #{i + 1}</span>
                    <span className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-pink-300/50">
                      {s.id.slice(0, 8)}
                    </span>
                  </div>

                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-white">{s.playing}</span>
                    <span className="text-sm text-pink-300/60">/ {cap} คน</span>
                    {full && (
                      <span className="ml-auto rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-semibold text-rose-300">
                        เต็ม
                      </span>
                    )}
                  </div>

                  {/* fill bar */}
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${fillColor(p)}`}
                      style={{ width: `${Math.round(p * 100)}%` }}
                    />
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-[11px]">
                    <span className={`rounded-full border px-2 py-0.5 ${pingChip(s.ping)}`}>
                      ปิง {s.ping || "?"} ms
                    </span>
                    <span className="rounded-full border border-white/15 px-2 py-0.5 text-gray-400">
                      {s.fps || "?"} fps
                    </span>
                  </div>

                  <a
                    href={joinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={
                      "mt-3 inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold transition " +
                      (full
                        ? "cursor-not-allowed bg-white/5 text-gray-500"
                        : "bg-gradient-to-r from-emerald-500 to-green-500 text-black hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/30")
                    }
                    onClick={(e) => full && e.preventDefault()}
                  >
                    ▶ {full ? "เซิร์ฟเต็ม" : "เข้าเซิร์ฟนี้"}
                  </a>
                </div>
              );
            })}
          </div>
        )}

        <p className="mt-6 text-center text-[11px] text-pink-300/50">
          * ปุ่ม “เข้าเซิร์ฟนี้” จะเปิด Roblox ให้เข้าเซิร์ฟที่เลือก (ต้องล็อกอิน Roblox และเปิดผ่านแอป Roblox)
        </p>
      </section>
    </div>
  );
}
