import Link from "next/link";
import { scheduleEvents, hourlyTimeline, scheduleLegend } from "@/json/schedule";
import ScheduleCountdown from "@/components/ScheduleCountdown";

export const metadata = { title: "ตารางกิจกรรม — Sweet Paradise Hub" };

function EventCard({ ev }) {
  const inner = (
    <div className={`h-full rounded-2xl border border-pink-500/30 bg-gradient-to-br ${ev.accent} p-4 transition hover:-translate-y-0.5 hover:border-pink-400/70`}>
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-black/40 text-2xl">
          {ev.icon}
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-white">
            {ev.name}
            {ev.href && <span className="ml-1 text-[11px] text-pink-300/70">↗</span>}
          </h3>
          <p className="text-xs font-medium text-pink-200">{ev.when}</p>
        </div>
      </div>
      <div className="mt-3 space-y-1 text-xs text-pink-100/85">
        {ev.duration && ev.duration !== "-" && <p>⏱️ ระยะเวลา: {ev.duration}</p>}
        <p>🎁 {ev.reward}</p>
      </div>
    </div>
  );
  return ev.href ? <Link href={ev.href}>{inner}</Link> : inner;
}

export default function SchedulePage() {
  const rows = hourlyTimeline();
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-6 text-center md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            🗓️ Event Schedule
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">ตารางกิจกรรมประจำ</h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-200/80 md:text-sm">
            กิจกรรมที่วนตามเวลา — ทุกอย่างอิงเวลาไทย (UTC+7) วางแผนล่วงหน้าได้เลยว่าจะเข้าเกมช่วงไหน
          </p>
        </header>

        {/* real-time countdown */}
        <ScheduleCountdown />

        {/* event cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scheduleEvents.map((ev) => (
            <EventCard key={ev.key} ev={ev} />
          ))}
        </div>

        {/* hourly timeline */}
        <section className="rounded-2xl border border-pink-500/30 bg-black/70 p-4 md:p-6">
          <h2 className="mb-1 text-base font-semibold text-white">⏰ ไทม์ไลน์ 24 ชั่วโมง</h2>
          <p className="mb-4 text-xs text-pink-200/75">แต่ละชั่วโมงมีอะไรบ้าง (เวลาไทย)</p>
          <div className="mb-4 flex flex-wrap gap-3">
            {scheduleLegend.map((l) => (
              <span key={l.label} className="flex items-center gap-1.5 text-[11px] text-pink-100/85">
                <span className="text-base">{l.icon}</span>
                {l.label}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
            {rows.map((r) => {
              const highlight = r.hour === 21 || r.hour === 0;
              return (
                <div
                  key={r.hour}
                  className={
                    "flex flex-col items-center rounded-xl border p-2 " +
                    (highlight ? "border-fuchsia-400/40 bg-fuchsia-500/10" : "border-pink-500/15 bg-black/50")
                  }
                >
                  <span className="text-xs font-bold text-pink-100">
                    {String(r.hour).padStart(2, "0")}:00
                  </span>
                  <span className="mt-1 text-base leading-tight">{r.items.join(" ")}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-[11px] text-pink-300/60">
            💡 บอสโลก = ชั่วโมงเลขคู่ • เควสแอดมิน = ชั่วโมงเลขคี่ • Airdrop = ทุกชั่วโมง • ทัวร์ศึกปลา 21:00 • รีเซ็ตวงล้อ 00:00
          </p>
        </section>
      </div>
    </div>
  );
}
