"use client";

import { useMemo, useState } from "react";
import { shopVendors } from "@/json/shop";
import { resolveAsset, fmtNum } from "@/lib/gameAssets";
import AssetIcon from "@/components/AssetIcon";

function ItemCard({ it }) {
  const [code, name, price, minLevel, limited] = it;
  const a = resolveAsset(code);
  return (
    <article className="flex items-center gap-3 rounded-2xl border border-pink-500/25 bg-black/70 p-3 transition hover:-translate-y-0.5 hover:border-pink-400/60">
      <AssetIcon img={a.img} emoji={a.emoji} alt={name} className="h-12 w-12 rounded-xl" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-sm font-medium text-pink-50">{name}</p>
          {limited && (
            <span className="flex-shrink-0 rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-bold text-amber-300">
              LIMITED
            </span>
          )}
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-[11px]">
          <span className="font-semibold text-emerald-200">
            {price === 0 ? "แจกฟรี / อีเวนต์" : `💰 ${fmtNum(price)}`}
          </span>
          <span className="text-pink-300/60">Lv.{minLevel}+</span>
        </div>
      </div>
    </article>
  );
}

export default function ShopPage() {
  const [vk, setVk] = useState(shopVendors[0].key);
  const [search, setSearch] = useState("");
  const vendor = shopVendors.find((v) => v.key === vk);

  const items = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return vendor.items;
    return vendor.items.filter((it) => `${it[0]} ${it[1]}`.toLowerCase().includes(q));
  }, [vendor, search]);

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
            🛒 In-Game Shop
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">ร้านค้า NPC</h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-200/80 md:text-sm">
            ซื้อของด้วยเงินในเกม (ไม่ใช่ Robux) — ของส่วนใหญ่ซื้อได้ 1 ชิ้น/คน และมีเลเวลขั้นต่ำ
          </p>
        </header>

        {/* vendor tabs + search */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {shopVendors.map((v) => {
              const active = vk === v.key;
              return (
                <button
                  key={v.key}
                  onClick={() => setVk(v.key)}
                  className={
                    "rounded-full border px-4 py-1.5 text-xs font-medium transition md:text-sm " +
                    (active
                      ? "border-pink-200 bg-pink-500 text-black"
                      : "border-pink-500/40 bg-black/60 text-pink-100 hover:bg-pink-500/10")
                  }
                >
                  {v.emoji} {v.title} <span className="opacity-70">({v.items.length})</span>
                </button>
              );
            })}
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาไอเทม..."
            className="rounded-xl border border-pink-500/40 bg-black/60 px-3 py-2 text-xs text-pink-50 placeholder-pink-200/40 outline-none focus:border-pink-300 md:w-56 md:text-sm"
          />
        </div>

        <p className="mb-4 text-xs text-pink-200/70">💬 {vendor.note}</p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <ItemCard key={it[0]} it={it} />
          ))}
        </div>
        {items.length === 0 && (
          <p className="py-12 text-center text-sm text-pink-200/70">ไม่พบไอเทมที่ค้นหา</p>
        )}

        <p className="mt-5 text-center text-[11px] text-pink-300/60">
          * ราคา/เลเวลอ้างอิงจากในเกม ของ LIMITED เปิดขายเป็นช่วงเวลา อาจไม่มีในร้านตลอด
        </p>
      </div>
    </div>
  );
}
