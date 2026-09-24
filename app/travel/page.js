import { meta, destinations, howto, notes } from "@/json/travel";

export const revalidate = 3600;

export const metadata = {
  title: "ไปเที่ยว — Sweet Paradise Hub",
  description: `คู่มือแอพ ✈️ ไปเที่ยว — ${destinations.length} สถานที่ (โตเกียว คาราโอเกะ ไนท์คลับ ขุนเขาสยาม) พร้อมรายละเอียดกิจกรรมในแต่ละแมพและวิธีวาร์ป`,
};

const TONES = {
  amber: { box: "border-amber-400/35 bg-amber-500/[0.08]", text: "text-amber-200" },
  sky: { box: "border-sky-400/35 bg-sky-500/[0.08]", text: "text-sky-200" },
  emerald: { box: "border-emerald-400/35 bg-emerald-500/[0.08]", text: "text-emerald-200" },
  pink: { box: "border-pink-400/40 bg-pink-500/[0.09]", text: "text-pink-200" },
};

function Section({ icon, title, sub, children }) {
  return (
    <section className="mt-10">
      <h2 className="flex items-center gap-2 text-lg font-bold leading-[1.5] text-white md:text-xl">
        <span>{icon}</span>
        {title}
      </h2>
      {sub && <p className="mt-1 text-xs leading-relaxed text-sky-100/70 md:text-sm">{sub}</p>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Stat({ v, k, tone = "text-sky-200" }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/45 px-3 py-2.5 text-center">
      <div className={"text-base font-bold leading-[1.4] md:text-lg " + tone}>{v}</div>
      <div className="mt-0.5 text-[10px] leading-tight text-sky-100/55">{k}</div>
    </div>
  );
}

export default function TravelPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-sky-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0b1020] to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-sky-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        {/* ===== Header ===== */}
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">
            ✈️ Travel App
          </span>
          <h1 className="mt-4 text-2xl font-bold leading-[1.45] tracking-tight text-white md:text-4xl md:leading-[1.45]">
            แอพ
            <span className="inline-block bg-gradient-to-r from-sky-300 via-fuchsia-300 to-amber-200 bg-clip-text leading-[1.45] text-transparent md:leading-[1.45]">
              ไปเที่ยว
            </span>
          </h1>
          <p className="mx-auto mt-2.5 max-w-3xl text-xs leading-relaxed text-sky-100/85 md:text-sm">
            เปิดโทรศัพท์ → แอพ ✈️ ไปเที่ยว → เลือกสถานที่แล้ววาร์ปไปได้เลย ตอนนี้มี{" "}
            <span className="font-semibold text-white">{destinations.length} ที่</span> ทุกที่เป็นแมพของตัวเอง
            และมีปุ่มกลับเกมหลักอยู่ในแมพ
          </p>
        </header>

        {/* ===== ตัวเลขหลัก ===== */}
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Stat v={`${destinations.length} ที่`} k="สถานที่ทั้งหมด" tone="text-sky-200" />
          <Stat v={`${meta.cooldownSec} วิ`} k="เว้นก่อนวาร์ปรอบถัดไป" tone="text-amber-200" />
          <Stat v="1 ที่" k="ที่พารถไปด้วยได้" tone="text-fuchsia-200" />
          <Stat v="ฟรี" k="ไม่มีค่าเข้า" tone="text-emerald-200" />
        </div>

        {/* ===== สถานที่ ===== */}
        <Section
          icon="🗺️"
          title={`${destinations.length} สถานที่`}
          sub="รูปทั้งหมดถ่ายจากในแมพจริง — กดจากแอพแล้ววาร์ปได้ทันที"
        >
          <div className="flex flex-col gap-5">
            {destinations.map((d) => (
              <article
                key={d.id}
                className="overflow-hidden rounded-3xl border bg-black/60"
                style={{ borderColor: `${d.accent}55` }}
              >
                {/* รูป 16:9 */}
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.img}
                    alt={d.nameTh}
                    className="aspect-video w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-[0.15em]"
                        style={{ borderColor: `${d.accent}88`, color: d.accent, background: "rgba(0,0,0,0.55)" }}
                      >
                        {d.name}
                      </span>
                      {d.garage && (
                        <span className="rounded-full border border-amber-300/60 bg-amber-400/15 px-2 py-0.5 text-[10px] font-semibold text-amber-200">
                          🚗 พารถไปได้
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1.5 text-xl font-black leading-[1.35] text-white md:text-2xl">
                      {d.nameTh}
                    </h3>
                    <p className="text-[11px] text-white/75 md:text-xs">{d.sub}</p>
                  </div>
                </div>

                <div className="p-4 md:p-5">
                  {/* แท็ก */}
                  <div className="flex flex-wrap gap-1.5">
                    {d.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* ดีเทล */}
                  <div className="mt-3.5 grid gap-2.5 md:grid-cols-2">
                    {d.highlights.map((h) => (
                      <div key={h.title} className="rounded-2xl border border-white/10 bg-black/45 p-3.5">
                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <span className="text-base leading-none">{h.icon}</span>
                          {h.title}
                        </div>
                        <p className="mt-1.5 text-[11px] leading-relaxed text-sky-100/80">{h.desc}</p>
                      </div>
                    ))}
                  </div>

                  <p
                    className="mt-3 rounded-2xl px-3.5 py-2.5 text-[11px] leading-relaxed text-white/85"
                    style={{ background: `${d.accent}1a`, border: `1px solid ${d.accent}44` }}
                  >
                    📌 {d.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* ===== วิธีไป ===== */}
        <Section icon="🧭" title="ไปยังไง" sub={meta.openPath}>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {howto.map((s) => (
              <div key={s.step} className="rounded-2xl border border-white/10 bg-black/45 p-3.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-500 text-[10px] font-bold text-black">
                    {s.step}
                  </span>
                  <span className="text-base leading-none">{s.icon}</span>
                </div>
                <p className="mt-2 text-xs font-bold text-white">{s.title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-sky-100/75">{s.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ===== ข้อควรรู้ ===== */}
        <Section icon="📌" title="ข้อควรรู้">
          <div className="grid gap-3 md:grid-cols-2">
            {notes.map((n) => {
              const t = TONES[n.tone] || TONES.sky;
              return (
                <div key={n.title} className={`rounded-2xl border p-4 ${t.box}`}>
                  <div className={`flex items-center gap-2 text-sm font-bold ${t.text}`}>
                    <span>{n.icon}</span>
                    {n.title}
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-sky-50/85 md:text-xs">{n.desc}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-3 rounded-2xl border border-white/10 bg-black/40 px-3.5 py-3 text-[11px] leading-relaxed text-sky-100/80">
            💾 {meta.saveBeforeGo} · {meta.readOnly}
          </p>
        </Section>

        <p className="mt-10 text-center text-[10px] text-sky-200/45">
          ข้อมูลอ้างอิงจากระบบในเกมจริง · อัปเดต 24 ก.ย. 2569
        </p>
      </div>
    </div>
  );
}
