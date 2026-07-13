"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const GAME_URL = "https://www.roblox.com/th/games/115633751220614/Sweet-paradise";

const navGroups = [
  { label: "หน้าแรก", href: "/", icon: "🏠" },
  { label: "สั่งซื้อเกมพาส", href: "/buypass", icon: "🛒", cta: true },
  {
    label: "ระบบเกม",
    icon: "🎮",
    items: [
      { href: "/fishing", label: "ตกปลา", icon: "🎣", desc: "ปลา 90+ ชนิด เรตดรอป" },
      { href: "/fishclash", label: "ศึกปลา", icon: "⚔️", desc: "PvP ออโต้จากปลาที่ตกได้" },
      { href: "/boss", label: "บอสโลก", icon: "🐉", desc: "ตีบอสร่วมเซิร์ฟ" },
      { href: "/farm", label: "ฟาร์ม", icon: "🌾", desc: "เก็บเกี่ยวผลผลิต" },
      { href: "/pets", label: "สัตว์เลี้ยง", icon: "🐾", desc: "7 ตัว สกิลบัฟ" },
    ],
  },
  {
    label: "คราฟ & สุ่ม",
    icon: "🎰",
    items: [
      { href: "/craft", label: "สูตรคราฟ", icon: "🛠️", desc: "23 สูตร โต๊ะคราฟ" },
      { href: "/gacha", label: "กาชา", icon: "🎁", desc: "อัตราออกทุก pool" },
      { href: "/wheel", label: "วงล้อรายวัน", icon: "🎡", desc: "หมุนฟรีวันละครั้ง" },
      { href: "/lucky", label: "ลอตเตอรี่", icon: "🍀", desc: "หวยรายสัปดาห์" },
      { href: "/crafteffect", label: "คราฟเอฟเฟค", icon: "✨", desc: "เอฟเฟครอยเท้า" },
    ],
  },
  {
    label: "กิจกรรม",
    icon: "🎉",
    items: [
      { href: "/schedule", label: "ตารางกิจกรรม", icon: "🗓️", desc: "เวลากิจกรรมประจำ" },
      { href: "/event", label: "อีเวนต์เทศกาล", icon: "🎊", desc: "อีเวนต์ตามช่วง" },
      { href: "/referral", label: "ชวนเพื่อน", icon: "👥", desc: "รางวัลเชิญเพื่อน" },
    ],
  },
  {
    label: "ตลาด & ชุมชน",
    icon: "🏬",
    items: [
      { href: "/shop", label: "ร้านค้า NPC", icon: "🏪", desc: "ซื้อของด้วยเงินในเกม" },
      { href: "/marketplace", label: "ตลาดฝากขาย", icon: "🏬", desc: "ซื้อขายผู้เล่น" },
      { href: "/family", label: "ครอบครัว & คู่รัก", icon: "👨‍👩‍👧", desc: "ข้อมูลสด + อันดับ" },
      { href: "/poi", label: "จุดน่าสนใจ", icon: "📍", desc: "บวช/ATM/ดูดวง/เทรด" },
      { href: "/marketitems", label: "เจ้าของไอเทม", icon: "🏷️", desc: "ใครถืออะไรบ้าง" },
    ],
  },
  {
    label: "ข้อมูล",
    icon: "📚",
    items: [
      { href: "/items", label: "ไอเท็ม", icon: "🎒", desc: "ไอเทมทั้งหมด" },
      { href: "/phone", label: "โทรศัพท์", icon: "📱", desc: "ฟีเจอร์มือถือ" },
      { href: "/song", label: "เพลง", icon: "🎵", desc: "รายชื่อเพลง" },
      { href: "/map", label: "แผนที่", icon: "🗺️", desc: "โซนในแมพ" },
      { href: "/manual", label: "คู่มือ", icon: "📖", desc: "วิธีเล่น" },
      { href: "/rule", label: "กฏ", icon: "📜", desc: "กฎการเล่น" },
    ],
  },
];

function isGroupActive(group, pathname) {
  if (group.href) return pathname === group.href;
  return (group.items || []).some((it) => it.href === pathname);
}

