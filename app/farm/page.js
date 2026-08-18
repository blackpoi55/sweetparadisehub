import { farms, farmResources, itemSources, gachaFarmDrops, activityRewards } from "@/json/farm";
import { resolveAsset, pct } from "@/lib/gameAssets";
import AssetIcon from "@/components/AssetIcon";

export const metadata = {
  title: "ฟาร์ม & หาของ — Sweet Paradise Hub",
  description:
    "คู่มือหาของในเกม — นาข้าว (ตีตุ่น) และงัดตู้ร้าน (งัดสลัก) ได้อะไรบ้าง โอกาสเท่าไหร่ พร้อมตารางว่าไอเทมฟาร์มแต่ละชิ้นหาได้จากกิจกรรมไหน",
};

function mmss(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return s === 0 ? `${m} นาที` : `${m} นาที ${s} วิ`;
}

function Section({ icon, title, sub, children }) {
  return (
    <section className="mt-9">
      <h2 className="flex items-center gap-2 text-lg font-bold text-white md:text-xl">
        <span>{icon}</span>
        {title}
      </h2>
      {sub && <p className="mt-1 text-xs text-pink-200/75 md:text-sm">{sub}</p>}
      <div className="mt-3">{children}</div>
    </section>
  );
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
        {r.note && <p className="truncate text-[10px] text-pink-300/60">{r.note}</p>}
      </div>
      <span
        className={
          "rounded-full px-2.5 py-1 text-xs font-bold " +
          (r.chance >= 1 ? "bg-emerald-500/20 text-emerald-100" : "bg-pink-500/15 text-pink-100")
        }
      >
        {r.chance >= 1 ? "แน่นอน" : pct(r.chance)}
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
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            🌾 Farming
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
            ฟาร์ม &amp; <span className="text-pink-300">หาของ</span>
          </h1>
          <p className="mx-auto mt-2 max-w-3xl text-xs text-pink-100/85 md:text-sm">
            เล่นมินิเกมเก็บของ แล้วเอาไปคราฟ / เปิดกาชา / เลี้ยงสัตว์ — หน้านี้บอกครบว่า
            <span className="text-pink-200"> ทำอะไรได้อะไร โอกาสเท่าไหร่</span>
          </p>
        </header>

        <Section icon="⛏️" title={`จุดหาของ ${farms.length} แบบ`} sub="แต่ละจุดมีมินิเกม คูลดาวน์ และของที่ได้ต่างกัน">
          <div className="space-y-4">
            {farms.map((f) => (
              <article
                key={f.key}
                className={
                  "overflow-hidden rounded-2xl border bg-black/70 " +
                  (f.risky ? "border-rose-400/35" : "border-emerald-400/30")
                }
              >
                <div className="flex items-start gap-3 p-4">
                  <div
                    className={
                      "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-3xl " +
                      (f.risky
                        ? "bg-gradient-to-br from-rose-500/30 to-amber-500/20"
                        : "bg-gradient-to-br from-emerald-500/30 to-pink-500/20")
                    }
                  >
                    {f.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-white">
                      {f.displayName}
                      {f.risky && (
                        <span className="ml-2 rounded-full bg-rose-500/20 px-2 py-0.5 align-middle text-[10px] font-semibold text-rose-200">
                          ⚠️ มีความเสี่ยง
                        </span>
                      )}
                    </h3>
                    <p className="mt-0.5 text-xs text-pink-100/85">{f.tagline}</p>
                    <p className="mt-1 text-[11px] text-pink-200/70">
                      กด “{f.action}” → มินิเกม<span className="text-pink-100">{f.minigame.label}</span> · {f.minigame.how}
                    </p>
                  </div>
                </div>

                {(f.requireItem || f.jail) && (
                  <div className="mx-4 mb-3 grid gap-2 sm:grid-cols-2">
                    {f.requireItem && (
                      <div className="rounded-xl border border-amber-400/30 bg-amber-500/[0.08] p-2.5">
                        <p className="text-[11px] font-bold text-amber-100">
                          🔧 ต้องมี {resolveAsset(f.requireItem.item).label} ถึงจะเริ่มได้
                        </p>
                        <p className="mt-0.5 text-[10px] text-amber-100/80">{f.requireItem.note}</p>
                      </div>
                    )}
                    {f.jail && (
                      <div className="rounded-xl border border-rose-400/30 bg-rose-500/[0.08] p-2.5">
                        <p className="text-[11px] font-bold text-rose-100">🚨 พลาด = สัญญาณดัง โดนจับ</p>
                        <p className="mt-0.5 text-[10px] text-rose-100/80">
                          ติดคุก {f.jail.minutes} นาที{f.noAuto ? " · สัตว์เลี้ยงออโต้ฟาร์มทำแทนไม่ได้" : ""}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="mx-4 mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(f.minigame.type === "Whack"
                    ? [
                        { v: `${f.minigame.quota}/${f.minigame.spawnTotal}`, k: `ตีให้ครบใน ${f.minigame.duration} วิ` },
                        { v: mmss(f.successCooldown), k: "คูลดาวน์เมื่อสำเร็จ", tone: "text-emerald-200" },
                        { v: mmss(f.failCooldown), k: "คูลดาวน์เมื่อพลาด", tone: "text-amber-200" },
                        { v: `${f.maxDistance} ช่อง`, k: "ระยะใช้งาน" },
                      ]
                    : [
                        { v: `${f.minigame.pins} สลัก`, k: `พลาดได้ ${f.minigame.lives} ครั้ง` },
                        { v: `${f.minigame.duration} วิ`, k: `กดค้าง ${f.minigame.hold} วิ/สลัก` },
                        { v: mmss(f.successCooldown), k: "คูลดาวน์เมื่อสำเร็จ", tone: "text-emerald-200" },
                        { v: mmss(f.failCooldown), k: "คูลดาวน์เมื่อพลาด", tone: "text-amber-200" },
                      ]
                  ).map((s) => (
                    <div key={s.k} className="rounded-xl border border-pink-500/20 bg-black/60 px-3 py-2.5 text-center">
                      <p className={"text-sm font-bold " + (s.tone || "text-pink-100")}>{s.v}</p>
                      <p className="text-[10px] text-pink-300/70">{s.k}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-pink-500/15 p-4">
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-pink-300/70">
                    ของที่ได้ (ต่อ 1 ครั้งที่สำเร็จ)
                  </p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {f.rewards.map((r, i) => (
                      <RewardRow key={i} r={r} />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section icon="📦" title="ของแต่ละชิ้น หาได้จากไหน" sub="อยากได้ของชิ้นไหน ดูตรงนี้ว่าต้องไปทำอะไร">
          <div className="space-y-3">
            {itemSources.map((s) => {
              const a = resolveAsset(s.item);
              return (
                <div key={s.item} className="rounded-2xl border border-pink-500/25 bg-black/60 p-3.5">
                  <div className="flex items-start gap-3">
                    <AssetIcon img={a.img} emoji={a.emoji} alt={a.label} className="h-12 w-12 flex-shrink-0 rounded-xl" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-pink-50">{a.label}</p>
                      <p className="text-[11px] text-pink-200/70">ใช้ทำอะไร: {s.uses}</p>
                    </div>
                  </div>
                  <div className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
                    {s.from.map((x, i) => (
                      <div
                        key={i}
                        className={
                          "rounded-lg border px-2.5 py-1.5 " +
                          (x.main ? "border-emerald-400/30 bg-emerald-500/[0.08]" : "border-pink-500/15 bg-black/45")
                        }
                      >
                        <p className={"text-[11px] font-medium " + (x.main ? "text-emerald-100" : "text-pink-100")}>
                          {x.how}
                          {x.main && <span className="ml-1 text-[9px] text-emerald-300/80">ทางหลัก</span>}
                        </p>
                        <p className="text-[10px] text-pink-200/65">{x.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section icon="🎉" title="กิจกรรมในเกม ได้อะไรบ้าง" sub="สรุปสั้น ๆ ว่าแต่ละกิจกรรมให้ของแบบไหน">
          <div className="overflow-x-auto rounded-2xl border border-pink-500/25">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-pink-500/10 text-[11px] uppercase tracking-wide text-pink-200/80">
                <tr>
                  <th className="px-3 py-2">กิจกรรม</th>
                  <th className="px-3 py-2">เล่นได้เมื่อไหร่</th>
                  <th className="px-3 py-2">ได้อะไร</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-500/10">
                {activityRewards.map((a) => (
                  <tr key={a.name} className="bg-black/40 align-top">
                    <td className="whitespace-nowrap px-3 py-2.5 font-semibold text-pink-50">
                      {a.icon} {a.name}
                    </td>
                    <td className="px-3 py-2.5 text-[11px] text-pink-200/80">{a.when}</td>
                    <td className="px-3 py-2.5 text-[11px] text-pink-100">
                      {a.gets}
                      {a.risk && <span className="mt-0.5 block text-[10px] text-rose-200">⚠️ {a.risk}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section icon="🎁" title="กล่องกาชาที่ให้ของฟาร์ม" sub="เปิดแล้วมีโอกาสได้วัตถุดิบไปคราฟต่อ">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {gachaFarmDrops.map((g) => (
              <div key={g.key} className="rounded-2xl border border-pink-500/25 bg-black/60 p-3.5">
                <p className="text-sm font-bold text-pink-50">🎁 {g.name}</p>
                <p className="mt-0.5 text-[11px] text-pink-200/70">ได้จาก: {g.source}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {g.items.map((it) => {
                    const a = resolveAsset(it);
                    return (
                      <span
                        key={it}
                        className="rounded-full border border-pink-500/20 bg-black/50 px-2 py-0.5 text-[11px] text-pink-50"
                      >
                        {a.emoji || "📦"} {a.label}
                      </span>
                    );
                  })}
                </div>
                {g.extra && <p className="mt-1.5 text-[10px] text-amber-200/85">{g.extra}</p>}
              </div>
            ))}
          </div>
        </Section>

        <Section icon="🧺" title="ไอเทมฟาร์มทั้งหมด" sub="ของพวกนี้เก็บสะสม เทรด และขายในตลาดฝากขายได้">
          <div className="space-y-4 rounded-2xl border border-pink-500/25 bg-black/60 p-4">
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
        </Section>

        <p className="mt-8 text-center text-[11px] text-pink-300/60">
          🔗 หาของ → โต๊ะคราฟ → กล่องกาชา → สัตว์เลี้ยง / ไอเทม / รถ — วนเป็นลูปเศรษฐกิจของเกม
        </p>
      </div>
    </div>
  );
}
