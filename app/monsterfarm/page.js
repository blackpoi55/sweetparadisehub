import {
  meta,
  howto,
  fistTable,
  fistTiers,
  monsters,
  dropGroups,
  expCards,
  upgradeTable,
  skill,
  perks,
  combo,
  claim,
  knockback,
  treadmill,
} from "@/json/monsterfarm";
import { resolveAsset, fmtNum } from "@/lib/gameAssets";
import AssetIcon from "@/components/AssetIcon";

export const metadata = {
  title: "มอนสเตอร์ฟาร์ม — Sweet Paradise Hub",
  description:
    "คู่มือระบบมอนสเตอร์ฟาร์ม (Monster Farm) — ต่อยมอนเก็บเงิน+EXP อัพหมัด ตีบวก สกิลพลังหมัด ลูกเล่น คอมโบ บอสสนาม บัตร EXP และลู่วิ่ง AFK",
};

// ป้ายระดับความหายาก (คำไทย → สี)
function RareChip({ word }) {
  const map = {
    บ่อย: "border-emerald-400/50 bg-emerald-500/15 text-emerald-200",
    พบบ่อย: "border-emerald-400/50 bg-emerald-500/15 text-emerald-200",
    ปานกลาง: "border-sky-400/50 bg-sky-500/15 text-sky-200",
    หายาก: "border-purple-400/50 bg-purple-500/15 text-purple-200",
    หายากมาก: "border-amber-300/60 bg-amber-500/15 text-amber-200",
    เฉพาะบอส: "border-rose-400/50 bg-rose-500/15 text-rose-200",
  };
  return (
    <span className={`whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-medium ${map[word] || "border-white/20 bg-white/10 text-gray-200"}`}>
      {word}
    </span>
  );
}

function Section({ id, icon, title, sub, children }) {
  return (
    <section id={id} className="mt-8">
      <h2 className="flex items-center gap-2 text-lg font-bold text-white md:text-xl">
        <span>{icon}</span>
        {title}
      </h2>
      {sub && <p className="mb-3 mt-1 text-xs text-pink-200/70 md:text-sm">{sub}</p>}
      <div className={sub ? "" : "mt-3"}>{children}</div>
    </section>
  );
}

