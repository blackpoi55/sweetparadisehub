"use client";

import { useMemo, useState } from "react";

function fmt(n) {
  return Number(n || 0).toLocaleString("en-US");
}

function Avatar({ url, label, size = "h-8 w-8" }) {
  return (
    <div className={"flex-shrink-0 overflow-hidden rounded-full border border-pink-400/40 bg-black/60 " + size}>
      {url ? (
        <img src={url} alt={label || ""} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm">🧑</div>
      )}
    </div>
  );
}

function FamilyCard({ f, userMap, open, onToggle }) {
  const pctFull = f.cap > 0 ? Math.min(100, Math.round((f.memberCount / f.cap) * 100)) : 0;
  const hasMembers = Array.isArray(f.members) && f.members.length > 0;
  return (
    <article className="flex flex-col rounded-2xl border border-pink-500/30 bg-black/80 p-4 text-xs text-pink-50 md:text-sm">
      <button onClick={onToggle} className="flex flex-col text-left" disabled={!hasMembers}>
        <div className="flex items-center gap-2">
          {f.tag && (
            <span className="rounded-lg border border-pink-300/60 bg-pink-500/20 px-2 py-0.5 text-[11px] font-bold tracking-wider text-pink-100">
              [{f.tag}]
            </span>
          )}
          <h3 className="min-w-0 flex-1 truncate text-sm font-semibold text-pink-50">{f.name}</h3>
          {hasMembers && (
            <span className={"text-[11px] text-pink-300/70 transition " + (open ? "rotate-180" : "")}>▾</span>
          )}
        </div>
        <p className="mt-1 text-[11px] text-pink-200/75">👑 หัวหน้า: {f.head || "-"}</p>
        <div className="mt-2 flex items-center gap-3">
          <span className="text-[11px] text-pink-200/80">💗 สนิท {fmt(f.bond)}</span>
          <span className="ml-auto text-[11px] font-semibold text-pink-100">
            👥 {f.memberCount}/{f.cap || "?"}
          </span>
        </div>
        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-pink-500/10">
          <div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-400" style={{ width: `${pctFull}%` }} />
        </div>
      </button>

      {open && hasMembers && (
        <div className="mt-3 space-y-1.5 border-t border-pink-500/15 pt-3">
          {f.members.map((m) => (
            <div key={m.uid} className="flex items-center gap-2 rounded-lg bg-pink-500/5 px-2 py-1.5">
              <Avatar url={userMap[String(m.uid)]?.avatarUrl} label={m.name} />
              <span className="min-w-0 flex-1 truncate">
                {m.name}
                {m.isHead && <span className="ml-1 text-[10px] text-amber-300">👑 หัวหน้า</span>}
              </span>
              <span className="flex-shrink-0 text-[10px] text-pink-300/70">💗 {fmt(m.bond)}</span>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export default function FamilyBrowserClient({ families, couples, userMap, live }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("bond");
  const [openFid, setOpenFid] = useState(null);

  const list = useMemo(() => {
    const q = search.trim().toLowerCase();
    let arr = families.filter((f) => (!q ? true : `${f.tag} ${f.name} ${f.head}`.toLowerCase().includes(q)));
    arr = [...arr].sort((a, b) =>
      sort === "name" ? a.name.localeCompare(b.name, "th-TH") : sort === "members" ? b.memberCount - a.memberCount : b.bond - a.bond
    );
    return arr;
  }, [families, search, sort]);

  const totalMembers = families.reduce((s, f) => s + f.memberCount, 0);
  const sortLabel = { bond: "สนิทมากสุด", members: "สมาชิกมากสุด", name: "ชื่อ ก-ฮ" };
  const nextSort = { bond: "members", members: "name", name: "bond" };

  return (
    <div className="space-y-8">
      {!live && (
        <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-center text-[12px] text-amber-200/90">
          ⚠️ ยังดึงข้อมูลสดจากเกมไม่ได้ — ต้องเปิดสิทธิ์อ่าน DataStore
          <span className="font-mono"> FamilyRegistry_v1 / Family_v1 / Couple_v1 </span>ให้ API key
        </div>
      )}

      {/* families */}
      <section>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              👨‍👩‍👧 ครอบครัวทั้งหมด <span className="text-pink-300">({fmt(families.length)})</span>
            </h2>
            <p className="text-[11px] text-pink-200/70">รวมสมาชิก {fmt(totalMembers)} คน • คลิกการ์ดเพื่อดูสมาชิกข้างใน</p>
          </div>
          <div className="flex gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหาชื่อ/แท็ก/หัวหน้า..."
              className="w-full rounded-xl border border-pink-500/40 bg-black/60 px-3 py-2 text-xs text-pink-50 placeholder-pink-200/40 outline-none focus:border-pink-300 md:w-52 md:text-sm"
            />
            <button
              onClick={() => setSort(nextSort[sort])}
              className="whitespace-nowrap rounded-xl border border-pink-500/40 bg-black/60 px-3 py-2 text-xs text-pink-100 hover:bg-pink-500/10 md:text-sm"
            >
              เรียง: {sortLabel[sort]}
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
              <FamilyCard
                key={f.fid}
                f={f}
                userMap={userMap}
                open={openFid === f.fid}
                onToggle={() => setOpenFid(openFid === f.fid ? null : f.fid)}
              />
            ))}
          </div>
        )}
      </section>

      {/* couples */}
      <section>
        <h2 className="mb-1 text-lg font-semibold text-white">💕 อันดับคู่รัก (แต้มสนิท)</h2>
        <p className="mb-4 text-[11px] text-pink-200/70">{fmt(couples.length)} คู่ • เรียงตามแต้มสนิทปัจจุบัน</p>
        {couples.length === 0 ? (
          <p className="rounded-2xl border border-pink-500/20 bg-black/50 py-12 text-center text-sm text-pink-200/70">
            ยังไม่มีคู่รัก (หรือยังอ่านข้อมูลไม่ได้)
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {couples.slice(0, 30).map((c, i) => (
              <div key={c.cid} className="flex items-center gap-3 rounded-2xl border border-pink-500/25 bg-black/70 p-3">
                <span
                  className={
                    "w-7 flex-shrink-0 text-center text-sm font-bold " +
                    (i === 0 ? "text-amber-300" : i === 1 ? "text-slate-200" : i === 2 ? "text-orange-300" : "text-pink-300/60")
                  }
                >
                  {i + 1}
                </span>
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <Avatar url={userMap[String(c.lo)]?.avatarUrl} label={userMap[String(c.lo)]?.name || c.a} />
                  <span className="min-w-0 truncate text-xs text-pink-50 md:text-sm">{userMap[String(c.lo)]?.name || c.a}</span>
                  <span className="flex-shrink-0 text-pink-300">💍</span>
                  <span className="min-w-0 truncate text-xs text-pink-50 md:text-sm">{userMap[String(c.hi)]?.name || c.b}</span>
                  <Avatar url={userMap[String(c.hi)]?.avatarUrl} label={userMap[String(c.hi)]?.name || c.b} />
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
