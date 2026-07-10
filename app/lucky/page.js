"use client";

import { luckyMeta, luckySteps } from "@/json/lucky";

function fmt(n) {
  return Number(n || 0).toLocaleString("en-US");
}

export default function LuckyPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-pink-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-6 text-center md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            🍀 Lucky Number
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">ลอตเตอรี่ (หวยในเกม)</h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-200/80 md:text-sm">
            ซื้อตั๋วทายเลข ทายตรงเป๊ะรับกองรางวัลรวมทั้งหมด — ออกผลทุกอาทิตย์
          </p>
        </header>

        {/* hero stat card */}
        <div className="mb-8 overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 via-pink-500/10 to-fuchsia-500/10 p-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-amber-200/80">Draw</p>
          <p className="mt-2 text-3xl font-black text-white md:text-4xl">
            {luckyMeta.drawWdayLabel} {luckyMeta.drawHour}:{String(luckyMeta.drawMin).padStart(2, "0")}
          </p>
          <p className="mt-1 text-xs text-pink-200/70">{luckyMeta.tzLabel}</p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-black/40 px-2 py-3">
              <p className="text-base font-bold text-pink-100 md:text-lg">{fmt(luckyMeta.ticketPrice)}</p>
              <p className="text-[11px] text-pink-300/70">ราคา/ใบ</p>
            </div>
            <div className="rounded-xl bg-black/40 px-2 py-3">
              <p className="text-base font-bold text-pink-100 md:text-lg">1–{luckyMeta.maxNum}</p>
              <p className="text-[11px] text-pink-300/70">ช่วงเลขที่ทาย</p>
            </div>
            <div className="rounded-xl bg-black/40 px-2 py-3">
              <p className="text-base font-bold text-emerald-200 md:text-lg">{Math.round(luckyMeta.potRate * 100)}%</p>
              <p className="text-[11px] text-pink-300/70">เข้ากองรางวัล</p>
            </div>
          </div>
        </div>

        {/* steps */}
        <section className="mb-8">
          <h2 className="mb-3 text-base font-semibold text-white">วิธีเล่น</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {luckySteps.map((s, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl border border-pink-500/25 bg-black/70 p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/30 to-amber-500/20 text-xl">
                  {s.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-pink-50">
                    <span className="mr-1 text-pink-300/70">{i + 1}.</span>
                    {s.title}
                  </p>
                  <p className="mt-0.5 text-xs text-pink-100/80">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* rules */}
        <section className="rounded-2xl border border-pink-500/30 bg-black/70 p-4 md:p-6">
          <h2 className="mb-3 text-base font-semibold text-white">📋 กติกา &amp; ลิมิต</h2>
          <ul className="grid grid-cols-1 gap-2 text-xs text-pink-100/90 sm:grid-cols-2 md:text-sm">
            <li className="rounded-xl bg-pink-500/10 px-3 py-2">🎯 ทายตรงเป๊ะ = รับกองรางวัลรวมทั้งหมด</li>
            <li className="rounded-xl bg-pink-500/10 px-3 py-2">🔥 {Math.round(luckyMeta.burnRate * 100)}% ของค่าตั๋วถูกเผาทิ้ง (คุมเงินเฟ้อ)</li>
            <li className="rounded-xl bg-pink-500/10 px-3 py-2">🔢 ซื้อเลขต่างกันได้สูงสุด {luckyMeta.maxDistinct} เลข/งวด</li>
            <li className="rounded-xl bg-pink-500/10 px-3 py-2">🧾 ซื้อเลขเดิมซ้ำได้สูงสุด {luckyMeta.maxQtyPerBuy} ใบ/ครั้ง</li>
            <li className="rounded-xl bg-pink-500/10 px-3 py-2">💸 ถูกรางวัลตอนออฟไลน์ก็ได้เงิน (จ่ายเมื่อกลับเข้าเกม)</li>
            <li className="rounded-xl bg-pink-500/10 px-3 py-2">🌱 มีกองรางวัลตั้งต้น {fmt(luckyMeta.seed)} หลังมีคนถูกรางวัลแล้ว</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
