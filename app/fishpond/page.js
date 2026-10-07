import {
  meta, roles, power, commands, obedience, care, stars, skill,
  points, traits, auras, drops, rules, dollShop, dolls,
} from "@/json/fishpond";
import { fmtNum } from "@/lib/gameAssets";

export const revalidate = 3600;

export const metadata = {
  title: "สังเวียนปลา — Sweet Paradise Hub",
  description: `คู่มือ 🐟 สังเวียนปลา (บ่อสู้ปลาสายรุ้ง) — ปล่อยปลาลงตู้สูงสุด ${meta.maxFish} ตัว สั่งปลา ฝึกไม้ตาย นิสัย ออร่า และร้านตุ๊กตาปลารุ้ง ${dolls.length} แบบ`,
};

const ROLE_TONE = {
  tank: { text: "text-sky-200", chip: "border-sky-400/40 bg-sky-500/15 text-sky-200" },
  bruiser: { text: "text-amber-200", chip: "border-amber-400/40 bg-amber-500/15 text-amber-200" },
  assassin: { text: "text-rose-200", chip: "border-rose-400/40 bg-rose-500/15 text-rose-200" },
  control: { text: "text-violet-200", chip: "border-violet-400/40 bg-violet-500/15 text-violet-200" },
  support: { text: "text-emerald-200", chip: "border-emerald-400/40 bg-emerald-500/15 text-emerald-200" },
};
const ROLE_BY = Object.fromEntries(roles.map((r) => [r.key, r]));

