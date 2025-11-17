"use client";

import React, { useMemo, useState } from "react";
import {
  fishall,
  trashall,
  fishgiveitem,
  rodall,
} from "@/json/fishing"; // ปรับ path ให้ตรงกับโปรเจ็คของจริง

// ลำดับความหายาก สำหรับ sort / แสดง
const RARITY_ORDER = [
  "ธรรมดา",
  "แรร์",
  "อัลตร้าแรร์",
  "ตำนาน",
  "เทพนิยาย",
  "สายรุ้ง",
];

function getRarityStyle(rarity) {
  if (rarity === "สายรุ้ง") {
    return {
      label: rarity,
      className:
        "border border-pink-300/70 bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 text-black font-semibold",
    };
  }
  if (rarity === "ธรรมดา") {
    return {
      label: rarity,
      className: "border border-slate-400/80 bg-[#B0BEC5] text-slate-900",
    };
  }
  if (rarity === "แรร์") {
    return {
      label: rarity,
      className:
        "border border-sky-400/80 bg-[#42A5F5] text-slate-900 font-medium",
    };
  }
  if (rarity === "อัลตร้าแรร์") {
    return {
      label: rarity,
      className:
        "border border-purple-400/80 bg-[#AB47BC] text-slate-50 font-medium",
    };
  }
  if (rarity === "ตำนาน") {
    return {
      label: rarity,
      className:
        "border border-amber-300/80 bg-[#FFC107] text-slate-900 font-semibold",
    };
  }
  if (rarity === "เทพนิยาย") {
    return {
      label: rarity,
      className:
        "border border-red-400/80 bg-[#FF3B30] text-slate-50 font-semibold",
    };
  }
  return {
    label: rarity || "ไม่ทราบ",
    className: "border border-slate-500/60 bg-slate-600 text-slate-50",
  };
}

function formatNumber(n) {
  if (n == null || isNaN(Number(n))) return "-";
  return Number(n).toLocaleString("th-TH");
}

function formatRate(rate) {
  if (rate == null || isNaN(Number(rate))) return "-";
  const num = Number(rate);
  if (num >= 1) return `${num}%`;
  return `${num.toFixed(3)}%`;
}

// ---------- COMPONENTS ย่อย ----------

