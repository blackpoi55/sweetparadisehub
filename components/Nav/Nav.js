"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
    { href: "/", label: "หน้าแรก" },
    { href: "/items", label: "ไอเท็ม & Pass" },
    // { href: "/Pass", label: "Pass" },
    // { href: "/tricks", label: "ทริคเล่นเกม" },
    // { href: "/fishing", label: "ตกปลา" },
    // { href: "/players", label: "ข้อมูลผู้เล่น" },
];

export default function Nav() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-pink-500/40 bg-black/90 backdrop-blur">
            <nav className="mx-auto flex w-full items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={() => setOpen(false)}
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 text-xs font-bold text-black shadow-lg">
                        <img src="/images/smalllogo.png" alt="" />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-sm font-semibold tracking-wide text-pink-300">
                            Sweet Paradise
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-pink-500/80">
                            Roblox Map Hub
                        </span>
                    </div>
                </Link>

                {/* Desktop menu */}
                <div className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={[
                                    "rounded-full px-3 py-1 text-sm transition",
                                    active
                                        ? "bg-pink-500 text-black shadow-md"
                                        : "text-gray-200 hover:bg-pink-500/10 hover:text-pink-300",
                                ].join(" ")}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    
                </div>

                {/* Mobile toggle */}
                <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-pink-500/50 text-pink-200 md:hidden"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Toggle navigation"
                >
                    <span className="sr-only">Toggle navigation</span>
                    <div className="flex flex-col gap-1.5">
                        <span className="block h-[2px] w-5 rounded-full bg-pink-300" />
                        <span className="block h-[2px] w-4 rounded-full bg-pink-400" />
                        <span className="block h-[2px] w-3 rounded-full bg-pink-500" />
                    </div>
                </button>
            </nav>

            {/* Mobile menu */}
            {open && (
                <div className="border-t border-pink-500/30 bg-black/95 md:hidden">
                    <div className="mx-auto max-w-6xl px-4 py-3 space-y-1">
                        {navItems.map((item) => {
                            const active = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={[
                                        "block rounded-lg px-3 py-2 text-sm transition",
                                        active
                                            ? "bg-pink-500 text-black shadow"
                                            : "text-gray-200 hover:bg-pink-500/10 hover:text-pink-300",
                                    ].join(" ")}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </header>
    );
}
