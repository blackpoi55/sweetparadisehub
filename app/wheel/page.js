"use client";

import { useMemo } from "react";
import {
  wheelSegments,
  wheelMeta,
  wheelPetChoices,
  wheelSeasonChoices,
} from "@/json/wheel";
import { petByKey } from "@/json/pets";
import { resolveAsset } from "@/lib/gameAssets";

const SEG_COLORS = [
  "#F472B6", "#C084FC", "#60A5FA", "#F9A8D4", "#FBBF24", "#34D399",
  "#FB7185", "#A78BFA", "#22D3EE", "#F472B6", "#F87171", "#FCD34D",
];

function Wheel() {
  const n = wheelSegments.length;
  const step = 360 / n;
  const stops = wheelSegments
    .map((_, i) => `${SEG_COLORS[i % SEG_COLORS.length]} ${i * step}deg ${(i + 1) * step}deg`)
    .join(", ");
  return (
    <div className="relative mx-auto h-64 w-64 md:h-72 md:w-72">
      {/* glow */}
      <div className="absolute inset-0 rounded-full bg-pink-500/30 blur-2xl" />
      {/* wheel */}
      <div
        className="relative h-full w-full rounded-full border-4 border-white/20 shadow-2xl"
        style={{ background: `conic-gradient(${stops})` }}
      >
        {wheelSegments.map((s, i) => {
          const angle = i * step + step / 2;
          return (
            <div
              key={s.key}
              className="absolute left-1/2 top-1/2 origin-top text-lg md:text-xl"
              style={{
                transform: `translate(-50%, 0) rotate(${angle}deg) translateY(18px)`,
              }}
            >
              <span style={{ display: "inline-block", transform: `rotate(${-angle}deg)` }}>
                {s.emoji}
              </span>
            </div>
          );
        })}
        {/* hub */}
        <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white/30 bg-black text-2xl shadow-lg">
          🎡
        </div>
      </div>
      {/* pointer */}
      <div className="absolute left-1/2 top-[-6px] h-0 w-0 -translate-x-1/2 border-x-8 border-t-[16px] border-x-transparent border-t-pink-300 drop-shadow" />
    </div>
  );
}

function SegRow({ s, max }) {
  const barW = Math.max(3, (s.chance / max) * 100);
  return (
    <div
      className={
        "flex items-center gap-3 rounded-xl border p-2.5 " +
        (s.good ? "border-amber-400/40 bg-amber-500/5" : "border-pink-500/15 bg-black/50")
      }
    >
      <span className="w-7 text-center text-xl">{s.emoji}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <p className="truncate text-xs font-medium text-pink-50 md:text-sm">
            {s.label}
            {s.good && <span className="ml-1 text-[10px] text-amber-300">★</span>}
          </p>
          <span className="text-xs font-bold text-pink-100">{s.chance}%</span>
        </div>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-pink-500/10">
          <div
            className={"h-full rounded-full " + (s.good ? "bg-gradient-to-r from-amber-400 to-pink-400" : "bg-pink-500/60")}
            style={{ width: `${barW}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function WheelPage() {
  const sorted = useMemo(
    () => [...wheelSegments].sort((a, b) => b.chance - a.chance),
    []
  );
  const maxChance = sorted[0]?.chance || 100;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-6 text-center md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            🎡 Daily Wheel
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">วงล้อรายวัน</h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-200/80 md:text-sm">
            หมุนฟรีวันละ 1 ครั้ง (รีเซ็ตเที่ยงคืนเวลาไทย) — หมุนต่อเนื่องทุกวันเพื่อสะสมสตรีค ยิ่งสตรีคยาว โชคยิ่งพุ่ง
          </p>
        </header>

        <div className="mb-8 grid gap-6 md:grid-cols-2 md:items-center">
          <Wheel />
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-pink-500/25 bg-black/60 px-3 py-3 text-center">
              <p className="text-lg font-bold text-pink-100">1</p>
              <p className="text-[11px] text-pink-300/70">ครั้ง/วัน</p>
            </div>
            <div className="rounded-xl border border-pink-500/25 bg-black/60 px-3 py-3 text-center">
              <p className="text-lg font-bold text-pink-100">{wheelMeta.maxStreak}</p>
              <p className="text-[11px] text-pink-300/70">สตรีคสูงสุด</p>
            </div>
            <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 py-3 text-center">
              <p className="text-lg font-bold text-amber-200">×{wheelMeta.luckAtMax}</p>
              <p className="text-[11px] text-pink-300/70">โชคสูงสุด</p>
            </div>
            <div className="col-span-3 rounded-xl border border-pink-500/25 bg-black/60 px-4 py-3">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-pink-300/70">
                สตรีค → ตัวคูณโชค
              </p>
              <div className="flex items-center justify-between text-xs">
                {wheelMeta.luckCurve.map((c) => (
                  <div key={c.streak} className="text-center">
                    <p className="font-bold text-pink-100">×{c.mult}</p>
                    <p className="text-[10px] text-pink-300/60">สตรีค {c.streak}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* rewards */}
        <section className="mb-8">
          <h2 className="mb-3 text-base font-semibold text-white">🎁 รางวัลบนวงล้อ &amp; อัตราออก</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {sorted.map((s) => (
              <SegRow key={s.key} s={s} max={maxChance} />
            ))}
          </div>
          <p className="mt-3 text-[11px] text-pink-300/60">★ = รางวัลดี • ตัวคูณโชคจากสตรีคช่วยดันโอกาสช่องรางวัลดีให้สูงขึ้น</p>
        </section>

        {/* special choices */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-pink-500/30 bg-black/70 p-4 md:p-5">
            <h3 className="mb-3 text-sm font-semibold text-pink-50">🐾 หมุนติด “เพ็ท” เลือกได้ 1 ตัว</h3>
            <div className="flex flex-wrap gap-2">
              {wheelPetChoices.map((k) => {
                const p = petByKey[k];
                return (
                  <span key={k} className="flex items-center gap-1.5 rounded-full bg-pink-500/10 px-3 py-1.5 text-xs text-pink-50">
                    <span className="text-base">{p?.emoji || "🐾"}</span>
                    {p?.displayName || k}
                  </span>
                );
              })}
            </div>
          </section>
          <section className="rounded-2xl border border-pink-500/30 bg-black/70 p-4 md:p-5">
            <h3 className="mb-3 text-sm font-semibold text-pink-50">⚔️ หมุนติด “อาวุธซีซั่น” เลือกได้ 1 ชิ้น</h3>
            <div className="flex flex-wrap gap-2">
              {wheelSeasonChoices.map((code) => {
                const a = resolveAsset(code);
                return (
                  <span key={code} className="flex items-center gap-1.5 rounded-full bg-fuchsia-500/10 px-3 py-1.5 text-xs text-pink-50">
                    <span className="text-base">{a.emoji}</span>
                    {a.label}
                  </span>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