function StatCard({ title, value, subtitle }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-pink-500/40 bg-black/70 p-4 shadow-sm">
      <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-pink-500/30 blur-2xl" />
      <div className="relative">
        <div className="text-xs font-medium uppercase tracking-[0.16em] text-pink-200/80">
          {title}
        </div>
        <div className="mt-2 text-2xl font-bold text-pink-50">
          {value}
        </div>
        {subtitle && (
          <div className="mt-1 text-[11px] text-pink-200/80">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

function RodCard({ rod }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-pink-500/30 bg-black/80 p-4 text-xs text-pink-50 shadow-sm transition hover:-translate-y-1 hover:border-pink-400/80 hover:shadow-pink-500/40 md:text-sm">
      <div className="mb-4 flex items-start gap-3">
        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500/40 via-fuchsia-500/30 to-slate-900">
          {rod.rodimage ? (
            <img
              src={rod.rodimage}
              alt={rod.rodname}
              className="h-full w-full object-contain transition-transform group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg">
              🎣
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-pink-50 md:text-base">
            {rod.rodname}
          </h3>
          <p className="mt-1 text-[11px] text-pink-200/80">
            สายโหดประจำแมพ Sweet Paradise
          </p>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-2 text-[11px] md:grid-cols-4 md:text-xs">
        <div className="rounded-xl bg-pink-500/10 px-3 py-2">
          <dt className="text-pink-200/80">คูลดาวน์</dt>
          <dd className="mt-0.5 font-semibold text-pink-50">
            {rod.cooldown} วินาที
          </dd>
        </div>
        <div className="rounded-xl bg-pink-500/10 px-3 py-2">
          <dt className="text-pink-200/80">โอกาสดรอป (Luck)</dt>
          <dd className="mt-0.5 font-semibold text-emerald-300">
            {rod.Luck}
          </dd>
        </div>
        <div className="rounded-xl bg-pink-500/10 px-3 py-2">
          <dt className="text-pink-200/80">โบนัสเงิน</dt>
          <dd className="mt-0.5 font-semibold text-amber-300">
            {rod.money}
          </dd>
        </div>
        <div className="rounded-xl bg-pink-500/10 px-3 py-2">
          <dt className="text-pink-200/80">คะแนนสะสม</dt>
          <dd className="mt-0.5 font-semibold text-sky-300">
            {rod.Score}
          </dd>
        </div>
      </dl>
    </article>
  );
}

function FishToItemCard({ entry }) {
  return (
    <article className="group flex flex-col gap-3 rounded-2xl border border-pink-500/30 bg-black/80 p-4 text-xs text-pink-50 shadow-sm transition hover:-translate-y-1 hover:border-pink-400/80 hover:shadow-pink-500/40 md:flex-row md:items-center md:text-sm">
      <div className="flex-1">
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-pink-200/90">
          ตกได้ปลา
        </div>
        <div className="mt-1 text-sm font-semibold text-pink-50 md:text-base">
          {entry.fishname}
        </div>
        <div className="mt-2 text-[11px] text-pink-200/80">
          จะได้รับไอเท็มสุดพิเศษต่อไปนี้:
        </div>
      </div>
      <div className="flex flex-1 items-center gap-3 md:justify-end">
        <div className="hidden text-lg md:block">🎣</div>
        <div className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-pink-500/10 px-3 py-2">
          {entry.itemimage && (
            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-pink-500/40 via-fuchsia-500/30 to-slate-900">
              <img
                src={entry.itemimage}
                alt={entry.itemname}
                className="h-full w-full object-contain"
              />
            </div>
          )}
          <div className="min-w-0">
            <div className="text-[11px] text-pink-200/80">
              ไอเท็มที่ได้รับ
            </div>
            <div className="truncate text-sm font-semibold text-pink-50">
              {entry.itemname}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function FishingPage() {
  const [search, setSearch] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("ALL");
  const [showUnactive, setShowUnactive] = useState(false);

  // ---------- สรุปสถิติคร่าว ๆ ----------
  const stats = useMemo(() => {
    const totalFish = fishall.length;
    const totalTrash = trashall.length;

    let highestPrice = null;
    let rarest = null;

    for (const f of fishall) {
      if (!highestPrice || f.price > highestPrice.price) highestPrice = f;
      if (!rarest || f.rate < rarest.rate) rarest = f;
    }

    const legendaryCount = fishall.filter(
      (f) => f.rarity === "ตำนาน" || f.rarity === "เทพนิยาย" || f.rarity === "สายรุ้ง"
    ).length;

    return {
      totalFish,
      totalTrash,
      highestPrice,
      rarest,
      legendaryCount,
    };
  }, []);

  // ความหายากที่มีจริง
  const rarityList = useMemo(() => {
    const set = new Set(fishall.map((f) => f.rarity));
    return RARITY_ORDER.filter((r) => set.has(r));
  }, []);

  // ---------- Filter ----------
  const filteredFish = useMemo(() => {
    const q = search.trim().toLowerCase();

    return fishall
      .filter((f) => {
        if (!showUnactive && f.status !== "Active") return false;
        if (selectedRarity !== "ALL" && f.rarity !== selectedRarity) return false;

        if (!q) return true;
        const blob = `${f.name} ${f.rarity}`.toLowerCase();
        return blob.includes(q);
      })
      .sort((a, b) => {
        const ra = RARITY_ORDER.indexOf(a.rarity);
        const rb = RARITY_ORDER.indexOf(b.rarity);
        if (ra !== rb) return ra - rb;
        return a.name.localeCompare(b.name, "th");
      });
  }, [search, selectedRarity, showUnactive]);

  const filteredTrash = useMemo(() => {
    const q = search.trim().toLowerCase();
    return trashall.filter((t) => {
      if (!q) return true;
      return t.name.toLowerCase().includes(q);
    });
  }, [search]);

  const resetFilters = () => {
    setSearch("");
    setSelectedRarity("ALL");
    setShowUnactive(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      {/* BG */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        {/* Header */}
        <header className="mb-6 md:mb-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
              Sweet Paradise • Fishing
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
              ระบบ{" "}
              <span className="text-pink-300">ตกปลา</span>{" "}
              และปลาทั้งหมดในแมพ
            </h1>
            <p className="mt-3 text-sm text-pink-100/85 md:text-base">
              ดูความโหดของคันเบ็ด ปลาหายากทุกระดับ
              ของรางวัลลับ และอัตราดรอปทุกตัวในที่เดียว 🎣
            </p>
          </div>

          {/* Stats */}
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <StatCard
              title="จำนวนปลาทั้งหมด"
              value={`${stats.totalFish} ตัว`}
              subtitle="รวมทุกระดับความหายาก"
            />
            <StatCard
              title="ขยะ / เหตุการณ์"
              value={`${stats.totalTrash} แบบ`}
              subtitle="โอกาสดวงซวย / ดวงว่างเปล่า"
            />
            <StatCard
              title="ปลาราคาแพงสุด"
              value={stats.highestPrice ? stats.highestPrice.name : "-"}
              subtitle={
                stats.highestPrice
                  ? `${formatNumber(stats.highestPrice.price)} เงินต่อชิ้น`
                  : ""
              }
            />
            <StatCard
              title="ปลาสุดโหด"
              value={stats.rarest ? stats.rarest.name : "-"}
              subtitle={
                stats.rarest
                  ? `อัตราดรอปเพียง ${formatRate(stats.rarest.rate)}`
                  : ""
              }
            />
          </div>
        </header>

        {/* Section 1: ตารางเบ็ด */}
        <section className="mt-6 md:mt-8">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-pink-50 md:text-base">
                1. ตารางความสามารถของคันเบ็ด
              </h2>
              <p className="text-[11px] text-yellow-200/80 md:text-xs">
                หากมี VIP โชคจะ + อีก 200% ไม่ว่าจะถือเบ็ดไหน
              </p>
               <p className="text-[11px] text-green-200/80 md:text-xs">
                หากกดมินิเกมโดนจะได้รับโบนัส (ตกรอบต่อไปออโต้ ลดเวลาในการตกรอบต่อไป 2 วินาที +โชคทบไปเรื่อยๆ ราคาปลาตัวนั้น+20% )
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {rodall.map((rod) => (
              <RodCard key={rod.rodname} rod={rod} />
            ))}
          </div>
        </section>

        {/* Section 2: ปลาที่ให้ไอเท็มพิเศษ */}
        <section className="mt-8 md:mt-10">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-pink-50 md:text-base">
                2. ปลาที่ให้ไอเท็มพิเศษเมื่อจับได้
              </h2>
              <p className="text-[11px] text-pink-200/80 md:text-xs">
                ปลาสายรุ้งและปลาระดับพิเศษบางตัว
                จะมอบของโคตรหายากให้ทันทีเมื่อจับได้
                เป็นรางวัลให้กับคนที่โชคดีสุด ๆ
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {fishgiveitem.map((entry) => (
              <FishToItemCard
                key={entry.fishname + entry.itemname}
                entry={entry}
              />
            ))}
          </div>
        </section>

        {/* Section 3: ตารางปลา + ขยะ + filter */}
        <section className="mt-8 md:mt-10">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-pink-50 md:text-base">
                3. ตารางปลาและขยะทั้งหมด
              </h2>
              <p className="text-[11px] text-pink-200/80 md:text-xs">
                สามารถค้นหาตามชื่อปลา เลือกดูเฉพาะความหายาก
                และเลือกแสดง/ซ่อนปลาที่ปิดใช้งานแล้วได้
              </p>
            </div>

            {/* Filter Panel */}
            <div className="flex flex-col gap-2 md:w-[60%]">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <label className="mb-1 block text-[11px] font-medium text-pink-200/80">
                    ค้นหาปลา / ขยะ
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="พิมพ์ชื่อปลา หรือชื่อขยะที่ต้องการค้นหา..."
                      className="w-full rounded-xl border border-pink-500/40 bg-black/60 px-3 py-2 text-xs text-pink-50 placeholder-pink-200/40 outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-400/70 md:text-sm"
                    />
                    {search && (
                      <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-2 text-[11px] text-pink-200/80 hover:bg-pink-500/10"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 md:w-auto">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-1 rounded-full border border-pink-400/60 bg-black/70 px-3 py-1.5 text-[11px] font-medium text-pink-100 hover:bg-pink-500/10"
                  >
                    รีเซ็ตฟิลเตอร์
                  </button>
                </div>
              </div>

              {/* Rarity Filter + toggle */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-medium text-pink-200/80">
                  ความหายาก:
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedRarity("ALL")}
                  className={`rounded-full border px-3 py-1 text-[11px] transition ${selectedRarity === "ALL"
                      ? "border-pink-200 bg-pink-500 text-black"
                      : "border-pink-500/40 bg-black/60 text-pink-100 hover:bg-pink-500/10"
                    }`}
                >
                  ทั้งหมด
                </button>
                {rarityList.map((r) => {
                  const style = getRarityStyle(r);
                  const active = selectedRarity === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setSelectedRarity(r)}
                      className={`rounded-full border px-3 py-1 text-[11px] transition ${active
                          ? `${style.className} ring-2 ring-pink-300/70`
                          : "border-pink-500/40 bg-black/60 text-pink-100 hover:bg-pink-500/10"
                        }`}
                    >
                      {style.label}
                    </button>
                  );
                })}

                <div className="ml-auto flex items-center gap-2">
                  <label className="inline-flex cursor-pointer items-center gap-1 text-[11px] text-pink-200/80">
                    <input
                      type="checkbox"
                      checked={showUnactive}
                      onChange={(e) => setShowUnactive(e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-pink-400 bg-black/70 text-pink-400 focus:ring-pink-400"
                    />
                    แสดงปลาที่ปิดใช้งานแล้ว
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* ตารางปลา */}
          <div className="overflow-hidden rounded-2xl border border-pink-500/25 bg-black/70">
            <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2 border-b border-pink-500/20 bg-pink-500/10 px-3 py-2 text-[11px] font-medium text-pink-100 md:px-4 md:text-xs">
              <span>ชื่อปลา</span>
              <span>ความหายาก</span>
              <span className="text-right">ราคา</span>
              <span className="text-right">คะแนน</span>
              <span className="text-right">โอกาสติด</span>
              <span className="text-right">สถานะ</span>
            </div>

            <div className="divide-y divide-pink-500/15">
              {filteredFish.map((f) => {
                const rarityStyle = getRarityStyle(f.rarity);
                const active = f.status === "Active";
                return (
                  <div
                    key={f.name}
                    className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] items-center gap-2 px-3 py-2 text-[11px] text-pink-50 md:px-4 md:text-xs"
                  >
                    <span className="truncate">{f.name}</span>
                    <span>
                      <span
                        className={
                          "inline-flex max-w-[6.5rem] items-center justify-center truncate rounded-full px-2 py-0.5 text-[10px] " +
                          rarityStyle.className
                        }
                      >
                        {rarityStyle.label}
                      </span>
                    </span>
                    <span className="text-right">
                      {formatNumber(f.price)}
                    </span>
                    <span className="text-right">
                      {formatNumber(f.score)}
                    </span>
                    <span className="text-right">
                      {formatRate(f.rate)}
                    </span>
                    <span className="text-right">
                      <span
                        className={`inline-flex items-center justify-end gap-1 rounded-full px-2 py-0.5 text-[10px] ${active
                            ? "bg-emerald-500/15 text-emerald-300"
                            : "bg-slate-500/20 text-slate-300"
                          }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${active ? "bg-emerald-400" : "bg-slate-400"
                            }`}
                        />
                        {active ? "Active" : "UnActive"}
                      </span>
                    </span>
                  </div>
                );
              })}

              {filteredFish.length === 0 && (
                <div className="px-4 py-6 text-center text-xs text-pink-100/70">
                  ไม่พบบันทึกปลาในเงื่อนไขปัจจุบัน
                  ลองเปลี่ยนฟิลเตอร์หรือเคลียร์การค้นหาดูนะ 🎣
                </div>
              )}
            </div>
          </div>

          {/* ตารางขยะ / ว่างเปล่า */}
          <div className="mt-6">
            <h3 className="mb-2 text-xs font-semibold text-pink-100 md:text-sm">
              ขยะ / ว่างเปล่า ที่อาจตกได้
            </h3>
            <div className="overflow-hidden rounded-2xl border border-pink-500/25 bg-black/70">
              <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2 border-b border-pink-500/20 bg-pink-500/10 px-3 py-2 text-[11px] font-medium text-pink-100 md:px-4 md:text-xs">
                <span>ชื่อขยะ / เหตุการณ์</span>
                <span>ประเภท</span>
                <span className="text-right">โอกาสเกิด</span>
              </div>

              <div className="divide-y divide-pink-500/15">
                {filteredTrash.map((t) => (
                  <div
                    key={t.name}
                    className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] items-center gap-2 px-3 py-2 text-[11px] text-pink-50 md:px-4 md:text-xs"
                  >
                    <span className="truncate">{t.name}</span>
                    <span>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] ${t.type === "nothing"
                            ? "border border-slate-500/70 bg-slate-700/60 text-slate-100"
                            : "border border-amber-400/70 bg-amber-500/20 text-amber-200"
                          }`}
                      >
                        {t.type === "nothing" ? "ว่างเปล่า" : "ขยะ"}
                      </span>
                    </span>
                    <span className="text-right">
                      {formatRate(t.rate)}
                    </span>
                  </div>
                ))}

                {filteredTrash.length === 0 && (
                  <div className="px-4 py-4 text-center text-xs text-pink-100/70">
                    ไม่พบขยะในเงื่อนไขปัจจุบัน
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
