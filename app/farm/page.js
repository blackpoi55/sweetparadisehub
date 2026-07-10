"use client";

import { farms, farmMinigame, farmMeta, farmResources } from "@/json/farm";
import { resolveAsset, fmtNum, pct } from "@/lib/gameAssets";
import AssetIcon from "@/components/AssetIcon";

function mmss(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return s === 0 ? `${m} นาที` : `${m} นาที ${s} วิ`;
}

function RewardRow({ r }) {
  const a = resolveAsset(r.item);
  const qty = r.max && r.max !== r.min ? `${r.min}–${r.max}` : `${r.min}`;
  return (
    <div className="flex items-center gap-3 rounded-xl border border-pink-500/15 bg-black/50 p-2.5">
      <AssetIcon img={a.img} emoji={a.emoji} alt={a.label} className="h-11 w-11 rounded-xl" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-pink-50 md:text-sm">
          {a.label} <span className="text-pink-300/70">×{qty}</span>
        </p>
      </div>
      <span className="rounded-full bg-pink-500/15 px-2.5 py-1 text-xs font-bold text-pink-100">
        {pct(r.chance)}
      </span>
    </div>
  );
}

export default function FarmPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-pink-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-6 text-center md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            🌾 Farming
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">ฟาร์ม</h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-200/80 md:text-sm">
            เล่นมินิเกมเก็บเกี่ยวผลผลิต แล้วเอาไปคราฟ/เปิดกาชา/สร้างครอบครัว — หัวใจของเศรษฐกิจในเกม
          </p>
        </header>

        {/* farm cards */}
        {farms.map((f) => (
          <section
            key={f.key}
            className="mb-6 rounded-2xl border border-pink-500/30 bg-black/70 p-4 md:p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/30 to-pink-500/20 text-3xl">
                {f.emoji}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{f.displayName}</h2>
                <p className="text-xs text-pink-200/75">
                  กด “{f.action}” เล่นมินิเกม {farmMinigame.type === "Whack" ? "ตีตุ่น" : farmMinigame.type}
                </p>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-pink-500/25 bg-black/60 px-3 py-2.5 text-center">
                <p className="text-sm font-bold text-pink-100">{farmMinigame.quota}/{farmMinigame.spawnTotal}</p>
                <p className="text-[11px] text-pink-300/70">ตีให้ครบใน {farmMinigame.duration} วิ</p>
              </div>
              <div className="rounded-xl border border-pink-500/25 bg-black/60 px-3 py-2.5 text-center">
                <p className="text-sm font-bold text-emerald-200">{mmss(f.successCooldown)}</p>
                <p className="text-[11px] text-pink-300/70">คูลดาวน์เมื่อสำเร็จ</p>
              </div>
              <div className="rounded-xl border border-pink-500/25 bg-black/60 px-3 py-2.5 text-center">
                <p className="text-sm font-bold text-amber-200">{mmss(f.failCooldown)}</p>
                <p className="text-[11px] text-pink-300/70">คูลดาวน์เมื่อพลาด</p>
              </div>
              <div className="rounded-xl border border-pink-500/25 bg-black/60 px-3 py-2.5 text-center">
                <p className="text-sm font-bold text-pink-100">{farmMeta.maxDistance} ช่อง</p>
                <p className="text-[11px] text-pink-300/70">ระยะใช้งาน</p>
              </div>
            </div>

            <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-pink-300/70">
              ผลผลิตที่ได้ (โอกาสต่อครั้งที่สำเร็จ)
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {f.rewards.map((r, i) => (
                <RewardRow key={i} r={r} />
              ))}
            </div>
          </section>
        ))}

        {/* resources */}
        <section className="rounded-2xl border border-pink-500/30 bg-black/70 p-4 md:p-6">
          <h2 className="mb-1 text-base font-semibold text-white">🧺 ผลผลิต &amp; ทรัพยากรจากฟาร์ม</h2>
          <p className="mb-4 text-xs text-pink-200/75">ของที่ได้จากฟาร์ม/อีเวนต์ ใช้เป็นวัตถุดิบต่อยอดในระบบอื่น</p>
          <div className="space-y-4">
            {Object.entries(farmResources).map(([group, codes]) => (
              <div key={group}>
                <p className="mb-2 text-xs font-medium text-pink-300/80">{group}</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  {codes.map((code) => {
                    const a = resolveAsset(code);
                    return (
                      <div
                        key={code}
                        className="flex items-center gap-2 rounded-xl border border-pink-500/15 bg-black/50 p-2"
                      >
                        <AssetIcon img={a.img} emoji={a.emoji} alt={a.label} className="h-9 w-9 rounded-lg" />
                        <span className="min-w-0 truncate text-[11px] text-pink-50 md:text-xs">{a.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-5 text-center text-[11px] text-pink-300/60">
          🔗 ผลผลิต → โต๊ะคราฟ → กล่องกาชา → สัตว์เลี้ยง/ไอเทม — วนเป็นลูปเศรษฐกิจของเกม
        </p>
      </div>
    </div>
  );
}
