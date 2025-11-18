// app/marketitems/ItemCardClient.js
"use client";

import { useState } from "react";

function safeText(v) {
  const s = (v ?? "").toString().trim();
  return s === "" ? "-" : s;
}

export default function ItemCardClient({ item, userMap }) {
  const [open, setOpen] = useState(false);

  const {
    code,
    nameTH,
    icon,
    detail,
    grouptype,
    getby,
    totalOwners,
    owners,
    isDoll,
  } = item;

  const toggle = () => {
    if (isDoll) return; // ตุ๊กตาไม่ต้องยืด/หด
    setOpen((prev) => !prev);
  };

  const ownersList = owners || [];
  const hasOwners = ownersList.length > 0;

  return (
    <article className="relative flex flex-col rounded-2xl border border-pink-500/35 bg-gradient-to-br from-black via-slate-950 to-black p-3 text-xs text-pink-50 shadow-sm shadow-pink-500/30 md:p-4 md:text-sm">
      {/* Icon + basic info */}
      <div className="flex gap-3">
        {/* รูปไอเท็ม */}
        <div className="flex-shrink-0">
          <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-pink-300/70 bg-black/80 shadow-md shadow-pink-500/60 md:h-16 md:w-16">
            {icon ? (
              <img
                src={icon}
                alt={nameTH}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg">
                🎁
              </div>
            )}
          </div>
        </div>

        {/* ข้อมูลหลัก */}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-1">
            <h3 className="truncate text-sm font-semibold text-pink-50 md:text-base">
              {safeText(nameTH)}
            </h3>
            <span className="rounded-full bg-pink-500/20 px-2 py-0.5 text-[10px] font-semibold text-pink-100">
              {code}
            </span>
          </div>
          <p className="line-clamp-2 text-[11px] text-pink-200/85 md:text-xs">
            {safeText(detail)}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-pink-200/80 md:text-xs">
            <span className="rounded-full bg-black/60 px-2 py-0.5">
              หมวด: {safeText(grouptype)}
            </span>
            <span className="rounded-full bg-black/60 px-2 py-0.5">
              วิธีได้: {safeText(getby)}
            </span>
          </div>
        </div>

        {/* จำนวนคนถือของ + ปุ่มเปิด/ปิด */}
        <div className="flex flex-col items-end justify-between gap-2">
          <div className="rounded-2xl bg-pink-500/20 px-2 py-1 text-[10px] font-semibold text-pink-50 md:text-[11px]">
            ผู้ถือของ{" "}
            <span className="text-pink-100">
              {totalOwners.toLocaleString("th-TH")}
            </span>{" "}
            คน
          </div>

          {!isDoll && (
            <button
              type="button"
              onClick={toggle}
              className="rounded-full border border-pink-400/70 bg-black/60 px-2 py-0.5 text-[10px] text-pink-100 hover:bg-pink-500/20 md:text-[11px]"
            >
              {open ? "ซ่อนรายชื่อ" : "ดูรายชื่อ"}
            </button>
          )}
        </div>
      </div>

      {/* ถ้าเป็นหมวดตุ๊กตา → จบแค่นี้ ไม่ต้องมีรายชื่อข้างล่าง */}
      {isDoll ? (
        <div className="mt-2 rounded-xl bg-black/70 px-3 py-2 text-[11px] text-pink-200/85 md:text-xs">
          หมวดตุ๊กตา: คนถือเยอะมาก เลยสรุปเฉพาะจำนวนผู้ถือรวมเท่านั้น 🧸
        </div>
      ) : (
        <>
          {open && (
            <div className="mt-3 rounded-xl bg-black/80 px-3 py-2 text-[11px] text-pink-100/90 md:text-xs">
              {hasOwners ? (
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {ownersList.map((uid) => {
                    const u = userMap?.[uid];
                    const displayName =
                      u?.displayName && u.displayName !== u.name
                        ? u.displayName
                        : null;
                    const profileUrl = `https://www.roblox.com/users/${uid}/profile`;

                    return (
                      <a
                        key={uid}
                        href={profileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-lg border border-pink-500/30 bg-black/60 px-2 py-1.5 hover:border-pink-400/80 hover:bg-pink-500/10"
                      >
                        {/* Avatar */}
                        <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border border-pink-300/70 bg-black/70">
                          {u?.avatarUrl ? (
                            <img
                              src={u.avatarUrl}
                              alt={u?.name || uid}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[11px] text-pink-100">
                              {String(u?.name || uid)[0] || "?"}
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1">
                            <span className="truncate font-medium text-pink-50">
                              {safeText(displayName || u?.name || uid)}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-1 text-[10px] text-pink-200/85">
                            <span>UID: {uid}</span>
                          </div>
                        </div>

                        <span className="text-[10px] text-pink-200/80">
                          เปิดโปรไฟล์ ↗
                        </span>
                      </a>
                    );
                  })}
                </div>
              ) : (
                <div className="text-[11px] text-pink-200/80">
                  ยังไม่มีข้อมูลผู้ถือของ หรือจำนวนผู้ถือเป็น 0
                </div>
              )}
            </div>
          )}
        </>
      )}
    </article>
  );
}