export default function Nav() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ปิด dropdown/เมนูมือถือเมื่อเปลี่ยนหน้า
  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* glass bar */}
      <div className="border-b border-pink-500/25 bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-black/60">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-4 py-2.5">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative h-10 w-10 overflow-hidden rounded-2xl border border-pink-400/40 bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 shadow-lg shadow-pink-500/40 transition group-hover:shadow-pink-400/60">
              <img src="/images/smalllogo.png" alt="Sweet Paradise" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="bg-gradient-to-r from-pink-300 via-fuchsia-200 to-rose-300 bg-clip-text text-sm font-bold tracking-wide text-transparent">
                Sweet Paradise
              </span>
              <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-pink-500/70">
                Roblox Hub
              </span>
            </div>
          </Link>

          {/* Desktop groups */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {navGroups.map((group) => {
              const active = isGroupActive(group, pathname);
              if (group.href) {
                if (group.cta) {
                  return (
                    <Link
                      key={group.label}
                      href={group.href}
                      className={
                        "flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-semibold transition hover:-translate-y-0.5 " +
                        (active
                          ? "border-amber-300 bg-gradient-to-r from-amber-400 to-pink-500 text-black shadow-lg shadow-pink-500/40"
                          : "border-amber-300/70 bg-gradient-to-r from-amber-400/90 to-pink-500/90 text-black shadow-md shadow-pink-500/30 hover:shadow-pink-400/50")
                      }
                    >
                      <span className="text-base">{group.icon}</span>
                      {group.label}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={group.label}
                    href={group.href}
                    className={
                      "flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition " +
                      (active
                        ? "bg-pink-500/20 text-pink-200"
                        : "text-gray-200 hover:bg-white/5 hover:text-pink-200")
                    }
                  >
                    <span className="text-base">{group.icon}</span>
                    {group.label}
                  </Link>
                );
              }
              const isOpen = openGroup === group.label;
              return (
                <div key={group.label} className="relative">
                  <button
                    onClick={() => setOpenGroup(isOpen ? null : group.label)}
                    className={
                      "flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition " +
                      (active || isOpen
                        ? "bg-pink-500/20 text-pink-200"
                        : "text-gray-200 hover:bg-white/5 hover:text-pink-200")
                    }
                  >
                    <span className="text-base">{group.icon}</span>
                    {group.label}
                    <span className={"text-[10px] transition " + (isOpen ? "rotate-180" : "")}>▾</span>
                  </button>

                  {isOpen && (
                    <div className="absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-pink-500/30 bg-black/95 p-1.5 shadow-2xl shadow-pink-500/20 backdrop-blur-xl">
                      {group.items.map((it) => {
                        const itemActive = pathname === it.href;
                        return (
                          <Link
                            key={it.href}
                            href={it.href}
                            className={
                              "flex items-center gap-3 rounded-xl px-3 py-2.5 transition " +
                              (itemActive ? "bg-pink-500/20" : "hover:bg-white/5")
                            }
                          >
                            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500/25 to-fuchsia-500/15 text-lg">
                              {it.icon}
                            </span>
                            <span className="min-w-0">
                              <span className={"block text-sm font-medium " + (itemActive ? "text-pink-200" : "text-gray-100")}>
                                {it.label}
                              </span>
                              {it.desc && <span className="block truncate text-[11px] text-pink-300/60">{it.desc}</span>}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <a
              href={GAME_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-pink-500/40 transition hover:-translate-y-0.5 hover:shadow-pink-400/60 sm:flex"
            >
              ▶ เข้าเกม
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-pink-500/40 text-pink-200 transition hover:bg-pink-500/10 lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              <div className="flex flex-col gap-1.5">
                <span className={"block h-[2px] w-5 rounded-full bg-pink-300 transition " + (mobileOpen ? "translate-y-[7px] rotate-45" : "")} />
                <span className={"block h-[2px] w-5 rounded-full bg-pink-300 transition " + (mobileOpen ? "opacity-0" : "")} />
                <span className={"block h-[2px] w-5 rounded-full bg-pink-300 transition " + (mobileOpen ? "-translate-y-[7px] -rotate-45" : "")} />
              </div>
            </button>
          </div>
        </nav>
      </div>
      {/* accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500/60 to-transparent" />

      {/* backdrop for desktop dropdown */}
      {openGroup && (
        <button
          aria-hidden
          tabIndex={-1}
          className="fixed inset-0 -z-10 hidden cursor-default lg:block"
          onClick={() => setOpenGroup(null)}
        />
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-pink-500/30 bg-black/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto max-w-3xl space-y-4 px-4 py-4">
            {navGroups.map((group) => {
              if (group.href) {
                const active = pathname === group.href;
                if (group.cta) {
                  return (
                    <Link
                      key={group.label}
                      href={group.href}
                      className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 px-3 py-2.5 text-sm font-semibold text-black shadow-lg shadow-pink-500/30"
                    >
                      <span className="text-base">{group.icon}</span>
                      {group.label}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={group.label}
                    href={group.href}
                    className={
                      "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium " +
                      (active ? "bg-pink-500/20 text-pink-200" : "text-gray-100 hover:bg-white/5")
                    }
                  >
                    <span className="text-base">{group.icon}</span>
                    {group.label}
                  </Link>
                );
              }
              return (
                <div key={group.label}>
                  <p className="mb-1.5 flex items-center gap-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-pink-400/70">
                    <span>{group.icon}</span>
                    {group.label}
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {group.items.map((it) => {
                      const active = pathname === it.href;
                      return (
                        <Link
                          key={it.href}
                          href={it.href}
                          className={
                            "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition " +
                            (active ? "bg-pink-500/20 text-pink-200" : "text-gray-100 hover:bg-white/5")
                          }
                        >
                          <span className="text-base">{it.icon}</span>
                          <span className="truncate">{it.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <a
              href={GAME_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 px-4 py-2.5 text-sm font-semibold text-black shadow-lg shadow-pink-500/40"
            >
              ▶ เข้าเกม Sweet Paradise
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
