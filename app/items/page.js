"use client";

import { useMemo, useState } from "react";
import { itemall } from "@/json/item";



function ItemCard({ item }) {
  console.log("itemall", itemall)
  return (
    <article className="group flex flex-col rounded-2xl border border-pink-500/30 bg-black/80 p-4 text-sm text-pink-50 shadow-sm transition hover:-translate-y-1 hover:border-pink-400/80 hover:shadow-pink-500/30">
      {/* รูป + ชื่อ */}
      <div className="mb-3 flex items-start gap-3">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500/40 via-fuchsia-500/30 to-slate-900">
          {item.icon ? (
            <img
              src={item.icon}
              alt={item.nameTH}
              className="h-full w-full object-cover transition-transform group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl">
              🍭
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-pink-50">
            {item.nameTH}
          </h2>
          <p className="mt-0.5 text-[11px] text-pink-200/80">{item.code}</p>
          <div className="mt-1 flex flex-wrap gap-1">
            {item.grouptype && (
              <span className="inline-flex items-center rounded-full bg-pink-500/15 px-2 py-0.5 text-[11px] font-medium text-pink-200">
                {item.grouptype}
              </span>
            )}
            {item.getby && (
              <span className="inline-flex items-center rounded-full bg-fuchsia-500/10 px-2 py-0.5 text-[11px] text-pink-100">
                {item.getby}
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="flex-1 text-xs leading-relaxed text-pink-100/85">
        {item.detail}
      </p>
    </article>
  );
}

export default function ItemsPage() {
  const [search, setSearch] = useState("");
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [sortBy, setSortBy] = useState("name"); // name | group | source

  // ดึงประเภทจาก JSON แบบ dynamic
  const groupTypes = useMemo(
    () =>
      Array.from(
        new Set(
          itemall
            .map((i) => i.grouptype)
            .filter((v) => v && String(v).trim().length > 0)
        )
      ),
    []
  );

  // ดึงวิธีได้จาก JSON แบบ dynamic
  const sources = useMemo(
    () =>
      Array.from(
        new Set(
          itemall
            .map((i) => i.getby)
            .filter((v) => v && String(v).trim().length > 0)
        )
      ),
    []
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    let list = itemall.filter((item) => {
      const blob =
        `${item.nameTH ?? ""} ${item.code ?? ""} ${item.detail ?? ""
          } ${item.grouptype ?? ""} ${item.getby ?? ""}`.toLowerCase();

      if (q && !blob.includes(q)) return false;

      const hasGroup = selectedGroups.length > 0;
      const hasSource = selectedSources.length > 0;

      const matchGroup = hasGroup
        ? selectedGroups.includes(item.grouptype)
        : true;

      const matchSource = hasSource
        ? selectedSources.includes(item.getby)
        : true;

      // โหมดเข้มงวด (AND): ต้องผ่านทุกฟิลเตอร์ที่เลือก
      return matchGroup && matchSource;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === "group") {
        return String(a.grouptype || "").localeCompare(
          String(b.grouptype || ""),
          "th"
        );
      }
      if (sortBy === "source") {
        return String(a.getby || "").localeCompare(
          String(b.getby || ""),
          "th"
        );
      }
      // default: ตามชื่อ
      return String(a.nameTH || "").localeCompare(
        String(b.nameTH || ""),
        "th"
      );
    });

    return list;
  }, [search, selectedGroups, selectedSources, sortBy]);

  const toggle = (val, setter) => {
    setter((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedGroups([]);
    setSelectedSources([]);
    setSortBy("name");
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
              Sweet Paradise • Items
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
              ไอเท็มทั้งหมดใน{" "}
              <span className="text-pink-300">Sweet Paradise</span>
            </h1>
            <p className="mt-3 text-sm text-pink-100/85 md:text-base">
              ค้นหา / กรองตามประเภทและวิธีได้ ระบบฟิลเตอร์ใช้แบบเข้มงวด
              (ต้องตรงทุกเงื่อนไขที่เลือก)
            </p>
          </div>

          {/* Filter Panel */}
          <div className="mt-5 rounded-2xl border border-pink-500/30 bg-black/70 p-4 text-xs text-pink-50 shadow-sm md:text-sm">
            {/* แถว search + sort + reset */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <label className="mb-1 block text-[11px] font-medium text-pink-200/80">
                  ค้นหาไอเท็ม
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="พิมพ์ชื่อไอเท็ม, โค้ด, รายละเอียด หรือคำสำคัญ..."
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

              <div className="flex flex-wrap items-center gap-3 md:w-auto md:justify-end">
                <div>
                  <div className="mb-1 text-[11px] font-medium text-pink-200/80">
                    เรียงตาม
                  </div>
                  <div className="inline-flex overflow-hidden rounded-full border border-pink-500/40 bg-black/60 text-[11px]">
                    {[
                      { id: "name", label: "ชื่อ" },
                      { id: "group", label: "ประเภท" },
                      { id: "source", label: "วิธีได้" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSortBy(opt.id)}
                        className={`px-3 py-1.5 ${sortBy === opt.id
                            ? "bg-pink-500 text-black"
                            : "text-pink-100/80 hover:bg-pink-500/10"
                          }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded-full border border-pink-400/60 bg-black/70 px-3 py-1.5 text-[11px] font-medium text-pink-100 hover:bg-pink-500/10"
                >
                  รีเซ็ตทั้งหมด
                </button>
              </div>
            </div>

            {/* แถว chips */}
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div>
                <div className="mb-1 text-[11px] font-medium text-pink-200/80">
                  ประเภทไอเท็ม (grouptype)
                </div>
                <div className="flex flex-wrap gap-2">
                  {groupTypes.map((g) => {
                    const active = selectedGroups.includes(g);
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => toggle(g, setSelectedGroups)}
                        className={`rounded-full border px-3 py-1 text-[11px] transition ${active
                            ? "border-pink-200 bg-pink-500 text-black"
                            : "border-pink-500/40 bg-black/60 text-pink-100 hover:bg-pink-500/10"
                          }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                  {groupTypes.length === 0 && (
                    <span className="text-[11px] text-pink-200/60">
                      ยังไม่มีข้อมูลประเภทใน JSON
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="mb-1 text-[11px] font-medium text-pink-200/80">
                  วิธีได้ไอเท็ม (getby)
                </div>
                <div className="flex flex-wrap gap-2">
                  {sources.map((s) => {
                    const active = selectedSources.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggle(s, setSelectedSources)}
                        className={`rounded-full border px-3 py-1 text-[11px] transition ${active
                            ? "border-pink-200 bg-pink-500 text-black"
                            : "border-pink-500/40 bg-black/60 text-pink-100 hover:bg-pink-500/10"
                          }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                  {sources.length === 0 && (
                    <span className="text-[11px] text-pink-200/60">
                      ยังไม่มีข้อมูลวิธีได้ใน JSON
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-pink-200/80">
              <span>
                พบไอเท็ม{" "}
                <span className="font-semibold text-pink-100">
                  {filtered.length}
                </span>{" "}
                จากทั้งหมด{" "}
                <span className="font-semibold text-pink-100">
                  {itemall.length}
                </span>
              </span>
              <span className="text-pink-200/60">
                * ฟิลเตอร์ใช้แบบเข้มงวด (AND) : ต้องตรงทุกเงื่อนไขที่เลือก
              </span>
            </div>
          </div>
        </header>

        {/* Grid ไอเท็ม */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <ItemCard key={item.code} item={item} />
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full py-10 text-center text-sm text-pink-100/70">
              ไม่พบไอเท็มที่ตรงกับเงื่อนไขตอนนี้ ลองลดฟิลเตอร์หรือล้างค่าทั้งหมดดูนะ 🍬
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
