"use client";

import { useEffect, useState } from "react";

const PLATFORMS = [
  {
    key: "android",
    icon: "🤖",
    title: "Android (Chrome)",
    accent: "from-emerald-500/20 to-green-500/10",
    steps: [
      "เปิดเว็บนี้ในแอป Chrome",
      "แตะเมนู ⋮ มุมขวาบน",
      "เลือก “ติดตั้งแอป” หรือ “เพิ่มไปยังหน้าจอหลัก”",
      "กด “ติดตั้ง” → ไอคอนขึ้นหน้าจอเหมือนแอปจริง",
    ],
    note: "บางเครื่องจะมีแถบ “ติดตั้ง” เด้งขึ้นมาเอง กดได้เลย",
  },
  {
    key: "ios",
    icon: "",
    title: "iPhone / iPad (Safari)",
    accent: "from-sky-500/20 to-cyan-500/10",
    steps: [
      "เปิดเว็บนี้ใน Safari (ต้อง Safari เท่านั้น)",
      "แตะปุ่ม แชร์ ⬆️ ที่แถบล่าง (สี่เหลี่ยมมีลูกศรขึ้น)",
      "เลื่อนหา “เพิ่มไปยังหน้าจอโฮม (Add to Home Screen)”",
      "กด “เพิ่ม” → ไอคอนขึ้นหน้าจอโฮม",
    ],
    note: "⚠️ บน iPhone ต้องใช้ Safari — Chrome/แอปอื่นบน iOS ติดตั้งไม่ได้",
  },
  {
    key: "windows",
    icon: "🪟",
    title: "Windows PC (Chrome / Edge)",
    accent: "from-blue-500/20 to-indigo-500/10",
    steps: [
      "เปิดเว็บใน Chrome หรือ Edge",
      "ดูที่แถบ URL ขวาสุด จะมีไอคอนติดตั้ง (จอมีลูกศร ⊞)",
      "กดไอคอนนั้น → เลือก “ติดตั้ง”",
      "แอปเปิดเป็นหน้าต่างแยก + ปักหมุด Taskbar ได้",
    ],
    note: "ถ้าไม่เห็นไอคอน: เมนู ⋮ → แอป → “ติดตั้งไซต์นี้เป็นแอป”",
  },
  {
    key: "mac",
    icon: "🍎",
    title: "Mac (Chrome / Edge / Safari)",
    accent: "from-fuchsia-500/20 to-purple-500/10",
    steps: [
      "Chrome/Edge: กดไอคอนติดตั้งที่แถบ URL → “ติดตั้ง” (เข้า Launchpad/Dock)",
      "Safari (macOS Sonoma ขึ้นไป): เมนู File → “Add to Dock…”",
      "กด “Add” → แอปอยู่ใน Dock เปิดเป็นหน้าต่างแยก",
    ],
    note: "เปิดจาก Launchpad / Dock ได้เหมือนแอปทั่วไป",
  },
];

export default function InstallPage() {
  const [deferred, setDeferred] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone === true;
    setInstalled(isStandalone);
    const onPrompt = (e) => {
      e.preventDefault();
      setDeferred(e);
    };
    const onInstalled = () => { setInstalled(true); setDeferred(null); };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const install = async () => {
    if (!deferred) return;
    deferred.prompt();
    try { await deferred.userChoice; } catch {}
    setDeferred(null);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-8 text-center">
          <img
            src="/icons/icon-192.png"
            alt="Sweet Paradise"
            className="mx-auto h-24 w-24 rounded-3xl shadow-2xl shadow-pink-500/40"
          />
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            📲 Install App
          </span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">ติดตั้งเป็นแอป</h1>
          <p className="mx-auto mt-2 max-w-xl text-xs text-pink-200/80 md:text-sm">
            เพิ่ม Sweet Paradise Hub ลงหน้าจอ เปิดได้เหมือนแอปจริง — เต็มจอ เปิดเร็ว ไม่มีแถบเบราว์เซอร์กวนใจ
          </p>

          {/* ปุ่มติดตั้งเลย (ถ้าเบราว์เซอร์รองรับ) */}
          <div className="mt-5">
            {installed ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-5 py-2.5 text-sm font-semibold text-emerald-300">
                ✓ ติดตั้งแล้ว — เปิดจากหน้าจอได้เลย
              </span>
            ) : deferred ? (
              <button
                onClick={install}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 px-6 py-3 text-sm font-bold text-black shadow-lg shadow-pink-500/40 transition hover:-translate-y-0.5"
              >
                📲 ติดตั้งเลย (คลิกเดียว)
              </button>
            ) : (
              <p className="text-[11px] text-pink-300/60">
                เบราว์เซอร์นี้ต้องติดตั้งด้วยมือ — ทำตามขั้นตอนของอุปกรณ์คุณด้านล่าง 👇
              </p>
            )}
          </div>
        </header>

        {/* benefits */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { i: "⚡", t: "เปิดเร็ว" },
            { i: "📱", t: "เต็มจอ เหมือนแอป" },
            { i: "🔖", t: "มีไอคอนบนหน้าจอ" },
            { i: "📶", t: "เปิดได้แม้เน็ตช้า" },
          ].map((b) => (
            <div key={b.t} className="rounded-xl border border-pink-500/20 bg-black/50 px-3 py-3 text-center">
              <div className="text-xl">{b.i}</div>
              <p className="mt-1 text-[11px] text-pink-100/80">{b.t}</p>
            </div>
          ))}
        </div>

        {/* platform guides */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PLATFORMS.map((p) => (
            <article
              key={p.key}
              className={`rounded-2xl border border-pink-500/30 bg-gradient-to-br ${p.accent} p-4 md:p-5`}
            >
              <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                <span className="text-xl">{p.icon || ""}</span>
                {p.title}
              </h2>
              <ol className="mt-3 space-y-2">
                {p.steps.map((s, i) => (
                  <li key={i} className="flex gap-2.5 text-xs text-pink-100/90 md:text-sm">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-500 text-[10px] font-bold text-black">
                      {i + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              {p.note && (
                <p className="mt-3 rounded-lg bg-black/40 px-3 py-2 text-[11px] text-pink-200/75">💡 {p.note}</p>
              )}
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] text-pink-300/50">
          ถ้าติดตั้งไม่ได้ ลองรีเฟรชหน้าเว็บ 1 ครั้งก่อน แล้วลองใหม่ (ระบบต้องโหลดครบก่อนถึงจะติดตั้งได้)
        </p>
      </div>
    </div>
  );
}
