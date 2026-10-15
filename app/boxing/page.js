import {
  meta,
  howto,
  modes,
  keys,
  moves,
  defense,
  stamina,
  ring,
  rarity,
  gacha,
  gearSpread,
  classes,
  gym,
  gymRules,
  perks,
  reward,
  antiFarm,
  ranks,
  tips,
} from "@/json/boxing";

export const metadata = {
  title: "สนามมวย SWEET BOXING — Sweet Paradise Hub",
  description:
    "สอนเล่นระบบต่อยมวย SWEET BOXING — โหมด 1v1/ทีม/ต่อยมั่ว ปุ่มลัด ท่าต่อย การ์ด ปัดสวน หลบ คลาส 20 แบบ ตู้สุ่มนวม/ออร่า ฝึกยิม 4 เครื่อง และรางวัลเหรียญมวย",
};

const RAR = Object.fromEntries(rarity.map((r) => [r.id, r]));

function Chip({ r }) {
  const x = RAR[r];
  return (
    <span className={`whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-medium ${x.cls}`}>
      {x.name}
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

function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border border-rose-500/25 bg-black/50 p-3 ${className}`}>{children}</div>;
}

export default function BoxingPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-rose-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-1/3 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 bottom-0 h-72 w-72 rounded-full bg-red-500/15 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        {/* HERO */}
        <header className="mb-6 text-center md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-300">
            🥊 {meta.name} • ระบบใหม่
          </span>
          <h1 className="mt-4 bg-gradient-to-r from-rose-300 via-amber-200 to-red-300 bg-clip-text text-3xl font-black leading-[1.4] tracking-tight text-transparent md:text-4xl md:leading-[1.4]">
            สอนเล่นต่อยมวย
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-100/80 md:text-sm">
            ขึ้นเวทีชกกับเพื่อนจริง ๆ — <b className="text-amber-200">เซิร์ฟตัดสินทุกหมัด</b> มีการ์ด ปัดสวน หลบ
            คอมโบ และท่าไม้ตายประจำคลาส · ชนะได้ <b className="text-amber-200">{meta.coin}</b> กับแต้มอันดับ
            เอาไปสุ่มคลาส นวม และออร่า
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {[
              { v: `${meta.classes} คลาส`, l: "ไม้ตายไม่ซ้ำกัน" },
              { v: `${meta.gloves} นวม`, l: `+ ออร่า ${meta.auras} แบบ` },
              { v: "3 โหมด", l: "1v1 · ทีม · ต่อยมั่ว 30 คน" },
              { v: `Lv.${meta.trainMax}`, l: "ฝึกยิม 4 สาย" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-rose-500/25 bg-black/50 px-3 py-2.5 text-center">
                <p className="text-sm font-bold text-amber-100">{s.v}</p>
                <p className="text-[10px] text-pink-300/70">{s.l}</p>
              </div>
            ))}
          </div>
        </header>

        {/* วิธีเล่น */}
        <Section id="howto" icon="🎮" title="เริ่มเล่นยังไง">
          <ol className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
            {howto.map((s, i) => (
              <li key={i} className="relative rounded-2xl border border-rose-500/25 bg-black/50 p-3">
                <span className="absolute right-2 top-2 text-[10px] font-bold text-rose-400/50">{i + 1}</span>
                <div className="text-2xl">{s.icon}</div>
                <p className="mt-1.5 text-sm font-semibold text-amber-100">{s.title}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-pink-200/70">{s.desc}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* โหมด */}
        <Section id="modes" icon="🏟️" title="3 โหมดให้เลือก" sub="หัวห้องเป็นคนเลือก · ทุกคนกดพร้อมแล้วเริ่ม">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {modes.map((m) => (
              <Card key={m.name}>
                <p className="text-2xl">{m.emoji}</p>
                <p className="mt-1 text-sm font-bold text-amber-100">{m.name}</p>
                <p className="mt-1 text-[11px] text-pink-200/70">{m.desc}</p>
                <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
                  <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-pink-100/80">👤 {m.people}</span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-pink-100/80">⏱️ {m.time}</span>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* ปุ่ม */}
        <Section id="keys" icon="⌨️" title="ปุ่มที่ต้องจำ" sub="คอม: มือซ้ายอยู่บน WASD ได้ตลอด ไม่ต้องละมือ · มือถือมีปุ่มบนจอให้กด">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {keys.map((k) => (
              <Card key={k.k} className="flex gap-2.5">
                <span className="h-fit shrink-0 rounded-lg border border-amber-300/40 bg-amber-500/10 px-2 py-1 text-[11px] font-bold text-amber-200">
                  {k.k}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-amber-100">{k.label}</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-pink-200/70">{k.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* ท่าต่อย */}
        <Section
          id="moves"
          icon="👊"
          title="ท่าต่อยทั้งหมด"
          sub="“ง้าง” คือเวลาก่อนหมัดจะโดนจริง — ยิ่งนานยิ่งโดนหลบ/โดนสวนง่าย"
        >
          <div className="overflow-x-auto rounded-2xl border border-rose-500/25 bg-black/50">
            <table className="w-full min-w-[640px] text-left text-xs">
              <thead className="bg-white/5 text-[11px] text-pink-200/70">
                <tr>
                  <th className="px-3 py-2">ท่า</th>
                  <th className="px-3 py-2">ปุ่ม</th>
                  <th className="px-3 py-2 text-right">ดาเมจ</th>
                  <th className="px-3 py-2 text-right">สตามินา</th>
                  <th className="px-3 py-2 text-right">ง้าง (วิ)</th>
                  <th className="px-3 py-2 text-right">มึน (วิ)</th>
                  <th className="px-3 py-2">หมายเหตุ</th>
                </tr>
              </thead>
              <tbody>
                {moves.map((m) => (
                  <tr key={m.key} className="border-t border-white/5">
                    <td className="px-3 py-2 font-semibold text-amber-100">{m.name}</td>
                    <td className="px-3 py-2 text-pink-200/80">{m.btn}</td>
                    <td className="px-3 py-2 text-right font-mono text-rose-200">{m.dmg}</td>
                    <td className="px-3 py-2 text-right font-mono text-sky-200">{m.st}</td>
                    <td className="px-3 py-2 text-right font-mono text-pink-200/70">{m.wind}</td>
                    <td className="px-3 py-2 text-right font-mono text-pink-200/70">{m.stun}</td>
                    <td className="px-3 py-2 text-[11px] text-pink-200/70">{m.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11px] text-pink-300/60">
            * คลิกซ้ายรัว ๆ จะไล่คอมโบให้เอง: แย็บ → หมัดตรง → ฮุก → อัปเปอร์คัต (หยุดเกิน 0.9 วิ เริ่มนับใหม่)
          </p>
        </Section>

        {/* ป้องกัน */}
        <Section id="defense" icon="🛡️" title="กัน หลบ และสวนกลับ" sub="หัวใจของเกมนี้อยู่ที่จังหวะ ไม่ใช่กดรัว">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {defense.map((d) => (
              <Card key={d.title}>
                <p className="text-sm font-semibold text-amber-100">
                  <span className="mr-1.5">{d.icon}</span>
                  {d.title}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-pink-200/70">{d.desc}</p>
              </Card>
            ))}
          </div>
          <Card className="mt-2.5 border-sky-500/25">
            <p className="text-sm font-semibold text-sky-200">⚡ สตามินาคือทุกอย่าง</p>
            <ul className="mt-1.5 space-y-1">
              {stamina.map((s, i) => (
                <li key={i} className="text-[11px] leading-relaxed text-pink-200/70">• {s}</li>
              ))}
            </ul>
          </Card>
        </Section>

        {/* กติกาเวที */}
        <Section id="ring" icon="📜" title="กติกาบนเวที">
          <Card>
            <ul className="space-y-1.5">
              {ring.map((r, i) => (
                <li key={i} className="text-[11px] leading-relaxed text-pink-200/80">• {r}</li>
              ))}
            </ul>
          </Card>
        </Section>

        {/* คลาส */}
        <Section
          id="classes"
          icon="🧑‍🎤"
          title={`คลาส ${classes.length} แบบ`}
          sub="ค่าพลังต่างกันไม่เกิน ~10% — เจ้าของเกมตั้งใจไม่ให้ใครได้เปรียบมาก ฝีมือสำคัญกว่า"
        >
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {classes.map((c) => (
              <Card key={c.id}>
                <div className="flex items-start gap-2.5">
                  <span className="text-2xl">{c.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <p className="text-sm font-bold text-amber-100">{c.name}</p>
                      <Chip r={c.rarity} />
                    </div>
                    <p className="mt-0.5 text-[11px] text-pink-200/70">{c.desc}</p>
                    <p className="mt-1.5 text-[11px] text-emerald-200/90">
                      <span className="text-pink-300/60">ติดตัว: </span>
                      {c.pas}
                    </p>
                    <p className="mt-0.5 text-[11px] text-amber-200/90">
                      <span className="text-pink-300/60">ไม้ตาย (G): </span>
                      {c.ult}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* ตู้สุ่ม */}
        <Section id="gacha" icon="🎰" title="ตู้สุ่มมวย" sub="ใช้เหรียญมวยที่ได้จากการชกและการฝึก">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {gacha.map((g) => (
              <Card key={g.name}>
                <p className="text-2xl">{g.emoji}</p>
                <p className="mt-1 text-sm font-bold text-amber-100">{g.name}</p>
                <p className="mt-1 text-lg font-black text-amber-200">
                  {g.price} <span className="text-[11px] font-normal text-pink-300/70">เหรียญมวย/ครั้ง</span>
                </p>
                <p className="mt-0.5 text-[11px] text-pink-200/70">{g.pool} · {g.refund}</p>
              </Card>
            ))}
          </div>

          <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <Card>
              <p className="text-sm font-semibold text-amber-100">อัตราออกตามระดับ</p>
              <div className="mt-2 space-y-1.5">
                {rarity.map((r) => (
                  <div key={r.id} className="flex items-center gap-2">
                    <Chip r={r.id} />
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-rose-400 to-amber-300" style={{ width: `${r.pct}%` }} />
                    </div>
                    <span className="w-10 text-right font-mono text-[11px] text-amber-200">{r.pct}%</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <p className="text-sm font-semibold text-amber-100">มีอะไรในแต่ละตู้บ้าง</p>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead className="text-pink-200/60">
                    <tr>
                      <th className="py-1">ตู้</th>
                      {rarity.map((r) => (
                        <th key={r.id} className="py-1 text-right">{r.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["คลาส", gearSpread.classes],
                      ["นวม", gearSpread.gloves],
                      ["ออร่า", gearSpread.auras],
                    ].map(([label, s]) => (
                      <tr key={label} className="border-t border-white/5">
                        <td className="py-1.5 font-semibold text-amber-100">{label}</td>
                        {rarity.map((r) => (
                          <td key={r.id} className="py-1.5 text-right font-mono text-pink-200/80">{s[r.id]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-1.5 text-[10px] text-pink-300/60">* ได้ซ้ำจะคืนเหรียญให้ 30%</p>
            </Card>
          </div>
        </Section>

        {/* ยิม */}
        <Section
          id="gym"
          icon="🏋️"
          title="ฝึกในยิม 4 เครื่อง"
          sub="เล่นมินิเกมให้ตรงจังหวะ · ฝึกเต็มทั้ง 4 สายเก่งขึ้นรวมแค่ ~5% (ไม่ใช่สายบังคับ แต่ช่วยได้)"
        >
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {gym.map((g) => (
              <Card key={g.name}>
                <p className="text-2xl">{g.emoji}</p>
                <p className="mt-1 text-sm font-bold text-amber-100">{g.name}</p>
                <p className="text-[10px] text-pink-300/60">สาย{g.stat}</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-pink-200/70">🎯 {g.play}</p>
                <p className="mt-1 text-[11px] font-semibold text-emerald-200/90">เต็ม Lv.50 → {g.bonus}</p>
              </Card>
            ))}
          </div>
          <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {gymRules.map((r) => (
              <Card key={r.title}>
                <p className="text-sm font-semibold text-amber-100">
                  <span className="mr-1.5">{r.icon}</span>
                  {r.title}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-pink-200/70">{r.desc}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* สิทธิพิเศษ */}
        <Section id="perks" icon="🏅" title="ปลดล็อกตามเลเวลรวม" sub="ของโชว์ล้วน ๆ ไม่ทำให้ได้เปรียบในการชก">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {perks.map((p) => (
              <Card key={p.lv} className="flex items-center gap-2.5">
                <span className="shrink-0 rounded-lg border border-amber-300/40 bg-amber-500/10 px-2 py-1 text-[11px] font-bold text-amber-200">
                  Lv.{p.lv}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-semibold text-amber-100">{p.name}</p>
                  <p className="text-[10px] text-pink-300/60">{p.kind}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* รางวัล + อันดับ */}
        <Section id="reward" icon="🏆" title="รางวัลและอันดับ" sub="ระบบนี้ไม่แจกเงินในเกม — ได้เหรียญมวยกับแต้มอันดับเท่านั้น">
          <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2">
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[11px] text-pink-200/60">
                    <tr>
                      <th className="py-1.5">โหมด</th>
                      <th className="py-1.5">ชนะ</th>
                      <th className="py-1.5">แพ้</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reward.rows.map((r) => (
                      <tr key={r.mode} className="border-t border-white/5">
                        <td className="py-2 font-semibold text-amber-100">{r.mode}</td>
                        <td className="py-2 text-emerald-200">{r.win}</td>
                        <td className="py-2 text-pink-200/70">{r.lose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-[11px] text-pink-200/80">🏅 {reward.rp}</p>
              <p className="mt-1 text-[11px] text-pink-200/80">🏋️ {reward.gym}</p>
            </Card>
            <Card>
              <p className="text-sm font-semibold text-amber-100">ยศตามแต้มอันดับ</p>
              <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                {ranks.map((r) => (
                  <div key={r.name} className="rounded-xl border border-white/10 bg-white/5 px-2 py-1.5 text-center">
                    <p className="text-lg leading-none">{r.emoji}</p>
                    <p className="mt-1 text-[11px] font-semibold text-amber-100">{r.name}</p>
                    <p className="text-[10px] text-pink-300/60">{r.rp} แต้ม</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <Card className="mt-2.5 border-rose-500/30">
            <p className="text-sm font-semibold text-rose-200">🚫 กติกากันฟาร์ม</p>
            <ul className="mt-1.5 space-y-1">
              {antiFarm.map((a, i) => (
                <li key={i} className="text-[11px] leading-relaxed text-pink-200/70">• {a}</li>
              ))}
            </ul>
          </Card>
        </Section>

        {/* เคล็ดลับ */}
        <Section id="tips" icon="💡" title="เคล็ดลับสำหรับมือใหม่">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {tips.map((t, i) => (
              <Card key={i} className="border-amber-400/25">
                <p className="text-[11px] leading-relaxed text-amber-50/90">
                  <span className="mr-1.5 font-bold text-amber-300">{i + 1}.</span>
                  {t}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        <p className="mt-8 text-center text-[11px] text-pink-300/50">
          ข้อมูลตรงกับระบบในเกม ({meta.name} · เปิด {meta.since}) · ทุกหมัดตัดสินที่เซิร์ฟเวอร์
        </p>
      </div>
    </div>
  );
}
