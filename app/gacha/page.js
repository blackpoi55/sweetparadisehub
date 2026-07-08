"use client";

import { useMemo, useState } from "react";
import { gachaPools, gachaMeta } from "@/json/gacha";
import { resolveAsset, fmtNum, rarityStyle, RARITY_ORDER } from "@/lib/gameAssets";
import AssetIcon from "@/components/AssetIcon";

function computeRows(pool) {
  const total = pool.items.reduce((s, it) => s + Number(it.weight || 0), 0) || 1;
  return pool.items
    .map((it) => ({ ...it, chance: (Number(it.weight || 0) / total) * 100 }))
    .sort((a, b) => {
      const ra = RARITY_ORDER.indexOf(a.rarity);
      const rb = RARITY_ORDER.indexOf(b.rarity);
      if (ra !== rb) return rb - ra; // หายากก่อน
      return b.chance - a.chance;
    });
}

function fmtPct(n) {
  if (n > 0 && n < 0.01) return "<0.01%";
  if (n < 1) return `${n.toFixed(2)}%`;
  return `${n.toFixed(1)}%`;
}

function ItemRow({ it }) {
  const a = resolveAsset(it.item);
  const rs = rarityStyle(it.rarity);
  const range =
    it.min != null ? (it.max && it.max !== it.min ? `${fmtNum(it.min)}–${fmtNum(it.max)}` : fmtNum(it.min)) : null;
  return (
    <div className="flex items-center gap-3 rounded-xl border border-pink-500/15 bg-black/50 p-2.5">
      <AssetIcon img={a.img} emoji={a.emoji} alt={a.label} className="h-11 w-11 rounded-xl" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-pink-50 md:text-sm">
          {a.label}
          {range && <span className="ml-1 text-pink-300/70">×{range}</span>}
        </p>
        <span
          className={"mt-0.5 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium " + rs.className}
        >
          {rs.label}
        </span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-sm font-bold text-pink-100">{fmtPct(it.chance)}</span>
        <span className="text-[10px] text-pink-300/60">w{it.weight}</span>
      </div>
    </div>
  );
}

export default function GachaPage() {
  const [poolKey, setPoolKey] = useState(gachaPools[0].key);
  const pool = useMemo(() => gachaPools.find((p) => p.key === poolKey), [poolKey]);
  const rows = useMemo(() => (pool ? computeRows(pool) : []), [pool]);

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
            🎰 Gacha Rates
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
            อัตราออกกาชา
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-200/80 md:text-sm">
            อัตราออกของทุกกล่องกาชา คำนวณจากน้ำหนัก (weight) ของแต่ละชิ้นหารด้วยผลรวมทั้ง pool —
            เปิดได้สูงสุด {gachaMeta.maxPerBuy} ครั้ง/รอบ
          </p>
        </header>

        {/* pool selector */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {gachaPools.map((p) => {
            const active = poolKey === p.key;
            return (
              <button
                key={p.key}
                onClick={() => setPoolKey(p.key)}
                className={
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition md:text-sm " +
                  (active
                    ? "border-pink-200 bg-pink-500 text-black"
                    : "border-pink-500/40 bg-black/60 text-pink-100 hover:bg-pink-500/10")
                }
              >
                {p.displayName}
              </button>
            );
          })}
        </div>

        {pool && (
          <div className="mx-auto max-w-3xl">
            {/* pool header */}
            <div className="mb-4 flex flex-col gap-2 rounded-2xl border border-pink-500/30 bg-black/70 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-pink-50">{pool.displayName}</h2>
                <p className="mt-0.5 text-[11px] text-pink-200/70">🎯 ที่มา: {pool.source}</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                {pool.price != null && (
                  <span className="rounded-full bg-pink-500/15 px-3 py-1 font-medium text-pink-200">
                    💰 {pool.price === 0 ? "แจกฟรี/อีเวนต์" : `${fmtNum(pool.price)}/กล่อง`}
                  </span>
                )}
                <span className="rounded-full bg-fuchsia-500/10 px-3 py-1 text-pink-100">
                  {pool.items.length} ชิ้น
                </span>
              </div>
            </div>

            {/* item list */}
            <div className="flex flex-col gap-2">
              {rows.map((it, i) => (
                <ItemRow key={i} it={it} />
              ))}
            </div>

            <p className="mt-4 text-center text-[11px] text-pink-300/60">
              * w = weight (น้ำหนักดิบในเกม) • % คือโอกาสออกต่อการเปิด 1 ครั้ง
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
