"use client";

import { useMemo, useState } from "react";

function fmt(n) {
  return Number(n || 0).toLocaleString("en-US");
}

function FamilyCard({ f }) {
  const pctFull = f.cap > 0 ? Math.min(100, Math.round((f.members / f.cap) * 100)) : 0;
  return (
    <article className="flex flex-col rounded-2xl border border-pink-500/30 bg-black/80 p-4 text-xs text-pink-50 shadow-sm transition hover:-translate-y-0.5 hover:border-pink-400/70 md:text-sm">
      <div className="flex items-center gap-2">
        {f.tag && (
          <span className="rounded-lg border border-pink-300/60 bg-pink-500/20 px-2 py-0.5 text-[11px] font-bold tracking-wider text-pink-100">
            [{f.tag}]
          </span>
        )}
        <h3 className="min-w-0 flex-1 truncate text-sm font-semibold text-pink-50">{f.name}</h3>
      </div>
      <p className="mt-1 text-[11px] text-pink-200/75">👑 หัวหน้า: {f.head || "-"}</p>
      <div className="mt-2">
        <div className="mb-1 flex items-center justify-between text-[11px] text-pink-200/80">
          <span>สมาชิก</span>
          <span className="font-semibold text-pink-100">
            {f.members}/{f.cap || "?"}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-pink-500/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-400"
            style={{ width: `${pctFull}%` }}
          />
        </div>
      </div>
    </article>
  );
}

function Avatar({ user, uid }) {
  const url = user?.avatarUrl;
  const label = user?.displayName || user?.name || uid;
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border border-pink-400/40 bg-black/60">
        {url ? (
          <img src={url} alt={label} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm">🧑</div>
        )}
      </div>
      <span className="min-w-0 truncate text-xs text-pink-50 md:text-sm">{label}</span>
    </div>
  );
}

export default function FamilyBrowserClient({ families, couples, userMap, live }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("members");

  const list = useMemo(() => {
    const q = search.trim().toLowerCase();
    let arr = families.filter((f) =>
      !q ? true : `${f.tag} ${f.name} ${f.head}`.toLowerCase().includes(q)
    );
    arr = [...arr].sort((a, b) =>
      sort === "name" ? a.name.localeCompare(b.name, "th-TH") : b.members - a.members
    );
    return arr;
  }, [families, search, sort]);

  const totalMembers = families.reduce((s, f) => s + f.members, 0);

  return (
    <div className="space-y-8">
      {/* live status */}
      {!live && (
        <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-center text-[12px] text-amber-200/90">
          ⚠️ ยังดึงข้อมูลสดจากเกมไม่ได้ — ต้องเปิดสิทธิ์อ่าน DataStore
          <span className="font-mono"> FamilyRegistry_v1 / CoupleRegistry_v1 </span>
          ให้กับ API key (Open Cloud) ก่อน
        </div>
      )}

      {/* families */}
      <section>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              👨‍👩‍👧 ครอบครัวทั้งหมด{" "}
              <span className="text-pink-300">({fmt(families.length)})</span>
            </h2>
            <p className="text-[11px] text-pink-200/70">รวมสมาชิก {fmt(totalMembers)} คน • ข้อมูลสดจากเกม</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ค้นหาชื่อ/แท็ก/หัวหน้า..."
                className="w-full rounded-xl border border-pink-500/40 bg-black/60 px-3 py-2 text-xs text-pink-50 placeholder-pink-200/40 outline-none focus:border-pink-300 md:w-56 md:text-sm"
              />
            </div>
            <button
              onClick={() => setSort(sort === "members" ? "name" : "members")}
              className="whitespace-nowrap rounded-xl border border-pink-500/40 bg-black/60 px-3 py-2 text-xs text-pink-100 hover:bg-pink-500/10 md:text-sm"
            >
              เรียง: {sort === "members" ? "สมาชิกมากสุด" : "ชื่อ ก-ฮ"}
            </button>
          </div>
        </div>

        {list.length === 0 ? (
          <p className="rounded-2xl border border-pink-500/20 bg-black/50 py-12 text-center text-sm text-pink-200/70">
            {families.length === 0 ? "ยังไม่มีครอบครัวในเกม (หรือยังอ่านข้อมูลไม่ได้)" : "ไม่พบครอบครัวที่ค้นหา"}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((f) => (
              <FamilyCard key={f.fid} f={f} />
            ))}
          </div>
        )}
      </section>

      {/* couples leaderboard */}
      <section>
        <h2 className="mb-1 text-lg font-semibold text-white">
          💕 อันดับคู่รัก (แต้มสนิท)
        </h2>
        <p className="mb-4 text-[11px] text-pink-200/70">
          {fmt(couples.length)} คู่ • เรียงตามแต้มสนิทสูงสุด
        </p>
        {couples.length === 0 ? (
          <p className="rounded-2xl border border-pink-500/20 bg-black/50 py-12 text-center text-sm text-pink-200/70">
            ยังไม่มีคู่รัก (หรือยังอ่านข้อมูลไม่ได้)
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {couples.slice(0, 30).map((c, i) => (
              <div
                key={c.cid}
                className="flex items-center gap-3 rounded-2xl border border-pink-500/25 bg-black/70 p-3"
              >
                <span
                  className={
                    "w-7 flex-shrink-0 text-center text-sm font-bold " +
                    (i === 0 ? "text-amber-300" : i === 1 ? "text-slate-200" : i === 2 ? "text-orange-300" : "text-pink-300/60")
                  }
                >
                  {i + 1}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                  <Avatar user={userMap[c.a]} uid={c.a} />
                  <span className="hidden text-pink-400 sm:inline">💞</span>
                  <Avatar user={userMap[c.b]} uid={c.b} />
                </div>
                <span className="flex-shrink-0 rounded-full bg-pink-500/15 px-3 py-1 text-xs font-bold text-pink-100">
                  💗 {fmt(c.bond)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
