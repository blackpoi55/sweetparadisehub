"use client";

import { PLACES } from "@/json/map";
import { useEffect, useRef, useState } from "react";

const MAP_IMAGE = "/images/map.png"; // 👈 เปลี่ยนเป็น path รูปแผนที่จริง
 

function safeText(v) {
  const s = (v ?? "").toString().trim();
  return s === "" ? "-" : s;
}

function matchSearch(place, term) {
  const q = (term || "").trim().toLowerCase();
  if (!q) return true;
  return (
    place.name.toLowerCase().includes(q) ||
    (place.description || "").toLowerCase().includes(q) ||
    place.id.toLowerCase().includes(q)
  );
}

export default function MapPage() {
  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState("");

  const listRef = useRef(null);
  const activeItemRef = useRef(null);

  const handleEnter = (id) => setActiveId(id);
  const handleLeave = () => setActiveId(null);

  const filteredPlaces = PLACES.filter((p) => matchSearch(p, search));
  const activePlace = PLACES.find((p) => p.id === activeId) || null;

  // ถ้าพิมพ์ search แล้ว active ตัวเดิมไม่อยู่ในผลลัพธ์ ให้เคลียร์
  useEffect(() => {
    if (activeId && !filteredPlaces.some((p) => p.id === activeId)) {
      setActiveId(null);
    }
  }, [search, activeId, filteredPlaces]);

  // auto-scroll ให้ item ที่ active โผล่ใน list
  useEffect(() => {
    if (activeItemRef.current && listRef.current) {
      activeItemRef.current.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeId]);

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
      {/* BG effect เล็กน้อย */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-slate-950 via-black to-slate-950" />
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-72 w-72 rounded-full bg-pink-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

      {/* Header */}
      <header className="mb-6 text-center md:mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/60 bg-black/80 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
          Sweet Paradise • Map
        </span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
          แผนที่ <span className="text-pink-300">Sweet Paradise</span>
        </h1>
        <p className="mt-3 text-sm text-pink-100/85 md:text-base">
          ชี้หรือแตะที่ชื่อสถานที่ หรือจิ้มที่จุดบนแผนที่
          ระบบจะไฮไลต์ตำแหน่งด้วยกรอบแดง และโชว์รายละเอียดให้ทันที
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        {/* ------------ ฝั่งแผนที่ ------------ */}
        <div className="relative overflow-hidden rounded-3xl border border-pink-500/40 bg-slate-950/80 shadow-[0_0_45px_rgba(236,72,153,0.45)]">
          <div className="relative w-full">
            <img
              src={MAP_IMAGE}
              alt="Sweet Paradise Map"
              className="block h-auto w-full select-none"
            />

            {/* Marker แต่ละจุด */}
            {PLACES.map((place) => {
              const isActive = place.id === activeId;
              const isMatch = matchSearch(place, search);
              const dimmed = search.trim() !== "" && !isMatch;

              return (
                <button
                  key={place.id}
                  type="button"
                  className={`group absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-black/70 p-1 transition
                    ${
                      isActive
                        ? "border-red-500 ring-4 ring-red-400/70"
                        : "border-pink-200/70 hover:border-pink-400 hover:ring-2 hover:ring-pink-300/60"
                    }
                    ${dimmed ? "opacity-25 grayscale" : "opacity-100"}
                  `}
                  style={{
                    left: `${place.x}%`,
                    top: `${place.y}%`,
                  }}
                  aria-label={place.name}
                  onMouseEnter={() => handleEnter(place.id)}
                  onMouseLeave={handleLeave}
                  onFocus={() => handleEnter(place.id)}
                  onBlur={handleLeave}
                  onClick={() => handleEnter(place.id)}
                >
                  {/* วงกลม ping effect ตอน active */}
                  {isActive && (
                    <span className="pointer-events-none absolute inset-0 -z-10 -m-1 animate-ping rounded-full bg-red-400/60" />
                  )}
                  <span
                    className={`block h-3 w-3 rounded-full transition
                      ${
                        isActive
                          ? "bg-red-400"
                          : "bg-pink-300 group-hover:bg-pink-200"
                      }
                    `}
                  />
                </button>
              );
            })}
          </div>

          {/* แถบข้อมูลสถานที่ที่เลือกอยู่ตอนนี้ */}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-center">
            <div className="pointer-events-auto inline-flex max-w-full items-center gap-3 rounded-2xl border border-pink-400/60 bg-black/80 px-3 py-2 text-xs text-pink-50 shadow-[0_0_25px_rgba(236,72,153,0.5)] md:text-sm">
              {activePlace ? (
                <>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500/70 text-[11px] font-semibold text-black">
                    !!
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-semibold">
                      {safeText(activePlace.name)}
                    </div>
                    <div className="truncate text-[11px] text-pink-200/85">
                      {safeText(activePlace.description)}
                    </div>
                  </div>
                </>
              ) : (
                <span className="text-[11px] text-pink-200/80">
                  เลือกสถานที่จากด้านขวา หรือจิ้มที่จุดบนแผนที่เพื่อดูรายละเอียด 🔍
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ------------ ฝั่งรายการสถานที่ + Search ------------ */}
        <div className="flex flex-col rounded-3xl border border-pink-500/30 bg-black/85 p-4 md:p-5">
          <h2 className="mb-2 text-sm font-semibold text-pink-50 md:text-base">
            รายการสถานที่บนแผนที่
          </h2>

          {/* Search box */}
          <div className="mb-2 flex gap-2">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-pink-300">
                🔍
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ค้นหาจากชื่อสถานที่ / คำอธิบาย / ID..."
                className="w-full rounded-2xl border border-pink-500/40 bg-black/70 px-8 py-1.5 text-xs text-pink-50 placeholder:text-pink-200/50 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400 md:text-sm"
              />
            </div>
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  handleLeave();
                }}
                className="rounded-2xl border border-pink-500/60 bg-black/70 px-3 text-[11px] font-medium text-pink-100 hover:bg-pink-500/20"
              >
                ล้าง
              </button>
            )}
          </div>

          <p className="mb-3 text-[11px] text-pink-200/80 md:text-xs">
            แสดง{" "}
            <span className="font-semibold text-pink-100">
              {filteredPlaces.length}
            </span>{" "}
            จากทั้งหมด{" "}
            <span className="font-semibold text-pink-100">
              {PLACES.length}
            </span>{" "}
            จุดบนแผนที่
          </p>

          <ul
            ref={listRef}
            className="max-h-[420px] space-y-2.5 overflow-y-auto pr-1"
          >
            {filteredPlaces.length === 0 && (
              <li className="rounded-2xl border border-pink-500/25 bg-black/70 px-3 py-3 text-center text-[12px] text-pink-200/80">
                ไม่พบสถานที่ที่ตรงกับคำค้น ลองพิมพ์คำอื่นดูน้า 💫
              </li>
            )}

            {filteredPlaces.map((place, index) => {
              const isActive = place.id === activeId;

              return (
                <li
                  key={place.id}
                  ref={isActive ? activeItemRef : null}
                >
                  <button
                    type="button"
                    onMouseEnter={() => handleEnter(place.id)}
                    onMouseLeave={handleLeave}
                    onFocus={() => handleEnter(place.id)}
                    onBlur={handleLeave}
                    onClick={() => handleEnter(place.id)}
                    className={`w-full rounded-2xl border px-3 py-2 text-left text-xs md:text-sm transition
                      ${
                        isActive
                          ? "border-red-400 bg-gradient-to-r from-red-500/30 via-pink-500/30 to-fuchsia-500/20 text-pink-50 shadow-[0_0_20px_rgba(248,113,113,0.6)]"
                          : "border-pink-500/25 bg-black/70 text-pink-100 hover:border-pink-400 hover:bg-pink-500/10"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500/40 text-[11px] font-semibold text-black">
                          #{index + 1}
                        </span>
                        <span className="font-medium">
                          {safeText(place.name)}
                        </span>
                      </div>
                      <span className="hidden text-[10px] text-pink-200/70 sm:inline">
                        ID: {place.id}
                      </span>
                    </div>
                    {place.description && (
                      <p className="mt-1 text-[11px] text-pink-200/80">
                        {place.description}
                      </p>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
