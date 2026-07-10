"use client";

import { useEffect, useState } from "react";

// กิจกรรมที่คำนวณเวลาได้ (อิงเวลาไทย UTC+7)
const EVENTS = [
  { key: "boss", icon: "🐉", name: "บอสโลก", kind: "boss" },
  { key: "adminquest", icon: "📜", name: "เควสแอดมิน", kind: "adminquest" },
  { key: "airdrop", icon: "🪂", name: "Airdrop", kind: "airdrop", approx: true },
  { key: "clash", icon: "🐟", name: "ทัวร์ศึกปลา", kind: "tournament" },
  { key: "lucky", icon: "🍀", name: "หวยออก", kind: "lucky" },
  { key: "wheel", icon: "🎡", name: "รีเซ็ตวงล้อ", kind: "wheel" },
];

// วินาทีจนถึงกิจกรรมถัดไป (คำนวณในเฟรมเวลาไทยที่เลื่อน +7 ชม.)
function secondsUntil(kind, nowMs) {
  const thaiMs = nowMs + 7 * 3600000;
  const d = new Date(thaiMs);
  const H = d.getUTCHours(),
    M = d.getUTCMinutes(),
    S = d.getUTCSeconds(),
    day = d.getUTCDay();
  const dayStart = thaiMs - ((H * 3600 + M * 60 + S) * 1000 + d.getUTCMilliseconds());
  const at = (off, hr, mn) => dayStart + off * 86400000 + (hr * 3600 + mn * 60) * 1000;

  let target = null;
  if (kind === "boss" || kind === "adminquest" || kind === "airdrop") {
    for (let add = 0; add < 48; add++) {
      const t = dayStart + (H + add) * 3600000;
      if (t < thaiMs) continue;
      const hod = ((H + add) % 24 + 24) % 24;
      if (kind === "airdrop") { target = t; break; }
      if (kind === "boss" && hod % 2 === 0) { target = t; break; }
      if (kind === "adminquest" && hod % 2 === 1) { target = t; break; }
    }
  } else if (kind === "tournament") {
    target = at(0, 21, 0);
    if (target < thaiMs) target = at(1, 21, 0);
  } else if (kind === "wheel") {
    target = dayStart + 86400000; // เที่ยงคืนถัดไป
  } else if (kind === "lucky") {
    let addDays = (0 - day + 7) % 7; // วันอาทิตย์ = 0
    target = at(addDays, 21, 30);
    if (target < thaiMs) target = at(addDays + 7, 21, 30);
  }
  return target == null ? null : Math.max(0, Math.round((target - thaiMs) / 1000));
}

function fmt(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export default function ScheduleCountdown() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // ก่อน mount (SSR) แสดง placeholder กัน hydration mismatch
  if (now == null) {
    return (
      <div className="mb-8 h-28 animate-pulse rounded-2xl border border-pink-500/20 bg-black/50" />
    );
  }

  const rows = EVENTS.map((e) => ({ ...e, sec: secondsUntil(e.kind, now) }))
    .filter((e) => e.sec != null)
    .sort((a, b) => a.sec - b.sec);
  const next = rows[0];

  return (
    <div className="mb-8">
      {/* กิจกรรมถัดไป */}
      <div className="mb-4 overflow-hidden rounded-2xl border border-fuchsia-400/40 bg-gradient-to-br from-fuchsia-500/15 via-pink-500/10 to-black p-5 text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-fuchsia-200/80">กิจกรรมถัดไป</p>
        <p className="mt-2 text-2xl font-black text-white md:text-3xl">
          <span className="mr-2">{next.icon}</span>
          {next.name}
        </p>
        <p className="mt-1 font-mono text-3xl font-bold text-fuchsia-200 md:text-4xl">{fmt(next.sec)}</p>
        <p className="mt-1 text-[11px] text-pink-200/60">อีก {next.approx ? "~" : ""}{fmt(next.sec)} ชม.:นาที:วิ (เวลาไทย)</p>
      </div>

      {/* ทั้งหมด */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {rows.map((e) => (
          <div
            key={e.key}
            className={
              "flex flex-col items-center rounded-xl border p-2.5 " +
              (e.key === next.key ? "border-fuchsia-400/50 bg-fuchsia-500/10" : "border-pink-500/15 bg-black/50")
            }
          >
            <span className="text-xl">{e.icon}</span>
            <span className="mt-0.5 truncate text-[11px] text-pink-200/80">{e.name}</span>
            <span className="font-mono text-sm font-bold text-pink-100">
              {e.approx ? "~" : ""}{fmt(e.sec)}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-pink-300/50">
        🪂 Airdrop เป็นค่าโดยประมาณ (เวลาจริงอิงตอนเซิร์ฟเปิด)
      </p>
    </div>
  );
}
