"use client";

import { useMemo, useState } from "react";
import { resolveAsset, fmtNum } from "@/lib/gameAssets";
import AssetIcon from "@/components/AssetIcon";

function ListingCard({ l }) {
  const a = resolveAsset(l.item);
  return (
    <article
      className={
        "flex items-center gap-3 rounded-2xl border p-3 " +
        (l.featured ? "border-amber-400/40 bg-amber-500/5" : "border-pink-500/25 bg-black/70")
      }
    >
      <AssetIcon img={a.img} emoji={a.emoji} alt={a.label} className="h-12 w-12 rounded-xl" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-sm font-medium text-pink-50">{a.label}</p>
          {l.qty > 1 && <span className="text-[11px] text-pink-300/70">×{fmtNum(l.qty)}</span>}
          {l.featured && (
            <span className="flex-shrink-0 rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-300">
              🚀 ดัน
            </span>
          )}
        </div>
        <p className="text-[11px] text-pink-200/70">👤 {l.sellerName}</p>
      </div>
      <div className="flex flex-shrink-0 flex-col items-end">
        <span className="text-sm font-bold text-emerald-200">💰 {fmtNum(l.unit)}</span>
        <span className="text-[10px] text-pink-300/60">ต่อชิ้น</span>
      </div>
    </article>
  );
}

export default function MarketListingsClient({ listings, live }) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return listings;
    return listings.filter((l) => {
      const a = resolveAsset(l.item);
      return `${l.item} ${a.label} ${l.sellerName}`.toLowerCase().includes(q);
    });
  }, [listings, search]);

  return (
    <section className="mt-8">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            🛍️ สินค้าในตลาดตอนนี้ <span className="text-pink-300">({fmtNum(listings.length)})</span>
          </h2>
          <p className="text-[11px] text-pink-200/70">ข้อมูลสดจากในเกม — เห็นราคาก่อนเข้าเกม</p>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ค้นหาสินค้า/คนขาย..."
          className="rounded-xl border border-pink-500/40 bg-black/60 px-3 py-2 text-xs text-pink-50 placeholder-pink-200/40 outline-none focus:border-pink-300 md:w-56 md:text-sm"
        />
      </div>

      {!live ? (
        <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 px-4 py-6 text-center text-[12px] text-amber-200/90">
          ⚠️ ยังดึงข้อมูลตลาดสดไม่ได้ — ต้องเปิดสิทธิ์อ่าน DataStore <span className="font-mono">Market_Listings_v1</span> ให้ API key
        </div>
      ) : listings.length === 0 ? (
        <p className="rounded-2xl border border-pink-500/20 bg-black/50 py-12 text-center text-sm text-pink-200/70">
          ยังไม่มีสินค้าวางขายในตลาดตอนนี้
        </p>
      ) : filtered.length === 0 ? (
        <p className="rounded-2xl border border-pink-500/20 bg-black/50 py-12 text-center text-sm text-pink-200/70">
          ไม่พบสินค้าที่ค้นหา
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => (
            <ListingCard key={l.id} l={l} />
          ))}
        </div>
      )}
    </section>
  );
}
