"use client";

import { petall, petMeta } from "@/json/pets";
import { fmtNum, rarityStyle } from "@/lib/gameAssets";

function PetCard({ p }) {
  const rs = rarityStyle(p.rarity);
  return (
    <article className="flex flex-col rounded-2xl border border-pink-500/30 bg-black/80 p-4 text-xs text-pink-50 shadow-sm transition hover:-translate-y-1 hover:border-pink-400/80 hover:shadow-pink-500/30 md:text-sm">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500/30 via-fuchsia-500/20 to-slate-900 text-4xl">
          {p.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold text-pink-50">{p.displayName}</h2>
          <span
            className={"mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium " + rs.className}
          >
            {rs.label}
          </span>
        </div>
      </div>

      <div className="rounded-xl bg-pink-500/10 px-3 py-2">
        <p className="text-[11px] font-medium uppercase tracking-wide text-pink-300/70">ความสามารถ</p>
        <p className="mt-0.5 text-pink-50">⭐ {p.ability}</p>
      </div>

      <div className="mt-2 rounded-xl bg-fuchsia-500/5 px-3 py-2">
        <p className="text-[11px] font-medium uppercase tracking-wide text-pink-300/70">วิธีได้มา</p>
        <p className="mt-0.5 text-pink-100/90">{p.obtain}</p>
      </div>
    </article>
  );
}

function InfoTile({ label, value }) {
  return (
    <div className="rounded-xl border border-pink-500/25 bg-black/60 px-3 py-2.5 text-center">
      <p className="text-lg font-bold text-pink-100">{value}</p>
      <p className="mt-0.5 text-[11px] text-pink-300/70">{label}</p>
    </div>
  );
}

export default function PetsPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-6 text-center md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            🐾 Pets
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
            สัตว์เลี้ยง
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-200/80 md:text-sm">
            สัตว์เลี้ยงทั้งหมด {petall.length} ตัว แต่ละตัวมีความสามารถ (บัฟ) ต่างกัน สวมใส่ได้พร้อมกันสูงสุด{" "}
            {petMeta.maxEquip} ตัว (1 ชนิดต่อ 1 ตัว) เลี้ยงด้วย{petMeta.foodDisplay}เพื่อเพิ่มเลเวล
          </p>
        </header>

        {/* meta */}
        <div className="mx-auto mb-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          <InfoTile label="เลเวลสูงสุด" value={`Lv.${petMeta.maxLevel}`} />
          <InfoTile label="สวมพร้อมกัน" value={`${petMeta.maxEquip} ตัว`} />
          <InfoTile label={`อาหาร (${petMeta.foodDisplay})`} value={`+${petMeta.expPerFood} EXP`} />
          <InfoTile label="กาชาสัตว์เลี้ยง" value={`${fmtNum(petMeta.gachaPrice / 1000000)}M`} />
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {petall.map((p) => (
            <PetCard key={p.key} p={p} />
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-3xl rounded-xl border border-pink-500/20 bg-black/50 px-4 py-3 text-center text-[11px] text-pink-200/75">
          🍚 เลี้ยงถึง Lv.{petMeta.maxLevel} • ต้องใช้ {petMeta.expPerLevel / petMeta.expPerFood} {petMeta.foodDisplay}/เลเวล
          ({petMeta.expPerLevel} EXP) • ได้ตัวซ้ำจากกาชาคืนเป็น {petMeta.foodDisplay} {petMeta.dupRefundAmount} ชิ้น
        </p>
      </div>
    </div>
  );
}