function Section({ icon, title, sub, children, id }) {
  return (
    <section className="mt-10" id={id}>
      <h2 className="flex items-center gap-2 text-lg font-bold leading-[1.5] text-white md:text-xl">
        <span>{icon}</span>
        {title}
      </h2>
      {sub && <p className="mt-1 text-xs leading-relaxed text-cyan-100/70 md:text-sm">{sub}</p>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Stat({ v, k, tone = "text-cyan-200" }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/45 px-3 py-2.5 text-center">
      <div className={"text-base font-bold leading-[1.4] md:text-lg " + tone}>{v}</div>
      <div className="mt-0.5 text-[10px] leading-tight text-cyan-100/55">{k}</div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border border-white/10 bg-black/45 p-3.5 ${className}`}>{children}</div>;
}

export default function FishPondPage() {
  const roleCount = Object.fromEntries(
    roles.map((r) => [r.key, dolls.filter((d) => d.role === r.key).length])
  );

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-cyan-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#06121c] to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-cyan-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        {/* ===== Header ===== */}
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
            🐟 Fish Pond Arena
          </span>
          <h1 className="mt-4 text-2xl font-bold leading-[1.45] tracking-tight text-white md:text-4xl md:leading-[1.45]">
            สังเวียน
            <span className="inline-block bg-gradient-to-r from-cyan-300 via-sky-200 to-fuchsia-300 bg-clip-text leading-[1.45] text-transparent md:leading-[1.45]">
              ปลา
            </span>
          </h1>
          <p className="mx-auto mt-2.5 max-w-3xl text-xs leading-relaxed text-cyan-100/85 md:text-sm">
            ตู้กระจกกลางลานเกม — เอาปลาสายรุ้งที่เคยตกได้มาปล่อยลงบ่อ ปลาจะสู้กันเองจนเหลือตัวรอด
            คุณยืนข้างตู้คอยสั่ง เชียร์ และกดไม้ตายให้ · ชนะแล้วได้แต้มสู้ไปแลก
            <span className="font-semibold text-white"> ตุ๊กตาปลารุ้ง {dolls.length} แบบ</span>
          </p>
        </header>

        {/* ===== ตัวเลขหลัก ===== */}
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          <Stat v={`${meta.maxFish} ตัว`} k="ปลาในบ่อสูงสุด" tone="text-cyan-200" />
          <Stat v={`${meta.perPlayer} ตัว`} k="ต่อผู้เล่น 1 คน" tone="text-sky-200" />
          <Stat v={`${dolls.length} แบบ`} k="ปลาที่ลงสู้ได้" tone="text-fuchsia-200" />
          <Stat v={`${traits.total} แบบ`} k="นิสัยปลา" tone="text-amber-200" />
          <Stat v={`${auras.total} แบบ`} k="ออร่า" tone="text-violet-200" />
          <Stat v={`${meta.injuryMin} นาที`} k="พักฟื้นเมื่อแพ้" tone="text-rose-200" />
        </div>

        {/* ===== เล่นยังไง ===== */}
        <Section icon="🎮" title="เล่นยังไง" sub={`ไปที่ ${meta.where} แล้วยืนใกล้ตู้ไม่เกิน ${meta.nearDist} ช่อง`}>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: 1, icon: "🎣", t: "ต้องเคยตกปลาตัวนั้นได้", d: "ปล่อยได้เฉพาะปลาสายรุ้งที่เคยตกได้เอง — คนละ 1 ตัวต่อรอบ" },
              { n: 2, icon: "🐟", t: "ปล่อยลงบ่อ", d: `บ่อรับได้สูงสุด ${meta.maxFish} ตัว ปลาเป็นบอทสู้กันเองอัตโนมัติ` },
              { n: 3, icon: "🎯", t: "คอยสั่งข้างตู้", d: "สั่งเล็งเป้า สั่งถอย เชียร์ และกดไม้ตายตอนเกจเต็ม" },
              { n: 4, icon: "🎟️", t: "เก็บแต้มไปแลกตุ๊กตา", d: `ฆ่า ช่วยรุม และอยู่รอดได้แต้ม — วันละไม่เกิน ${points.cap} แต้ม` },
            ].map((s) => (
              <Card key={s.n}>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-[10px] font-bold text-black">
                    {s.n}
                  </span>
                  <span className="text-base leading-none">{s.icon}</span>
                </div>
                <p className="mt-2 text-xs font-bold text-white">{s.t}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-cyan-100/75">{s.d}</p>
              </Card>
            ))}
          </div>
          <p className="mt-3 rounded-2xl border border-white/10 bg-black/40 px-3.5 py-3 text-[11px] leading-relaxed text-cyan-100/80">
            🖥️ {meta.serverAuth} · {meta.announceNote}
          </p>
        </Section>

        {/* ===== ปุ่มสั่ง ===== */}
        <Section icon="🕹️" title="ปุ่มสั่งปลา" sub={obedience.note}>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {commands.map((c) => (
              <Card key={c.name} className="flex items-start gap-3">
                <span className="text-2xl leading-none">{c.icon}</span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-sm font-bold text-white">{c.name}</span>
                    {c.cd > 0 && (
                      <span className="rounded-full border border-white/15 bg-black/50 px-2 py-0.5 text-[10px] text-cyan-100/70">
                        คูลดาวน์ {c.cd} วิ
                      </span>
                    )}
                    <span
                      className={
                        "rounded-full border px-2 py-0.5 text-[10px] font-semibold " +
                        (c.obey
                          ? "border-amber-400/40 bg-amber-500/15 text-amber-200"
                          : "border-emerald-400/40 bg-emerald-500/15 text-emerald-200")
                      }
                    >
                      {c.obey ? "ลุ้นว่าปลาจะเชื่อฟัง" : "ได้ผลทุกครั้ง"}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-cyan-100/80">{c.detail}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-3 rounded-2xl border border-amber-400/35 bg-amber-500/[0.08] p-4">
            <div className="text-sm font-bold text-amber-200">🙇 ความเชื่อฟัง {obedience.base}% → {obedience.max}%</div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-amber-50/85">
              {obedience.formula} (สูงสุด Lv.{obedience.maxLv}) · {obedience.cost}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-amber-50/70">{obedience.oreNote}</p>
          </div>
        </Section>

        {/* ===== พลังปลา + บทบาท ===== */}
        <Section icon="💪" title="พลังปลาคิดจากอะไร" sub={power.note}>
          <div className="grid gap-2.5 md:grid-cols-2">
            <Card>
              <div className="text-xs font-bold text-white">📐 สูตรพลังพื้นฐาน</div>
              <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-cyan-200">{power.formula}</p>
              <p className="mt-2 text-[11px] leading-relaxed text-cyan-100/80">{power.countBonus}</p>
            </Card>
            <Card>
              <div className="text-xs font-bold text-white">📊 ค่าที่ได้จากพลัง</div>
              <ul className="mt-1.5 space-y-1 text-[11px] leading-relaxed text-cyan-100/80">
                <li>• เลือด = พลัง × {power.hpPerPower} × ตัวคูณบทบาท</li>
                <li>• แรงกัด = พลัง × {power.bitePerPower} × ตัวคูณบทบาท</li>
                <li>• คริติคอล {power.crit.chance}% แรง ×{power.crit.mult} · หลบ {power.dodge}%</li>
                <li>• {power.enrage}</li>
              </ul>
            </Card>
          </div>

          <div className="mt-3 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[520px] border-collapse text-xs">
              <thead>
                <tr className="bg-white/[0.06] text-left text-[11px] uppercase tracking-wide text-cyan-100/60">
                  <th className="px-3 py-2.5 font-semibold">บทบาท</th>
                  <th className="px-3 py-2.5 text-right font-semibold">เลือด</th>
                  <th className="px-3 py-2.5 text-right font-semibold">แรงกัด</th>
                  <th className="px-3 py-2.5 text-right font-semibold">ความเร็ว</th>
                  <th className="px-3 py-2.5 text-right font-semibold">มีกี่ตัว</th>
                  <th className="px-3 py-2.5 font-semibold">สไตล์</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {roles.map((r) => (
                  <tr key={r.key} className="bg-black/40">
                    <td className={`whitespace-nowrap px-3 py-2.5 font-semibold ${ROLE_TONE[r.key].text}`}>
                      {r.icon} {r.name}
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-cyan-100/85">×{r.hp}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-cyan-100/85">×{r.atk}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-cyan-100/85">×{r.spd}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-white">{roleCount[r.key]}</td>
                    <td className="px-3 py-2.5 text-[11px] text-cyan-100/70">{r.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ===== อัปเกรดปลา ===== */}
        <Section icon="⬆️" title="ทำให้ปลาเก่งขึ้นได้ 5 ทาง">
          <div className="grid gap-2.5 md:grid-cols-2">
            <Card>
              <div className="text-xs font-bold text-white">🎣 ตกปลาตัวเดิมเพิ่ม</div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-cyan-100/80">{power.countBonus}</p>
            </Card>
            <Card>
              <div className="text-xs font-bold text-white">🍖 บำรุงรายวัน</div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-cyan-100/80">
                วันละ {care.perDay} ครั้งต่อตัว ครั้งละ +{care.step}% สูงสุด +{care.max}% · ครั้งละ {fmtNum(care.cost)} บาท
              </p>
            </Card>
            <Card>
              <div className="text-xs font-bold text-white">⭐ ดาวปลา (ฟรี)</div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-cyan-100/80">
                ครบ {stars.steps.map((s) => fmtNum(s)).join(" / ")} ตัว = ได้ดาวเพิ่มทีละดวง · ดาวละ +{stars.powerPer}% พลัง
                ตัวโตขึ้น {stars.sizePer}% และมีวงแสงรอบตัวในตู้
              </p>
            </Card>
            <Card>
              <div className="text-xs font-bold text-white">🔥 ฝึกท่าไม้ตาย Lv1–{skill.maxLv}</div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-cyan-100/80">
                เลเวลละ ไม้ตายแรง +{skill.powerPer}% ชาร์จไว +{skill.ragePer}% · จ่ายด้วยแต้มสู้ + ผลึกแร่
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {skill.costs.map((c) => (
                  <span key={c.lv} className="rounded-full border border-white/12 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/80">
                    Lv.{c.lv} · {c.pt} แต้ม + {c.ore} ×{c.n}
                  </span>
                ))}
              </div>
            </Card>
            <Card className="md:col-span-2">
              <div className="text-xs font-bold text-white">🧬 นิสัยปลา {traits.total} แบบ</div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-cyan-100/80">
                ลงบ่อครั้งแรกได้นิสัยฟรี 1 อย่าง · {traits.reroll} · มีนิสัยทอง {traits.gold} แบบ โอกาสออกราว {traits.goldChance}%
              </p>
              <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-cyan-100/50">ตัวอย่างนิสัยปกติ</p>
                  <ul className="mt-1 space-y-1 text-[11px] text-cyan-100/80">
                    {traits.samples.map((t) => (
                      <li key={t.name}>{t.icon} <b className="text-white">{t.name}</b> — {t.desc}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-amber-400/30 bg-amber-500/[0.07] p-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-200/80">🌟 นิสัยทอง (หายาก)</p>
                  <ul className="mt-1 space-y-1 text-[11px] text-amber-50/85">
                    {traits.goldSamples.map((t) => (
                      <li key={t.name}>{t.icon} <b className="text-white">{t.name}</b> — {t.desc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </Section>

        {/* ===== กติกาในบ่อ ===== */}
        <Section icon="📌" title="กติกาที่ควรรู้ก่อนลงบ่อ">
          <div className="grid gap-3 md:grid-cols-2">
            {rules.map((r) => (
              <div key={r.title} className="rounded-2xl border border-cyan-400/25 bg-cyan-500/[0.06] p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-cyan-100">
                  <span>{r.icon}</span>
                  {r.title}
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-cyan-50/85 md:text-xs">{r.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ===== ของตกในตู้ ===== */}
        <Section icon="🎁" title="ของตกในตู้ระหว่างสู้" sub={`โผล่ทุก ${drops.everySec[0]}–${drops.everySec[1]} วินาที · อยู่ได้ ${drops.lifeSec} วินาที · บนบ่อพร้อมกันไม่เกิน ${drops.max} ชิ้น (${drops.need})`}>
          <div className="flex flex-wrap gap-2">
            {drops.list.map((d) => (
              <span key={d.name} className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/85">
                {d.icon} {d.name}
              </span>
            ))}
          </div>
          <p className="mt-3 rounded-2xl border border-white/10 bg-black/40 px-3.5 py-3 text-[11px] leading-relaxed text-cyan-100/80">
            🎯 {drops.note}
          </p>
        </Section>

        {/* ===== แต้มสู้ ===== */}
        <Section icon="🎟️" title="แต้มสู้ได้จากไหน" sub={points.note}>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat v={`+${points.kill}`} k="ฆ่าตัวท้าย" tone="text-rose-200" />
            <Stat v={`+${points.assist}`} k="ช่วยรุม" tone="text-amber-200" />
            <Stat v={`+${points.alive}`} k="ปลาอยู่รอดทุก 1 นาที" tone="text-emerald-200" />
            <Stat v={`+${points.king}`} k="ล้มราชาบ่อ" tone="text-yellow-200" />
          </div>
          <p className="mt-3 rounded-2xl border border-fuchsia-400/30 bg-fuchsia-500/[0.08] px-3.5 py-3 text-center text-xs font-semibold text-fuchsia-100">
            เพดานวันละ {points.cap} แต้ม · เอาไปแลกตุ๊กตาปลารุ้ง หรือใช้ฝึกไม้ตายกับแลกออร่า ({auras.total} แบบ · {fmtNum(auras.priceMin)}–{fmtNum(auras.priceMax)} แต้ม)
          </p>
        </Section>

        {/* ===== ตุ๊กตา ===== */}
        <Section
          icon="🧸"
          title={`ร้านตุ๊กตาปลารุ้ง ${dolls.length} แบบ`}
          sub={`${dollShop.need} · ${dollShop.once} · ${dollShop.priceNote}`}
        >
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[640px] border-collapse text-xs">
              <thead>
                <tr className="bg-white/[0.06] text-left text-[11px] uppercase tracking-wide text-cyan-100/60">
                  <th className="px-3 py-2.5 font-semibold">ตุ๊กตา / ปลา</th>
                  <th className="px-3 py-2.5 font-semibold">บทบาท</th>
                  <th className="px-3 py-2.5 font-semibold">ท่าไม้ตาย</th>
                  <th className="px-3 py-2.5 text-right font-semibold">พลัง</th>
                  <th className="px-3 py-2.5 text-right font-semibold">ราคา (แต้มสู้)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {dolls.map((d) => {
                  const r = ROLE_BY[d.role];
                  const t = ROLE_TONE[d.role];
                  return (
                    <tr key={d.id} className="bg-black/40">
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2.5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`/images/items/${d.id}.png`}
                            alt=""
                            loading="lazy"
                            className="h-9 w-9 shrink-0 rounded-lg bg-white/[0.04] object-contain"
                          />
                          <span className="font-semibold text-white">{d.fish}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-2.5">
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${t.chip}`}>
                          {r.icon} {r.name}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-2.5 text-[11px] text-cyan-100/85">{d.special}</td>
                      <td className="whitespace-nowrap px-3 py-2.5 text-right font-mono text-cyan-200">{d.power}</td>
                      <td className="whitespace-nowrap px-3 py-2.5 text-right font-mono font-semibold text-fuchsia-200">
                        {fmtNum(d.price)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 rounded-2xl border border-white/10 bg-black/40 px-3.5 py-3 text-[11px] leading-relaxed text-cyan-100/80">
            🧸 ตุ๊กตาเป็นของถือเล่น อุ้มได้พอดีมือ · ปลาที่หายากกว่าจะพลังสูงกว่าและตุ๊กตาแพงกว่า
          </p>
        </Section>

        <p className="mt-10 text-center text-[10px] text-cyan-200/45">
          ข้อมูลอ้างอิงจากระบบในเกมจริง · อัปเดต 7 ต.ค. 2569
        </p>
      </div>
    </div>
  );
}
