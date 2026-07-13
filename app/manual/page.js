// app/manual/page.js
"use client";

import { useState } from "react";

const SECTIONS = [
  {
    id: "song",
    emoji: "🎵",
    title: "การลงเพลง",
    tag: "Song Request / Boombox",
    highlight: "เปิดให้ทุกคนลงเพลงเองได้ฟรี! แต่ต้องใช้ไอดีใหม่ (ใช้แล้วทิ้ง) เท่านั้น",
    content: (
      <>
        <p className="text-sm text-pink-100/90">
          ตอนนี้ไม่ต้องรอแอดมินลงให้แล้ว — <span className="font-semibold text-pink-200">ทุกคนอัปโหลดเพลงเข้าแมพเองได้ฟรี</span> 🎉
        </p>

        <div className="mt-3 rounded-2xl border border-red-500/40 bg-red-500/10 p-3">
          <p className="text-sm font-semibold text-red-300">⚠️ ใช้ “ไอดีใหม่” เท่านั้น (ย้ำ! ไอดีใหม่)</p>
          <p className="mt-1 text-[13px] text-pink-100/90">
            เพราะถ้าเพลงติดลิขสิทธิ์มาก ๆ <span className="font-semibold text-red-300">ไอดีจะโดนแบน</span> —
            ห้ามใช้ไอดีหลักเด็ดขาด ให้สมัครไอดีใหม่แบบ “ใช้แล้วทิ้ง” มาลงเพลงโดยเฉพาะ
          </p>
        </div>

        <div className="mt-4 space-y-2.5">
          <p className="text-sm font-semibold text-pink-200">ขั้นตอน (4 สเต็ป)</p>

          {[
            {
              n: 1,
              t: "สมัครไอดีใหม่ (ใช้แล้วทิ้ง)",
              d: (
                <>
                  ตั้ง <span className="font-semibold">username + password ง่าย ๆ</span> ไม่ต้องใส่อีเมล ที่{" "}
                  <a href="https://www.roblox.com/CreateAccount" target="_blank" rel="noreferrer" className="font-medium text-pink-300 underline">
                    roblox.com/CreateAccount
                  </a>
                </>
              ),
            },
            {
              n: 2,
              t: "ล็อกอินแล้วเปิดหน้าอัปโหลดเสียง",
              d: (
                <>
                  ไปที่{" "}
                  <a href="https://create.roblox.com/dashboard/creations?activeTab=Audio" target="_blank" rel="noreferrer" className="font-medium text-pink-300 underline">
                    create.roblox.com → Audio
                  </a>{" "}
                  <span className="text-pink-100/70">(เมนู: การสร้างสรรค์ → ไอเท็มการพัฒนา → เสียง → อัปโหลดทรัพยากร)</span>
                </>
              ),
            },
            {
              n: 3,
              t: "อัปโหลดเพลง + ตั้งชื่อให้ถูกหลัก",
              d: (
                <>
                  รูปแบบชื่อ:{" "}
                  <span className="font-mono text-pink-100">ชื่อเพลง - ชื่อศิลปิน</span> เช่น{" "}
                  <span className="font-mono text-pink-100">หนีห่าง - เขียนไข</span> แล้วกด “อัปโหลด”
                  <span className="text-pink-100/70"> (ไฟล์ MP3/OGG/WAV, ยาวไม่เกิน 7 นาที, ≤ 20 MB)</span>
                </>
              ),
            },
            {
              n: 4,
              t: "ทักส่วนตัวแอดมิน ส่งไอดี+รหัสผ่าน",
              d: (
                <>
                  ส่ง <span className="font-semibold text-pink-200">ไอดี + รหัสผ่าน</span> ของไอดีที่มีเพลงมาให้แอดมิน —
                  เดี๋ยวแอดมินเอาเพลงเข้าแมพให้ <span className="font-semibold text-pink-300">(1 ไอดี ลงได้ 10 เพลง)</span>
                </>
              ),
            },
          ].map((s) => (
            <div key={s.n} className="flex gap-3 rounded-xl bg-black/50 p-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-500 text-[11px] font-bold text-black">
                {s.n}
              </span>
              <div className="text-sm text-pink-100/90">
                <p className="font-medium text-pink-100">{s.t}</p>
                <p className="text-[13px] text-pink-100/80">{s.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-2xl border border-pink-500/40 bg-pink-500/10 p-3 text-xs text-pink-100">
          <p className="font-semibold text-pink-200">หมายเหตุ</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>ตั้งชื่อเพลง + ศิลปินให้ถูกต้องตามหลัก (ชื่อเพลง - ศิลปิน) จะได้ค้นเจอง่ายและลดโอกาสโดนแบน</li>
            <li>ไอดีที่ใช้ลงเพลง <span className="font-semibold text-red-300">มีโอกาสโดนแบน</span> ถ้าเพลงติดลิขสิทธิ์ — จึงต้องเป็นไอดีทิ้งเท่านั้น</li>
            <li>บอกแอดมินด้วยว่าเพลงเป็นหมวดไหน (Boombox ทั่วไป / แดนซ์ / ม่วนหน้าฮ้าน / กีตาร์ Finger Style)</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: "star",
    emoji: "📸",
    title: "การเป็นดารา (Show Profile)",
    tag: "Creator / Influencer",
    highlight: "อยากขึ้นบิลบอร์ด อยากมีโปรไฟล์ปัง ๆ ในแมพ เริ่มจากตรงนี้เลย",
    content: (
      <>
        <p className="text-sm text-pink-100/90">
          เหมาะสำหรับคนที่อยากมีตัวตนใน Sweet Paradise แบบเต็มระบบ
          มีโปรไฟล์ มีที่ยืน มีคนส่งโดเนทให้ ⭐
        </p>

        <div className="mt-3 space-y-2 text-sm text-pink-100/90">
          <div>
            <p className="font-semibold text-pink-200">เงื่อนไขเบื้องต้น</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>ทักหาแอดมินใน Discord ได้เลยเพื่อสมัครเป็นดารา</li>
              <li>
                ต้องโดเนทขั้นต่ำ{" "}
                <span className="font-semibold text-pink-300">
                  50,000 SweetDollar
                </span>{" "}
                เพื่อเริ่มเป็นดารา
              </li>
              <li>
                หากจะโดเนทเพิ่ม{" "}
                <span className="font-semibold text-pink-300">
                  บิทละ 10,000 SweetDollar
                </span>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-pink-200">กติกาเรื่องการโดเนท</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>ทุกคนสามารถโดเนทให้ใครก็ได้ที่เป็นดาราอยู่แล้ว</li>
              <li>
                <span className="font-semibold">
                  เจ้าของเงินโดเนทต้องเป็นคนติดต่อแอดมินเองเท่านั้น
                </span>{" "}
                เพื่อความชัดเจนและป้องกันดราม่า
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-pink-200">ข้อมูล / รูปภาพที่ใช้</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>
                รูปภาพและข้อมูลทั้งหมด{" "}
                <span className="font-semibold">
                  ต้องเป็นเจ้าตัวติดต่อมาเองเท่านั้น
                </span>
              </li>
              <li>ไม่รับข้อมูลผ่านคนกลาง เพื่อความปลอดภัยของทุกคน</li>
            </ul>
          </div>

          <div className="mt-3 rounded-2xl border border-pink-500/40 bg-pink-500/10 p-3 text-xs text-pink-100">
            <p className="font-semibold text-pink-200">วิธีสมัคร</p>
            <p className="mt-1">
              ส่งข้อมูลทั้งหมดมาใน Discord ส่วนตัวของแอดมิน
              (OC/IC/รูป/แคปชั่น/หลักฐานโดเนท) แล้วรอแอดมินจัดลงหน้าโปรไฟล์ให้ 💖
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "robux",
    emoji: "💎",
    title: "การเติมโรบัค เรท 4 (ปลอดภัย ไม่ใช้ไอดี/พาสเวิร์ด)",
    tag: "Top Up Robux",
    highlight: "ระบบเติม Robux ที่เน้นความปลอดภัย ไม่ขอรหัส ไม่ขอไอดีเข้าเครื่อง",
    content: (
      <>
        <p className="text-sm text-pink-100/90">
          สายเติมจริงจัง แต่อยากปลอดภัย — ระบบนี้ไม่ใช้รหัส Roblox
          ของผู้เล่นในการล็อกอินเด็ดขาด
        </p>

        <div className="mt-3 space-y-3 text-sm text-pink-100/90">
          <div>
            <p className="font-semibold text-pink-200">ขั้นตอนเตรียมตัว</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>
                เข้าร่วมชุมชนให้ครบ{" "}
                <span className="font-semibold text-pink-300">14 วัน</span>{" "}
                ที่นี่:{" "}
                <a
                  href="https://www.roblox.com/th/communities/1099717829/Boat-Note-Gaming"
                  target="_blank"
                  rel="noreferrer"
                  className="text-pink-300 underline underline-offset-2"
                >
                  Boat Note Gaming Community
                </a>
              </li>
              <li>
                เช็คใน Discord ว่ามีรายชื่อครบ 14 วันแล้วหรือยัง
                ที่ห้อง{" "}
                <span className="font-mono text-pink-200">
                  รายชื่อคนเข้าชุมชนครบ14วันแล้ว
                </span>{" "}
                :{" "}
                <a
                  href="https://discord.com/channels/1404708295549259897/1420234005588217948"
                  target="_blank"
                  rel="noreferrer"
                  className="text-pink-300 underline underline-offset-2"
                >
                  ลิงก์ห้อง Discord
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-pink-200">
              เมื่อผ่านเงื่อนไข และต้องการเติม Robux
            </p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>เช็คยอดคงเหลือของ Robux ใน Discord ก่อน</li>
              <li>ทัก Discord ส่วนตัวแอดมิน</li>
              <li>
                แจ้งว่าต้องการ{" "}
                <span className="font-semibold text-pink-300">
                  เติมกี่ Robux หรือกี่บาท
                </span>
              </li>
            </ul>

            <div className="mt-2 rounded-2xl bg-black/50 p-3 text-xs text-pink-100">
              <p className="font-semibold text-pink-200">
                สูตรคำนวณง่าย ๆ (เรท 4)
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>
                  ถ้ารู้จำนวน Robux ที่อยากได้:{` `}
                  <span className="font-mono text-pink-100">
                    โรบัค ÷ 4 = เงินที่ต้องจ่าย
                  </span>{" "}
                  <br />
                  เช่น <span className="font-mono">800 ÷ 4 = 200 บาท</span>
                </li>
                <li>
                  ถ้ามีงบในใจ แต่อยากรู้ว่าจะได้กี่ Robux:{` `}
                  <span className="font-mono text-pink-100">
                    เงิน × 4 = โรบัคที่จะได้
                  </span>{" "}
                  <br />
                  เช่น <span className="font-mono">200 × 4 = 800 Robux</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <p className="font-semibold text-pink-200">ขั้นตอนการจ่ายเงิน</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>แอดมินจะส่ง QR Code ให้สแกนจ่าย</li>
              <li>เมื่อจ่ายแล้ว ส่งสลิป + ไอดีตัวละครให้แอดมินใน Discord</li>
              <li>
                ก่อนเติม แอดมินจะส่งรูปยืนยัน{" "}
                <span className="font-semibold">
                  จำนวน Robux และไอดีตัวละคร
                </span>{" "}
                ให้ตรวจเช็คอีกครั้ง
              </li>
              <li>
                ยืนยันเรียบร้อยแล้ว รอแอดมินแจ้งเช็คยอด Robux
                ว่าเข้าสำเร็จแล้วหรือยัง
              </li>
            </ul>
          </div>

          <div className="mt-3 rounded-2xl border border-emerald-400/50 bg-emerald-500/10 p-3 text-xs text-emerald-50">
            <p className="font-semibold">ความปลอดภัย</p>
            <p className="mt-1">
              ระบบนี้ <span className="font-semibold">ไม่ขอรหัสผ่าน Roblox</span>
              , ไม่ล็อกอินเข้าไอดีของผู้เล่น
              ใช้วิธีเติมแบบปลอดภัยเท่าที่เป็นไปได้ในระบบของ Roblox เอง ✅
            </p>
          </div>
        </div>
      </>
    ),
  },
];

function GuideItem({ section, open, onToggle }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-black/80 transition ${
        open
          ? "border-pink-400/80 shadow-lg shadow-pink-500/40"
          : "border-pink-500/30 hover:border-pink-400/70 hover:shadow-pink-500/30"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left md:px-5 md:py-4"
        aria-expanded={open}
      >
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-500 text-lg">
          {section.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-semibold text-pink-50 md:text-base">
              {section.title}
            </h2>
            <span className="rounded-full bg-pink-500/15 px-2 py-0.5 text-[11px] font-medium text-pink-200">
              {section.tag}
            </span>
          </div>
          <p className="mt-1 line-clamp-2 text-[11px] text-pink-200/85 md:text-xs">
            {section.highlight}
          </p>
        </div>
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pink-500/15 text-pink-200">
          {open ? "−" : "+"}
        </div>
      </button>

      {/* content */}
      {open && (
        <div className="border-t border-pink-500/20 px-4 py-3 md:px-5 md:py-4">
          {section.content}
        </div>
      )}
    </div>
  );
}

export default function ManualPage() {
  const [openId, setOpenId] = useState("song"); // เปิดหัวข้อแรกไว้ก่อน

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      {/* BG */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-pink-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-fuchsia-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        {/* Header */}
        <header className="mb-6 text-center md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/60 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            Sweet Paradise • Manual
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
            คู่มือ Sweet Paradise{" "}
            <span className="text-pink-300">สำหรับสายจริงจัง</span>
          </h1>
          <p className="mt-3 text-sm text-pink-100/85 md:text-base">
            รวมวิธีลงเพลง การเป็นดารา และการเติม Robux แบบปลอดภัย
            กดเลือกหัวข้อที่อยากอ่านได้เลย 🍭
          </p>
        </header>

        <main className="space-y-4 md:space-y-5">
          {SECTIONS.map((sec) => (
            <GuideItem
              key={sec.id}
              section={sec}
              open={openId === sec.id}
              onToggle={() => setOpenId(openId === sec.id ? null : sec.id)}
            />
          ))}
        </main>

        <footer className="mt-6 text-center text-[12px] text-pink-200/80 md:mt-8 md:text-sm">
          หากมีข้อสงสัยเพิ่มเติม ทักถามแอดมินใน Discord ได้ตลอดเวลา
          แต่อย่าลืมอ่านคู่มือก่อนนะ จะได้ไม่พลาดสิทธิ์ดี ๆ 💬
        </footer>
      </div>
    </div>
  );
}
