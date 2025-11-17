"use client";

import { eventall } from "@/json/event";
import React, { useMemo } from "react"; 

function parseDate(d) {
  if (!d) return null;
  // รองรับทั้ง "2025-12-25" และ "2025-1-2"
  const date = new Date(`${d}T00:00:00`);
  return isNaN(date.getTime()) ? null : date;
}

function formatThaiDate(d) {
  if (!d) return "-";
  return d.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatEventRange(start, end) {
  if (!start && !end) return "-";
  if (start && !end) return formatThaiDate(start);
  if (!start && end) return formatThaiDate(end);
  const sameDay = start.toDateString() === end.toDateString();
  if (sameDay) return formatThaiDate(start);
  return `${formatThaiDate(start)} - ${formatThaiDate(end)}`;
}

function getStatusBadge(status) {
  if (status === "ongoing") {
    return {
      label: "กำลังจัด",
      className:
        "bg-emerald-500/15 text-emerald-300 border border-emerald-400/60",
    };
  }
  if (status === "upcoming") {
    return {
      label: "ยังไม่เริ่ม",
      className: "bg-sky-500/10 text-sky-300 border border-sky-400/60",
    };
  }
  return {
    label: "จบแล้ว",
    className: "bg-slate-600/40 text-slate-200 border border-slate-400/70",
  };
}

function EventCard({ ev, status }) {
  const start = parseDate(ev.startdate);
  const end = parseDate(ev.enddate);
  const rangeText = formatEventRange(start, end);
  const badge = getStatusBadge(status);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-pink-500/30 bg-black/80 p-4 text-sm text-pink-50 shadow-sm transition hover:-translate-y-1 hover:border-pink-400/80 hover:shadow-pink-500/40 md:p-5">
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="relative flex flex-col gap-3 md:flex-row md:items-start">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-pink-50 md:text-lg">
            {ev.name}
          </h3>
          <p className="mt-1 text-[13px] text-pink-100/85">
            {ev.description}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-pink-200/80 md:text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-pink-500/10 px-2.5 py-1">
              <span className="text-[13px]">📅</span>
              <span>{rangeText}</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-pink-500/5 px-2.5 py-1">
              <span className="text-[13px]">⏱</span>
              <span>
                เริ่ม: {start ? formatThaiDate(start) : "ไม่ระบุ"}
              </span>
            </span>
          </div>
        </div>
        <div className="mt-1 md:mt-0 md:ml-3">
          <span
            className={
              "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold " +
              badge.className
            }
          >
            <span className="text-xs">●</span>
            {badge.label}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function EventPage() {
  const { upcoming, ongoing, ended } = useMemo(() => {
    const today = new Date();
    const normalized = eventall
      .map((ev) => {
        const start = parseDate(ev.startdate);
        const end = parseDate(ev.enddate);
        return { raw: ev, start, end };
      })
      .sort((a, b) => {
        if (!a.start && !b.start) return 0;
        if (!a.start) return 1;
        if (!b.start) return -1;
        return a.start - b.start;
      });

    const groups = {
      upcoming: [],
      ongoing: [],
      ended: [],
    };

    for (const ev of normalized) {
      const s = ev.start;
      const e = ev.end || ev.start || today;

      if (s && today < s) {
        groups.upcoming.push(ev.raw);
      } else if (s && today >= s && today <= e) {
        groups.ongoing.push(ev.raw);
      } else {
        groups.ended.push(ev.raw);
      }
    }

    return groups;
  }, []);

  const hasEvents =
    upcoming.length > 0 || ongoing.length > 0 || ended.length > 0;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      {/* BG */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        {/* Header */}
        <header className="mb-6 md:mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            Sweet Paradise • Events
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
            กิจกรรมพิเศษใน{" "}
            <span className="text-pink-300">Sweet Paradise</span>
          </h1>
          <p className="mt-3 text-sm text-pink-100/85 md:text-base">
            รวมทุกอีเวนต์สำคัญของแมพ ทั้งที่กำลังจัดอยู่
            กำลังจะมาถึง และที่จบไปแล้ว
          </p>
        </header>

        {!hasEvents && (
          <div className="rounded-2xl border border-pink-500/40 bg-black/80 p-6 text-center text-sm text-pink-100/80">
            ตอนนี้ยังไม่มีกิจกรรมในระบบ
            โปรดรอติดตามกิจกรรมสุดพิเศษจาก Sweet Paradise เร็ว ๆ นี้ 🎉
          </div>
        )}

        <div className="space-y-7 md:space-y-8">
          {/* กำลังจัด */}
          {ongoing.length > 0 && (
            <section>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-500/20 text-lg">
                  🟢
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-pink-50 md:text-base">
                    กำลังจัดอยู่ในขณะนี้
                  </h2>
                  <p className="text-[11px] text-pink-200/80 md:text-xs">
                    กิจกรรมที่กำลังเปิดให้ร่วมสนุกอยู่ตอนนี้ในแมพ
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {ongoing.map((ev) => (
                  <EventCard key={ev.name + ev.startdate} ev={ev} status="ongoing" />
                ))}
              </div>
            </section>
          )}

          {/* ยังไม่เริ่ม */}
          {upcoming.length > 0 && (
            <section>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-sky-500/20 text-lg">
                  🔔
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-pink-50 md:text-base">
                    กิจกรรมที่กำลังจะมาถึง
                  </h2>
                  <p className="text-[11px] text-pink-200/80 md:text-xs">
                    เตรียมตัวให้พร้อม! กิจกรรมเหล่านี้จะเปิดตามวันเวลาที่กำหนด
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {upcoming.map((ev) => (
                  <EventCard key={ev.name + ev.startdate} ev={ev} status="upcoming" />
                ))}
              </div>
            </section>
          )}

          {/* จบแล้ว */}
          {ended.length > 0 && (
            <section>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-600/40 text-lg">
                  🕯
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-pink-50 md:text-base">
                    กิจกรรมที่จบไปแล้ว
                  </h2>
                  <p className="text-[11px] text-pink-200/80 md:text-xs">
                    ประวัติอีเวนต์ที่เคยจัดไปแล้วใน Sweet Paradise
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {ended.map((ev) => (
                  <EventCard key={ev.name + ev.startdate} ev={ev} status="ended" />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
