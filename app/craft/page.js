"use client";

import { useMemo, useState } from "react";
import { craftCategories, craftRecipes, craftMeta } from "@/json/craft";
import { resolveAsset, fmtNum, pct } from "@/lib/gameAssets";
import AssetIcon from "@/components/AssetIcon";

function chanceTone(chance) {
  const c = Number(chance || 0);
  if (c >= 0.7) return "border-emerald-400/60 bg-emerald-500/15 text-emerald-200";
  if (c >= 0.4) return "border-amber-400/60 bg-amber-500/15 text-amber-200";
  if (c >= 0.2) return "border-orange-400/60 bg-orange-500/15 text-orange-200";
  return "border-rose-400/60 bg-rose-500/15 text-rose-200";
}

function resultLabel(result, name) {
  if (result.kind === "pass") return "Gamepass";
  if (result.kind === "pet") return "สัตว์เลี้ยง";
  if (result.kind === "permanent") return "ไอเทมถาวร";
  return "วัตถุดิบ";
}

function resultAsset(result) {
  if (result.kind === "pet") return resolveAsset(result.petKey);
  if (result.item) return resolveAsset(result.item);
  return { label: "", emoji: "🎟️" };
}

function CostRow({ c }) {
  if (c.kind === "money") {
    return (
      <li className="flex items-center gap-2 rounded-lg bg-pink-500/5 px-2 py-1.5">
        <span className="text-lg leading-none">💰</span>
        <span className="flex-1 text-pink-100/90">เงิน</span>
        <span className="font-semibold text-pink-200">{fmtNum(c.amount)}</span>
      </li>
    );
  }
  const a = resolveAsset(c.item);
  return (
    <li className="flex items-center gap-2 rounded-lg bg-pink-500/5 px-2 py-1.5">
      <AssetIcon img={a.img} emoji={a.emoji} alt={a.label} className="h-6 w-6" />
      <span className="flex-1 truncate text-pink-100/90">{a.label}</span>
      <span className="font-semibold text-pink-200">×{fmtNum(c.amount)}</span>
    </li>
  );
}

function RecipeCard({ r }) {
  const ra = resultAsset(r.result);
  return (
    <article className="flex flex-col rounded-2xl border border-pink-500/30 bg-black/80 p-4 text-xs text-pink-50 shadow-sm transition hover:-translate-y-1 hover:border-pink-400/80 hover:shadow-pink-500/30 md:text-sm">
      {/* หัวการ์ด: ผลลัพธ์ */}
      <div className="mb-3 flex items-start gap-3">
        <AssetIcon img={ra.img} emoji={ra.emoji} alt={r.name} className="h-14 w-14 rounded-2xl" />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold text-pink-50">{r.name}</h2>
          <span className="mt-0.5 inline-flex items-center rounded-full bg-pink-500/15 px-2 py-0.5 text-[11px] font-medium text-pink-200">
            {resultLabel(r.result)}
          </span>
        </div>
        <span
          className={
            "flex-shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold " +
            chanceTone(r.chance)
          }
          title="โอกาสคราฟสำเร็จ"
        >
          {pct(r.chance)}
        </span>
      </div>

      {/* วัตถุดิบ */}
      <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-pink-300/70">
        วัตถุดิบ
      </p>
      <ul className="flex flex-col gap-1">
        {r.cost.map((c, i) => (
          <CostRow key={i} c={c} />
        ))}
      </ul>
    </article>
  );
}

export default function CraftPage() {
  const [cat, setCat] = useState("Item");
  const [search, setSearch] = useState("");

  const list = useMemo(() => {
    const q = search.trim().toLowerCase();
    const arr = craftRecipes[cat] || [];
    if (!q) return arr;
    return arr.filter((r) => {
      const ra = resultAsset(r.result);
      return `${r.name} ${r.id} ${ra.label}`.toLowerCase().includes(q);
    });
  }, [cat, search]);

  const totalCount = useMemo(
    () => Object.values(craftRecipes).reduce((n, a) => n + a.length, 0),
    []
  );

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        {/* header */}
        <header className="mb-6 text-center md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            🛠️ Craft Table
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
            สูตรคราฟ (โต๊ะคราฟ)
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-200/80 md:text-sm">
            รวมสูตรคราฟทั้งหมด {totalCount} สูตร — ใช้วัตถุดิบจากฟาร์ม + เงิน คราฟเป็นไอเทม/กล่องกาชา/Gamepass
            แต่ละสูตรมี “โอกาสสำเร็จ” ต่างกัน
          </p>
          <p className="mx-auto mt-2 max-w-2xl rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-[11px] text-amber-200/90">
            ⚠️ วัตถุดิบจะถูกใช้ทันทีแม้คราฟไม่สำเร็จ • ต้องอยู่ใกล้โต๊ะคราฟไม่เกิน {craftMeta.maxDistance} ช่อง
          </p>
        </header>

        {/* tabs + search */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {craftCategories.map((c) => {
              const active = cat === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  className={
                    "rounded-full border px-4 py-1.5 text-xs font-medium transition md:text-sm " +
                    (active
                      ? "border-pink-200 bg-pink-500 text-black"
                      : "border-pink-500/40 bg-black/60 text-pink-100 hover:bg-pink-500/10")
                  }
                >
                  {c.label}{" "}
                  <span className="opacity-70">({(craftRecipes[c.id] || []).length})</span>
                </button>
              );
            })}
          </div>
          <div className="relative md:w-72">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหาสูตร..."
              className="w-full rounded-xl border border-pink-500/40 bg-black/60 px-3 py-2 text-xs text-pink-50 placeholder-pink-200/40 outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-400/70 md:text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-2 text-[11px] text-pink-200/80 hover:bg-pink-500/10"
              >
                ล้าง
              </button>
            )}
          </div>
        </div>

        {/* grid */}
        {list.length === 0 ? (
          <p className="py-16 text-center text-sm text-pink-200/70">ไม่พบสูตรที่ค้นหา</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((r) => (
              <RecipeCard key={r.id} r={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
