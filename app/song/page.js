"use client";

import React, { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { djsongall, eventsongall, foreignsongall, keliasong, muansongall, songall } from "@/json/song";

export default function SongPage() {
  const [search, setSearch] = useState("");

  const categories = useMemo(
    () => [
      {
        id: "main",
        label: "เพลงหลักในแมพ",
        color: "from-pink-500/70 to-fuchsia-500/70",
        items: songall,
      },
      {
        id: "dj",
        label: "เพลง DJ / แดนซ์",
        color: "from-emerald-500/70 to-cyan-500/70",
        items: djsongall,
      },
      {
        id: "muan",
        label: "เพลงม่วนมันส์ ๆ",
        color: "from-orange-400/70 to-pink-500/70",
        items: muansongall,
      },
      {
        id: "event",
        label: "เพลงอีเวนต์ / เทศกาล",
        color: "from-indigo-400/70 to-sky-500/70",
        items: eventsongall,
      },
      {
        id: "foreign",
        label: "เพลงต่างชาติ",
        color: "from-pink-400/70 to-red-500/70",
        items: foreignsongall,
      },
      {
        id: "kelia",
        label: "Kelia Song (Indonesia Song)",
        color: "from-blue-400/70 to-green-500/70",
        items: keliasong,
      },
    ],
    []
  );

  const { filteredByCategory, totalCount } = useMemo(() => {
    const q = search.trim().toLowerCase();

    const result = {};
    let count = 0;

    for (const cat of categories) {
      const list = cat.items.filter((song) => {
        if (!q) return true;
        const name = (song.name || "").toLowerCase();
        const id = String(song.songid || "");
        return name.includes(q) || id.includes(q);
      });
      result[cat.id] = list;
      count += list.length;
    }

    return { filteredByCategory: result, totalCount: count };
  }, [categories, search]);

  const showCopiedAlert = (song) => {
    const title = "คัดลอกไอดีเพลงแล้ว";
    const songName = song.name || "ไม่ทราบชื่อเพลง";
    const songId = String(song.songid || "");

    Swal.fire({
      title,
      html: `
        <div style="font-size: 13px; line-height: 1.6;">
          <div style="opacity: 0.9;">เพลง:</div>
          <div style="font-weight: 600; color: #f9a8d4;">${songName}</div>
          <div style="margin-top: 4px; opacity: 0.9;">songid:</div>
          <div style="font-family: monospace; font-size: 12px; color: #fbbf24;">${songId}</div>
        </div>
      `,
      icon: "success",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: "top-end",
      toast: true,
      background: "#020617",
      color: "#f9fafb",
      customClass: {
        popup: "swal2-sweetparadise-popup",
        title: "swal2-sweetparadise-title",
      },
    });
  };

  const handleCopy = (song) => {
    const text = String(song.songid || "");
    if (!text) return;

    const doCopy = () => showCopiedAlert(song);

    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(doCopy)
        .catch(() => {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
          doCopy();
        });
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      doCopy();
    }
  };

  const resetSearch = () => {
    setSearch("");
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
              Sweet Paradise • Music
            </span>
          </div>

          <div className="mt-4 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              เพลงทั้งหมดใน{" "}
              <span className="text-pink-300">Sweet Paradise</span>
            </h1>
            <p className="mt-3 text-sm text-pink-100/85 md:text-base">
              แยกตามหมวดหมู่ ค้นหาได้สะดวก
              และคลิกเพลงเพื่อ{" "}
              <span className="font-semibold text-pink-300">
                คัดลอก songid
              </span>{" "}
              ไปใช้ใน Boombox
            </p>
          </div>

          {/* Search + status */}
          <div className="mt-5 rounded-2xl border border-pink-500/30 bg-black/70 p-4 text-xs text-pink-50 shadow-sm md:text-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <label className="mb-1 block text-[11px] font-medium text-pink-200/80">
                  ค้นหาเพลง
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="พิมพ์ชื่อเพลง / ศิลปิน / หรือเลข songid..."
                    className="w-full rounded-xl border border-pink-500/40 bg-black/60 px-3 py-2 text-xs text-pink-50 placeholder-pink-200/40 outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-400/70 md:text-sm"
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={resetSearch}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-2 text-[11px] text-pink-200/80 hover:bg-pink-500/10"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-1 flex flex-col items-start gap-1 md:mt-0 md:items-end">
                <span className="text-[11px] text-pink-200/80">
                  พบเพลง{" "}
                  <span className="font-semibold text-pink-100">
                    {totalCount}
                  </span>{" "}
                  รายการ
                </span>
                <span className="text-[11px] text-pink-200/60">
                  คลิกที่แถวเพลงเพื่อคัดลอก{" "}
                  <span className="font-semibold text-pink-100">songid</span>{" "}
                  และจะมี popup แจ้ง 3 วินาที
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* รายการเพลงแยกหมวด */}
        <div className="space-y-6 md:space-y-8">
          {categories.map((cat) => {
            const list = filteredByCategory[cat.id] || [];
            if (list.length === 0) return null;

            return (
              <section key={cat.id}>
                {/* หัวหมวด */}
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-8 w-8 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-sm font-semibold text-black`}
                    >
                      {cat.label.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-pink-50 md:text-base">
                        {cat.label}
                      </h2>
                      <p className="text-[11px] text-pink-200/70">
                        ทั้งหมด {list.length} เพลง
                      </p>
                    </div>
                  </div>
                </div>

                {/* ตารางเพลง */}
                <div className="overflow-hidden rounded-2xl border border-pink-500/25 bg-black/70">
                  <div className="grid grid-cols-[1fr_auto] border-b border-pink-500/20 bg-pink-500/10 px-3 py-2 text-[11px] font-medium text-pink-100 md:px-4 md:text-xs">
                    <span>ชื่อเพลง</span>
                    <span className="text-right">songid</span>
                  </div>

                  <div className="divide-y divide-pink-500/15">
                    {list.map((song) => (
                      <button
                        key={`${cat.id}-${song.songid}-${song.name}`}
                        type="button"
                        onClick={() => handleCopy(song)}
                        className="grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-2 px-3 py-2 text-left text-[11px] text-pink-50 transition hover:bg-pink-500/10 md:px-4 md:text-xs"
                      >
                        <div className="flex flex-col">
                          <span className="truncate font-medium">
                            {song.name}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-pink-200 md:text-[11px]">
                          {song.songid}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}

          {totalCount === 0 && (
            <div className="py-10 text-center text-sm text-pink-100/70">
              ไม่พบเพลงที่ตรงกับคำค้นตอนนี้ ลองเปลี่ยนคำ หรือกดล้างช่องค้นหาดูนะ 🎵
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