export default function MonsterFarmPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-1/3 h-96 w-96 rounded-full bg-rose-500/20 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 bottom-0 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        {/* HERO */}
        <header className="mb-6 text-center md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-300">
            🥊 Monster Farm • ระบบใหม่
          </span>
          <h1 className="mt-4 bg-gradient-to-r from-orange-300 via-amber-200 to-rose-300 bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-4xl">
            มอนสเตอร์ฟาร์ม
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-100/80 md:text-sm">
            สนามต่อยมอน! ใช้กำปั้นต่อยมอนในสนาม เก็บเงินและ EXP แล้วเอาไป
            <b className="text-amber-200"> ตีบวกอัพหมัด</b> ให้แรงขึ้น มีไฟ ปลดล็อกสกิลและลูกเล่น
            พร้อมลุ้นของฟาร์มหายากจากมอนทองและบอสสนาม
          </p>

          {/* quick stats */}
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {[
              { v: `Lv.${meta.maxLevel}`, l: "เลเวลหมัดสูงสุด" },
              { v: "ได้ชัวร์", l: "เงิน + EXP ทุกการฆ่า" },
              { v: `${skill.emoji} สกิล`, l: "พลังหมัด AOE" },
              { v: `${meta.appIcon} แอป`, l: meta.appName },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-orange-500/25 bg-black/50 px-3 py-2.5 text-center">
                <p className="text-sm font-bold text-amber-100">{s.v}</p>
                <p className="text-[10px] text-pink-300/70">{s.l}</p>
              </div>
            ))}
          </div>
        </header>

        {/* HOW TO PLAY */}
        <Section id="howto" icon="🎮" title="วิธีเล่น">
          <ol className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
            {howto.map((s, i) => (
              <li key={i} className="relative rounded-2xl border border-orange-500/25 bg-black/50 p-3">
                <span className="absolute right-2 top-2 text-[10px] font-bold text-orange-400/50">{i + 1}</span>
                <div className="text-2xl">{s.icon}</div>
                <p className="mt-1.5 text-sm font-semibold text-amber-100">{s.title}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-pink-200/70">{s.desc}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* FIST DAMAGE / TIERS */}
        <Section
          id="fist"
          icon="👊"
          title="หมัด: ดาเมจ & ระดับไฟ"
          sub="ยิ่งอัพเลเวลหมัด ดาเมจยิ่งสูง ต่อยยิ่งเร็ว และเปลี่ยนสีไฟตามช่วงเลเวล"
        >
          {/* tier chips */}
          <div className="mb-4 flex flex-wrap gap-2">
            {fistTiers.map((t) => (
              <span
                key={t.min}
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium"
                style={{ borderColor: `${t.color}66`, background: `${t.color}1a`, color: t.color }}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.color, boxShadow: t.fire ? `0 0 6px ${t.color}` : "none" }} />
                Lv.{t.min}
                {t.max !== t.min ? `–${t.max}` : ""} · {t.name}
              </span>
            ))}
          </div>

          <div className="overflow-x-auto rounded-2xl border border-orange-500/25 bg-black/50">
            <table className="w-full min-w-[420px] border-collapse text-xs md:text-sm">
              <thead>
                <tr className="text-orange-200/80">
                  <th className="px-3 py-2.5 text-left font-medium">เลเวล</th>
                  <th className="px-3 py-2.5 text-right font-medium">ดาเมจ/ต่อย</th>
                  <th className="px-3 py-2.5 text-right font-medium">คูลดาวน์</th>
                  <th className="px-3 py-2.5 text-right font-medium">ต่อยมอนธรรมดา</th>
                  <th className="px-3 py-2.5 text-left font-medium">ระดับหมัด</th>
                </tr>
              </thead>
              <tbody>
                {fistTable.map((r) => (
                  <tr key={r.lv} className="border-t border-orange-500/10">
                    <td className="px-3 py-2.5 font-semibold text-pink-50">Lv.{r.lv}</td>
                    <td className="px-3 py-2.5 text-right font-bold text-amber-200">{r.dmg}</td>
                    <td className="px-3 py-2.5 text-right text-pink-100/80">{r.cooldown}s</td>
                    <td className="px-3 py-2.5 text-right text-pink-100/80">{r.hitsNormal} ที</td>
                    <td className="px-3 py-2.5">
                      <span className="inline-flex items-center gap-1.5" style={{ color: r.tier.color }}>
                        <span className="h-2 w-2 rounded-full" style={{ background: r.tier.color }} />
                        {r.tier.name}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11px] text-pink-300/60">* “ต่อยมอนธรรมดา” = จำนวนหมัดที่ต้องต่อยเพื่อล้มมอนธรรมดา (เลือด 300)</p>
        </Section>

        {/* MONSTERS */}
        <Section id="monsters" icon="👾" title="มอนสเตอร์ในสนาม" sub="ยิ่งมอนแกร่ง ยิ่งให้เงิน/EXP เยอะ และดรอปของดีขึ้น">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {monsters.map((m) => (
              <article
                key={m.key}
                className={
                  "overflow-hidden rounded-2xl border bg-black/60 " +
                  (m.highlight ? "border-amber-400/40" : "border-pink-500/25")
                }
              >
                <div className="flex items-center gap-3 p-3.5" style={{ background: `linear-gradient(135deg, ${m.color}33, transparent)` }}>
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-black/40 text-2xl">
                    {m.emoji}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">{m.name}</h3>
                    <p className="text-[11px] text-pink-200/70">{m.spawn}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 px-3.5 py-3 text-center">
                  <div className="rounded-lg bg-white/[0.04] py-1.5">
                    <p className="text-[10px] text-pink-300/60">❤️ เลือด</p>
                    <p className="text-sm font-bold text-rose-200">{fmtNum(m.hp)}</p>
                  </div>
                  <div className="rounded-lg bg-white/[0.04] py-1.5">
                    <p className="text-[10px] text-pink-300/60">💰 เงิน</p>
                    <p className="text-sm font-bold text-emerald-200">{fmtNum(m.money)}</p>
                  </div>
                  <div className="rounded-lg bg-white/[0.04] py-1.5">
                    <p className="text-[10px] text-pink-300/60">⭐ EXP</p>
                    <p className="text-sm font-bold text-amber-200">{fmtNum(m.exp)}</p>
                  </div>
                </div>
                <p className="px-3.5 pb-3.5 text-[11px] text-pink-100/75">🎁 {m.dropNote}</p>
              </article>
            ))}
          </div>
          <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[11px] text-pink-200/70">
            💡 เงินและ EXP <b className="text-emerald-200">ได้ชัวร์</b> ทุกครั้งที่ฆ่ามอน ส่วน “ของฟาร์ม” เป็นของแถมที่มีลุ้น (ยิ่งมอนแกร่งยิ่งลุ้นของดี)
          </p>
        </Section>

        {/* DROPS */}
        <Section
          id="drops"
          icon="🌾"
          title="ของที่ดรอป"
          sub="มอนเทียร์สูงปลดล็อกของที่ดีขึ้น — ของหายากต้องล้มมอนทอง/บอสเท่านั้น"
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {dropGroups.map((g) => (
              <div key={g.title} className="rounded-2xl border border-pink-500/25 bg-black/50 p-4">
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-amber-100">{g.title}</h3>
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-pink-300/70">จาก {g.from}</span>
                </div>
                <p className="mb-3 text-[11px] leading-relaxed text-pink-200/65">{g.desc}</p>
                <ul className="space-y-1.5">
                  {g.items.map((it) => {
                    const a = resolveAsset(it.code);
                    return (
                      <li key={it.code} className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-2 py-1.5">
                        <AssetIcon img={a.img} emoji={a.emoji} alt={a.label} className="h-6 w-6 rounded" />
                        <span className="min-w-0 flex-1 truncate text-xs text-pink-50">{a.label}</span>
                        <RareChip word={it.rarity} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* UPGRADE — ตีบวก */}
        <Section
          id="upgrade"
          icon="🔨"
          title="ตีบวกอัพหมัด (ลุ้นสำเร็จ)"
          sub="อัพเลเวลหมัดแบบมีลุ้น — จ่าย EXP + เงินต่อการลอง 1 ครั้ง สำเร็จ = เลเวลขึ้น, พลาด = เสียทุนฟรี (เลเวลสูงยิ่งแพงและยิ่งลุ้นหนัก)"
        >
          <div className="overflow-x-auto rounded-2xl border border-orange-500/25 bg-black/50">
            <table className="w-full min-w-[440px] border-collapse text-xs md:text-sm">
              <thead>
                <tr className="text-orange-200/80">
                  <th className="px-3 py-2.5 text-left font-medium">อัพเลเวล</th>
                  <th className="px-3 py-2.5 text-right font-medium">⭐ EXP</th>
                  <th className="px-3 py-2.5 text-right font-medium">💰 เงิน</th>
                  <th className="px-3 py-2.5 text-right font-medium">โอกาสสำเร็จ</th>
                </tr>
              </thead>
              <tbody>
                {upgradeTable.map((r) => {
                  const p = Math.round(r.chance * 100);
                  const pc = p >= 70 ? "text-emerald-200" : p >= 40 ? "text-amber-200" : "text-rose-200";
                  return (
                    <tr key={r.lv} className="border-t border-orange-500/10">
                      <td className="px-3 py-2.5 font-semibold text-pink-50">Lv.{r.lv} → {r.to}</td>
                      <td className="px-3 py-2.5 text-right text-amber-100">{fmtNum(r.exp)}</td>
                      <td className="px-3 py-2.5 text-right text-emerald-100">{fmtNum(r.money)}</td>
                      <td className={"px-3 py-2.5 text-right font-bold " + pc}>{p}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11px] text-pink-300/60">
            * ทุนถูกหักทุกครั้งที่กดลอง ไม่ว่าจะสำเร็จหรือไม่ — วางแผนเก็บ EXP/เงินให้พอก่อนค่อยลุ้น
          </p>
        </Section>

        {/* SKILL */}
        <Section id="skill" icon={skill.emoji} title={`สกิลพิเศษ: ${skill.name}`}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] sm:items-center rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-500/10 to-transparent p-4">
            <p className="text-sm leading-relaxed text-pink-100/85">{skill.desc}</p>
            <div className="flex gap-2 sm:flex-col">
              <div className="flex-1 rounded-xl bg-black/40 px-3 py-2 text-center">
                <p className="text-[10px] text-pink-300/60">คูลดาวน์</p>
                <p className="text-base font-bold text-rose-200">{skill.cooldown}s</p>
              </div>
              <div className="flex-1 rounded-xl bg-black/40 px-3 py-2 text-center">
                <p className="text-[10px] text-pink-300/60">ดาเมจ</p>
                <p className="text-base font-bold text-amber-200">×{skill.dmgMult}</p>
              </div>
            </div>
          </div>
        </Section>

        {/* PERKS */}
        <Section
          id="perks"
          icon="⭐"
          title="ลูกเล่น (Perk)"
          sub="อัพในเมนูโทรศัพท์ ด้วยเงิน + เหล็ก (ราคาขึ้นเรื่อย ๆ ตามขั้น) — เสริมพลังถาวร"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {perks.map((p) => (
              <div key={p.key} className="flex items-start gap-3 rounded-2xl border border-pink-500/25 bg-black/50 p-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/25 to-fuchsia-500/15 text-2xl">
                  {p.emoji}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{p.name}</h3>
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-pink-300/70">สูงสุด {p.max} ขั้น</span>
                  </div>
                  <p className="mt-0.5 text-xs text-pink-100/80">{p.perLv}</p>
                  <p className="mt-0.5 text-[11px] text-amber-200/80">{p.maxEffect}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* EXP CARDS */}
        <Section
          id="cards"
          icon="🃏"
          title="บัตรเพิ่ม EXP"
          sub="ไอเทมฟาร์มที่เทรดได้ — ดรอปจากมอนทอง/บอส ใช้จากแท็บบัตรในเมนูหมัด เพื่อเร่งเลเวล"
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {expCards.map((c) => (
              <div key={c.code} className="rounded-2xl border border-purple-500/30 bg-black/50 p-3 text-center">
                <div className="text-3xl">{c.emoji}</div>
                <p className="mt-1 text-xs font-bold text-white">{c.name}</p>
                <p className="mt-0.5 text-[11px] text-purple-200/80">{c.effect}</p>
                <div className="mt-2 flex justify-center">
                  <RareChip word={c.rarity} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* EXTRA SYSTEMS */}
        <Section id="extra" icon="🧩" title="ระบบเสริมที่ควรรู้">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-orange-500/25 bg-black/50 p-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-amber-100">🔥 คอมโบตีต่อเนื่อง</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-pink-100/80">{combo.desc}</p>
              <div className="mt-2 flex gap-2 text-[11px]">
                <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-amber-200">{combo.perKill}/คอมโบ</span>
                <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-amber-200">สูงสุด {combo.max}</span>
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-500/25 bg-black/50 p-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-100">🤝 ช่วยกันตี (จองมอน)</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-pink-100/80">{claim.desc}</p>
              <div className="mt-2.5 space-y-1.5">
                {claim.symbols.map((s) => (
                  <div
                    key={s.icon}
                    className={
                      "flex items-center gap-2.5 rounded-xl border px-2.5 py-1.5 " +
                      (s.mine ? "border-emerald-400/40 bg-emerald-500/10" : "border-rose-400/40 bg-rose-500/10")
                    }
                  >
                    <span className="text-xl leading-none">{s.icon}</span>
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold text-pink-50">
                        {s.label}
                        <span className={"ml-1.5 rounded-full px-1.5 py-0.5 text-[9px] " + (s.mine ? "bg-emerald-500/25 text-emerald-200" : "bg-rose-500/25 text-rose-200")}>
                          {s.badge}
                        </span>
                      </p>
                      <p className="text-[11px] leading-tight text-pink-200/70">{s.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-sky-500/25 bg-black/50 p-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-sky-100">🏃 ลู่วิ่ง AFK</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-pink-100/80">{treadmill.desc}</p>
            </div>
            <div className="rounded-2xl border border-rose-500/25 bg-black/50 p-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-rose-100">💢 มอนตีกระเด็น</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-pink-100/80">{knockback.desc}</p>
            </div>
          </div>
        </Section>

        <p className="mt-8 text-center text-[11px] text-pink-300/60">
          * ตัวเลขทั้งหมดอ้างอิงค่าปัจจุบันในเกม อาจปรับสมดุลได้ในอนาคต
        </p>
      </div>
    </div>
  );
}
