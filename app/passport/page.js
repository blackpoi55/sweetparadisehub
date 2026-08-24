import {
  meta, autoFields, editFields, jobs, colors, stamps,
  editSteps, photoWays, assetTypes, troubleshoot, tips,
} from "@/json/passport";

export const revalidate = 3600;

export const metadata = {
  title: "พาสปอร์ตนักเดินทาง — Sweet Paradise Hub",
  description:
    "คู่มือ 🛂 พาสปอร์ตนักเดินทาง — วิธีแก้ไขข้อมูลส่วนตัวบนการ์ด (ฉายา คำขวัญ อาชีพ สีปก ตราประทับ) และวิธีเพิ่มรูปพาสปอร์ตทั้งแบบค้นหาในเกมและอัปรูปเอง",
};

async function fetchIcon() {
  try {
    const r = await fetch(
      `https://thumbnails.roblox.com/v1/assets?assetIds=${meta.iconId}&size=420x420&format=Png&isCircular=false`,
      { next: { revalidate: 3600 } }
    );
    const j = await r.json();
    const d = (j.data || [])[0];
    return d && d.state === "Completed" ? d.imageUrl : null;
  } catch {
    return null;
  }
}

const TONES = {
  emerald: { box: "border-emerald-400/35 bg-emerald-500/[0.07]", text: "text-emerald-200" },
  sky: { box: "border-sky-400/35 bg-sky-500/[0.07]", text: "text-sky-200" },
  amber: { box: "border-amber-400/35 bg-amber-500/[0.07]", text: "text-amber-200" },
  rose: { box: "border-rose-400/40 bg-rose-500/[0.09]", text: "text-rose-200" },
};

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

