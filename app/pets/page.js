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
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <span className={"inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium " + rs.className}>
              {rs.label}
            </span>
            <span className="inline-flex rounded-full bg-pink-500/10 px-2 py-0.5 text-[10px] text-pink-200">
              🍚 กิน{p.food.display}
            </span>
            {p.robux && (
              <span className="inline-flex rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-200">
                🛒 {p.robux} R$
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ความสามารถ + สเกลเลเวล */}
      <div className="rounded-xl bg-pink-500/10 px-3 py-2">
        <p className="text-[11px] font-medium uppercase tracking-wide text-pink-300/70">ความสามารถ</p>
        <p className="mt-0.5 text-pink-50">⭐ {p.ability}</p>
        <div className="mt-2 space-y-1 border-t border-pink-500/15 pt-2 text-[11px]">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 flex-shrink-0 rounded bg-slate-600/50 px-1.5 py-0.5 font-bold text-slate-100">Lv.1</span>
            <span className="text-pink-100/85">{p.abilityLv1}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 flex-shrink-0 rounded bg-amber-500/20 px-1.5 py-0.5 font-bold text-amber-200">Lv.50</span>
            <span className="text-pink-100/90">{p.abilityLv50}</span>
          </div>
        </div>
      </div>

      <div className="mt-2 rounded-xl bg-fuchsia-500/5 px-3 py-2">
        <p className="text-[11px] font-medium uppercase tracking-wide text-pink-300/70">วิธีได้มา</p>
        <p className="mt-0.5 text-pink-100/90">{p.obtain}</p>
        {p.gachaWeight > 0 && (
          <p className="mt-1 text-[10px] text-pink-300/60">น้ำหนักในกาชาสัตว์เลี้ยง: {p.gachaWeight}</p>
        )}
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
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">สัตว์เลี้ยง</h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-200/80 md:text-sm">
            สัตว์เลี้ยงทั้งหมด {petall.length} ตัว — แต่ละตัวมีบัฟที่ <b>แรงขึ้นตามเลเวล</b> สวมพร้อมกันได้ {petMeta.maxEquip} ตัว
            (1 ชนิดต่อ 1 ตัว) เลี้ยงด้วยอาหารเพื่อไต่เลเวลถึง Lv.{petMeta.maxLevel}
          </p>
        </header>

        {/* meta */}
        <div className="mx-auto mb-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          <InfoTile label="เลเวลสูงสุด" value={`Lv.${petMeta.maxLevel}`} />
          <InfoTile label="สวมพร้อมกัน" value={`${petMeta.maxEquip} ตัว`} />
          <InfoTile label="อาหาร/เลเวล" value={`${petMeta.foodPerLevel} ชิ้น`} />
          <InfoTile label="กาชาสัตว์เลี้ยง" value={`${fmtNum(petMeta.gachaPrice / 1000000)}M`} />
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {petall.map((p) => (
            <PetCard key={p.key} p={p} />
          ))}
        </div>

        {/* leveling detail */}
        <section className="mx-auto mt-8 max-w-3xl rounded-2xl border border-pink-500/30 bg-black/70 p-4 md:p-6">
          <h2 className="mb-3 text-base font-semibold text-white">📈 การเลี้ยง &amp; ไต่เลเวล</h2>
          <div className="grid grid-cols-1 gap-2 text-xs text-pink-100/90 sm:grid-cols-2 md:text-sm">
            <div className="rounded-xl bg-pink-500/10 px-3 py-2">🍚 อาหาร 1 ชิ้น = +{petMeta.expPerFood} EXP</div>
            <div className="rounded-xl bg-pink-500/10 px-3 py-2">⬆️ {petMeta.expPerLevel} EXP = +1 เลเวล ({petMeta.foodPerLevel} ชิ้น/เลเวล)</div>
            <div className="rounded-xl bg-pink-500/10 px-3 py-2">🏁 เลี้ยงถึง Lv.{petMeta.maxLevel} ใช้ทั้งหมด ~{fmtNum(petMeta.foodToMax)} ชิ้น</div>
            <div className="rounded-xl bg-pink-500/10 px-3 py-2">🔁 ได้ตัวซ้ำจากกาชา คืนเป็นอาหาร {petMeta.dupRefundAmount} ชิ้น</div>
          </div>
          <p className="mt-3 text-[11px] text-pink-300/60">
            🍚 ส่วนใหญ่กิน “ต้นข้าว” • ดาร์คเดวิล/404 เดมอน กิน “ยอดข้าว” • แฮคเกอร์กิน “เหล็ก” • ยิ่งเลเวลสูง บัฟยิ่งแรง (ดู Lv.1 → Lv.50 ในแต่ละการ์ด)
          </p>
        </section>
      </div>
    </div>
  );
}