export default async function PassportPage() {
  const icon = await fetchIcon();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-pink-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        {/* ===== Header ===== */}
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            🛂 Traveler Passport
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
            พาสปอร์ต<span className="text-sky-300">นักเดินทาง</span>
          </h1>
          <p className="mx-auto mt-2 max-w-3xl text-xs text-pink-100/85 md:text-sm">
            การ์ดโปรไฟล์ในเกม — <span className="text-sky-200">หยิบถือแล้วกางเหนือหัว</span> ให้คนรอบตัวดูสถิติและข้อความที่คุณเขียนเอง ·
            แก้ทุกอย่างได้ในโทรศัพท์
          </p>
        </header>

        {/* ===== การ์ดไอเทม ===== */}
        <div className="mt-7 grid gap-3 sm:grid-cols-[auto,1fr]">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-2xl border border-sky-400/30 bg-black/60 p-2 sm:mx-0">
            {icon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={icon} alt={meta.itemName} className="h-full w-full object-contain" />
            ) : (
              <span className="text-5xl">🛂</span>
            )}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="text-base font-bold text-white">{meta.itemName}</div>
            <div className="mt-0.5 font-mono text-[11px] text-pink-200/60">{meta.itemCode}</div>
            <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-200">
                🎁 {meta.getby}
              </span>
              <span className="rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-1 font-semibold text-sky-200">
                📱 แก้ได้ที่ {meta.openFrom}
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-pink-100/80">
              ไม่ต้องหาซื้อ ไม่ต้องคราฟ ไม่ต้องลุ้น — เปิดกระเป๋าก็เจอเลยตั้งแต่วันแรก
            </p>
          </div>
        </div>

        {/* ===== กางการ์ดยังไง ===== */}
        <Section icon="👀" title="กางโชว์ให้คนอื่นดูยังไง" sub="ไม่ต้องกดอะไรเลย แค่หยิบถือ">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: "🤚", t: "หยิบขึ้นถือ", d: "การ์ดกางลอยเหนือหัวทันที ทุกคนรอบตัวเห็นเหมือนกันหมด" },
              { icon: "📏", t: `เห็นได้ไกล ${meta.viewDistance} ช่อง`, d: `ลอยสูงจากหัว ${meta.cardHeight} ช่อง · ทะลุกำแพงเห็นได้` },
              { icon: "🎒", t: "เก็บลงกระเป๋า", d: "การ์ดหุบหายทันที ไม่ค้างไว้ให้ใครดู" },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-2xl">{x.icon}</div>
                <div className="mt-1.5 text-sm font-bold text-white">{x.t}</div>
                <div className="mt-1 text-[11px] leading-relaxed text-pink-200/75">{x.d}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ===== บนการ์ดมีอะไร ===== */}
        <Section
          icon="🪪"
          title="บนการ์ดมีอะไรบ้าง"
          sub="แบ่งเป็น 2 กลุ่มชัดเจน — ฝั่งซ้ายระบบเติมให้ แก้ไม่ได้ · ฝั่งขวาคุณแก้เองได้ทั้งหมด"
        >
          <div className="grid gap-4 lg:grid-cols-2">
            {/* ระบบเติมเอง */}
            <div className="rounded-2xl border border-slate-400/25 bg-slate-500/[0.07] p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
                🔒 ระบบเติมเอง — แก้ไม่ได้
              </div>
              <p className="mt-1 text-[11px] text-pink-200/70">ตั้งใจล็อกไว้ กันคนโม้เลเวล/คะแนน</p>
              <ul className="mt-3 space-y-2">
                {autoFields.map((f) => (
                  <li key={f.name} className="flex gap-2.5 rounded-xl bg-black/30 px-3 py-2">
                    <span className="w-5 shrink-0 text-center text-sm">{f.icon}</span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-white">{f.name}</span>
                      <span className="block text-[11px] leading-relaxed text-pink-200/70">{f.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* แก้เองได้ */}
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/[0.07] p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-100">
                ✏️ คุณแก้เองได้ — 6 ช่อง
              </div>
              <p className="mt-1 text-[11px] text-pink-200/70">แก้ที่ {meta.openFrom}</p>
              <ul className="mt-3 space-y-2">
                {editFields.map((f) => (
                  <li key={f.key} className="flex gap-2.5 rounded-xl bg-black/30 px-3 py-2">
                    <span className="w-5 shrink-0 text-center text-sm">{f.icon}</span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-white">
                        {f.name}
                        <span className="ml-1.5 font-normal text-emerald-300/80">· {f.how}</span>
                      </span>
                      <span className="block text-[11px] leading-relaxed text-pink-200/70">{f.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ===== วิธีแก้ข้อมูล ===== */}
        <Section icon="✍️" title="วิธีแก้ไขข้อมูลส่วนตัว" sub="5 ขั้นตอน ทำในโทรศัพท์ที่เดียวจบ">
          <ol className="space-y-2.5">
            {editSteps.map((s) => (
              <li
                key={s.step}
                className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sky-400/40 bg-sky-500/15 text-sm font-bold text-sky-200">
                  {s.step}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-white">
                    <span className="mr-1.5">{s.icon}</span>
                    {s.title}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-relaxed text-pink-200/80 md:text-xs">
                    {s.desc}
                  </span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {[
              { k: "ฉายา", v: `${meta.nickMax} ตัวอักษร` },
              { k: "คำขวัญ", v: `${meta.mottoMax} ตัวอักษร` },
              { k: "กดบันทึกซ้ำ", v: `เว้น ${meta.saveCd} วินาที` },
            ].map((x) => (
              <div
                key={x.k}
                className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-center"
              >
                <div className="text-sm font-bold text-sky-200">{x.v}</div>
                <div className="text-[10px] text-pink-200/60">{x.k}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ===== วิธีเพิ่มรูป ===== */}
        <Section
          icon="🖼️"
          title="วิธีเพิ่มรูปพาสปอร์ต"
          sub="ทำได้ 2 ทาง — ค้นหารูปสำเร็จรูปในเกม หรืออัปรูปของตัวเองแล้วเอาไอดีมาวาง"
        >
          <div className="grid gap-4 lg:grid-cols-2">
            {photoWays.map((w) => {
              const tone = TONES[w.tone];
              return (
                <div key={w.key} className={`rounded-2xl border p-4 ${tone.box}`}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xl">{w.icon}</span>
                    <span className={`text-sm font-bold ${tone.text}`}>{w.title}</span>
                    <span className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-[10px] text-pink-200/80">
                      {w.badge}
                    </span>
                  </div>
                  <ol className="mt-3 space-y-2">
                    {w.steps.map((s, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/50 text-[10px] font-bold text-white">
                          {i + 1}
                        </span>
                        <span className="text-[11px] leading-relaxed text-pink-100/85 md:text-xs">{s}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-3 rounded-lg bg-black/35 px-2.5 py-2 text-[10px] leading-relaxed text-pink-200/70">
                    💡 {w.note}
                  </p>
                </div>
              );
            })}
          </div>

          {/* ชนิดไอดี */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="text-sm font-bold text-white">ไอดีแบบไหนใช้ได้บ้าง</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {assetTypes.map((t) => (
                <div
                  key={t.label}
                  className={`rounded-xl border px-3 py-2.5 ${
                    t.ok
                      ? "border-emerald-400/30 bg-emerald-500/[0.07]"
                      : "border-rose-400/30 bg-rose-500/[0.07]"
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <span>{t.ok ? "✅" : "❌"}</span>
                    {t.label}
                    {t.id !== null && (
                      <span className="font-mono text-[10px] font-normal text-pink-200/55">
                        (ชนิด {t.id})
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-[11px] leading-relaxed text-pink-200/75">{t.desc}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-pink-200/70">
              🔗 <span className="text-white">วางทั้งลิงก์ก็ได้</span> — ไม่ต้องตัดเลขเอง ระบบดึงตัวเลขในข้อความให้อัตโนมัติ ·
              ปุ่ม <span className="text-white">“ล้างรูป”</span> ในหน้าเดียวกันใช้เอารูปออก กลับไปใช้รูปหัวอวตารตามเดิม
            </p>
          </div>
        </Section>

        {/* ===== ตัวเลือกทั้งหมด ===== */}
        <Section icon="🎛️" title="ตัวเลือกทั้งหมดที่มีให้เลือก" sub="กด ◀ ▶ วนเลือกในแอพ">
          <div className="grid gap-4 lg:grid-cols-3">
            {/* อาชีพ */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-sm font-bold text-white">
                💼 อาชีพ
                <span className="ml-1.5 text-[11px] font-normal text-pink-200/60">{jobs.length} แบบ</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {jobs.map((j) => (
                  <span
                    key={j}
                    className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] text-pink-100/85"
                  >
                    {j}
                  </span>
                ))}
              </div>
            </div>

            {/* สีปก */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-sm font-bold text-white">
                🎨 สีปกเล่ม
                <span className="ml-1.5 text-[11px] font-normal text-pink-200/60">{colors.length} สี</span>
              </div>
              <ul className="mt-3 space-y-1.5">
                {colors.map((c) => (
                  <li key={c.name} className="flex items-center gap-2.5">
                    <span
                      className="h-5 w-9 shrink-0 rounded-md border border-white/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-[11px] text-pink-100/85">{c.name}</span>
                    <span className="ml-auto font-mono text-[10px] text-pink-200/45">{c.hex}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ตราประทับ */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-sm font-bold text-white">
                🔖 ตราประทับ
                <span className="ml-1.5 text-[11px] font-normal text-pink-200/60">{stamps.length} แบบ</span>
              </div>
              <p className="mt-1 text-[11px] text-pink-200/70">ขึ้นนำหน้าชื่อบนหัวการ์ด</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {stamps.map((s) => (
                  <span
                    key={s}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-xl"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ===== แก้ปัญหา ===== */}
        <Section icon="🩹" title="เจอข้อความเตือน แก้ยังไง" sub="ข้อความที่เจอบ่อยตอนตั้งรูป/บันทึก">
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[520px] border-collapse text-xs">
              <thead>
                <tr className="bg-white/[0.06] text-left text-[11px] uppercase tracking-wide text-pink-200/70">
                  <th className="px-3 py-2.5 font-semibold">ข้อความที่ขึ้น</th>
                  <th className="px-3 py-2.5 font-semibold">แปลว่าอะไร / ทำยังไง</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {troubleshoot.map((t) => (
                  <tr key={t.msg} className="bg-black/40">
                    <td className="px-3 py-2.5 align-top">
                      <span className="text-rose-200">“{t.msg}”</span>
                    </td>
                    <td className="px-3 py-2.5 align-top leading-relaxed text-pink-100/85">{t.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ===== ข้อควรรู้ ===== */}
        <Section icon="📌" title="ข้อควรรู้">
          <div className="grid gap-3 md:grid-cols-2">
            {tips.map((t) => {
              const tone = TONES[t.tone] || TONES.sky;
              return (
                <div key={t.title} className={`rounded-2xl border p-4 ${tone.box}`}>
                  <div className={`flex items-center gap-2 text-sm font-bold ${tone.text}`}>
                    <span>{t.icon}</span>
                    {t.title}
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-pink-100/85 md:text-xs">{t.desc}</p>
                </div>
              );
            })}
          </div>
        </Section>

        <p className="mt-9 text-center text-[10px] text-pink-200/45">
          ข้อมูลอ้างอิงจากระบบในเกมจริง · อัปเดต 24 ส.ค. 2569
        </p>
      </div>
    </div>
  );
}
