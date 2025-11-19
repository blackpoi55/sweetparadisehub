"use client";

import { useState } from "react";
import { shoeprofile } from "@/json/showprofile";

const LOLLIPOP_PLACEHOLDER = "/images/showprofile/lollipop.png";

/* ----------------- Helpers ----------------- */

function isAdminProfile(p) {
  return (p.role || "").toString().toLowerCase() === "admin";
}

function safeText(v) {
  const s = (v ?? "").toString().trim();
  return s === "" ? "-" : s;
}

function formatDonateAmount(amount) {
  const num = Number(amount || 0);
  if (Number.isNaN(num) || num <= 0) return "-";
  return num.toLocaleString("th-TH");
}

function SocialLinkButton({ type, url, size = "normal" }) {
  const hasUrl = !!url && url.trim() !== "";
  const label =
    type === "facebook"
      ? "Facebook"
      : type === "instagram"
        ? "Instagram"
        : "TikTok";
  const icon = type === "facebook" ? "📘" : type === "instagram" ? "📸" : "🎵";

  const baseSize =
    size === "small"
      ? "px-1.5 py-0.5 text-[11px]"
      : "px-3 py-1 text-[11px] md:text-xs";

  const activeClass =
    "inline-flex items-center gap-1 rounded-full bg-black/70 hover:bg-pink-500/25 border border-pink-400/60 text-pink-100 transition";
  const disabledClass =
    "inline-flex items-center gap-1 rounded-full bg-slate-800/70 border border-slate-600/70 text-slate-400 cursor-not-allowed";

  if (!hasUrl) {
    return (
      <span className={`${baseSize} ${disabledClass}`} aria-disabled="true">
        <span>{icon}</span>
        <span>{label}</span>
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`${baseSize} ${activeClass}`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </a>
  );
}

/* ----------------- Main Page ----------------- */

export default function ShowProfilePage() {
  const [preview, setPreview] = useState(null); // { src, alt } | null
  const [donateModal, setDonateModal] = useState(null); // { profile, total, items }
  const [donorSummaryModal, setDonorSummaryModal] = useState(null); // { total, items }

  const openPreview = (src, alt) => {
    if (!src) return;
    setPreview({ src, alt: alt || "" });
  };
  const closePreview = () => setPreview(null);

  // สร้าง list admin / member + คำนวณยอดโดเนทรวมต่อคน
  const adminProfiles = shoeprofile.filter((p) => isAdminProfile(p));

  const memberProfiles = shoeprofile
    .filter((p) => !isAdminProfile(p))
    .map((p) => {
      const donations = Array.isArray(p.donate) ? p.donate : [];
      const donateAmount = donations.reduce(
        (sum, d) => sum + (Number(d.donate) || 0),
        0
      );
      return {
        ...p,
        donateAmount,
      };
    })
    .sort((a, b) => b.donateAmount - a.donateAmount);

  // ✅ ยอดโดเนทรวมของสายเปย์ทั้งหมด (ไม่รวมแอดมิน)
  const totalDonate = memberProfiles.reduce(
    (sum, p) => sum + (p.donateAmount || 0),
    0
  );

  const podium = memberProfiles.slice(0, 3);
  const others = memberProfiles.slice(3);

  // เปิด Modal ดูรายละเอียดว่า "ใครโดเนทให้คนนี้" (ต่อโปรไฟล์)
  const openDonateModal = (profile) => {
    const raw = Array.isArray(profile.donate) ? profile.donate : [];

    const aggregate = new Map();
    for (const d of raw) {
      const who = (d.whodonate || "-").toString();
      const amt = Number(d.donate) || 0;
      if (!amt) continue;
      aggregate.set(who, (aggregate.get(who) || 0) + amt);
    }

    const items = Array.from(aggregate.entries())
      .map(([who, amount]) => ({ who, amount }))
      .sort((a, b) => b.amount - a.amount);

    const total =
      profile.donateAmount ||
      items.reduce((sum, it) => sum + (it.amount || 0), 0);

    setDonateModal({
      profile: {
        ocname: profile.ocname,
        icname: profile.icname,
        icid: profile.icid,
      },
      total,
      items,
    });
  };

  const closeDonateModal = () => setDonateModal(null);

  // ⭐ เปิด Modal สรุป "คนที่โดเนททั้งหมด" (รวมทุกโปรไฟล์)
  const openDonorSummaryModal = () => {
    const aggregate = new Map();

    for (const p of shoeprofile) {
      const donations = Array.isArray(p.donate) ? p.donate : [];
      for (const d of donations) {
        const who = (d.whodonate || "-").toString();
        const amt = Number(d.donate) || 0;
        if (!amt) continue;
        aggregate.set(who, (aggregate.get(who) || 0) + amt);
      }
    }

    const items = Array.from(aggregate.entries())
      .map(([who, amount]) => ({ who, amount }))
      .sort((a, b) => b.amount - a.amount);

    const total = items.reduce((sum, it) => sum + (it.amount || 0), 0);

    setDonorSummaryModal({ total, items });
  };

  const closeDonorSummaryModal = () => setDonorSummaryModal(null);

  return (
    <>
      <div className="relative min-h[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
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
              Sweet Paradise • Profile
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
              โปรไฟล์ผู้เล่น &amp; ผู้สนับสนุน{" "}
              <span className="text-pink-300">Sweet Paradise</span>
            </h1>
            <p className="mt-3 text-sm text-pink-100/85 md:text-base">
              ติดต่อแอดมินเพื่อมาเป็นดารา เริ่มต้นที่ 50K SweetDollar 💖
            </p>
          </header>

          {/* Admin Section */}
          {adminProfiles.length > 0 && (
            <section className="mb-8 md:mb-10">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-500 text-lg">
                  👑
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-pink-50 md:text-base">
                    ผู้สร้าง / แอดมินหลักของ Sweet Paradise
                  </h2>
                  <p className="text-[11px] text-pink-200/80 md:text-xs">
                    คนที่ชอบแมพแฮงเอาต์จนต้องสร้างโลกของตัวเองขึ้นมา
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {adminProfiles.map((p, idx) => {
                  const ocSrc = p.ocimage || LOLLIPOP_PLACEHOLDER;
                  const icSrc = p.icimage || LOLLIPOP_PLACEHOLDER;

                  return (
                    <article
                      key={`admin-${idx}-${p.icid || p.icname || p.ocname || "x"}`}
                      className="group relative overflow-hidden rounded-2xl border border-pink-400/80 bg-gradient-to-br from-pink-500/20 via-black to-slate-950 p-4 text-sm text-pink-50 shadow-pink-500/40 transition hover:-translate-y-1 hover:shadow-xl md:p-5"
                    >
                      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-pink-500/30 blur-3xl" />
                      <div className="relative flex flex-col gap-4 md:flex-row md:items-center">
                        {/* Avatar Zone */}
                        <div className="relative mx-auto flex-shrink-0">
                          <div className="relative h-32 w-32 md:h-36 md:w-36">
                            {/* OC */}
                            <button
                              type="button"
                              onClick={() =>
                                openPreview(
                                  ocSrc,
                                  `OC: ${safeText(p.ocname)} / IC: ${safeText(
                                    p.icname
                                  )}`
                                )
                              }
                              className="h-full w-full overflow-hidden rounded-2xl border border-pink-300/70 bg-black/80 shadow-md shadow-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-400"
                            >
                              <img
                                src={ocSrc}
                                alt={p.ocname}
                                className="h-full w-full object-cover"
                              />
                            </button>

                            {/* IC */}
                            <button
                              type="button"
                              onClick={() =>
                                openPreview(
                                  icSrc,
                                  `IC: ${safeText(p.icname)} (${safeText(
                                    p.icid
                                  )})`
                                )
                              }
                              className="absolute -bottom-1 -right-1 h-14 w-14 overflow-hidden rounded-xl border-2 border-black bg-black/90 shadow shadow-pink-500/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                            >
                              <img
                                src={icSrc}
                                alt={p.icname}
                                className="h-full w-full object-cover"
                              />
                            </button>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 space-y-2">
                          <div className="inline-flex items-center gap-2 rounded-full bg-pink-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-pink-50">
                            Admin / Creator
                          </div>
                          <div className="grid grid-cols-[auto,1fr] gap-x-2 gap-y-1 text-[13px] text-pink-100/90">
                            <span className="text-pink-200/80">
                              ชื่อ OC:{safeText(p.ocname)}
                            </span>

                            <span className="text-pink-200/80">
                              ชื่อ IC:{safeText(p.icname)}
                            </span>

                            <span className="text-pink-200/80">
                              ID:{safeText(p.icid)}
                            </span>

                            <span className="text-pink-200/80">
                              แคปชั่น:{safeText(p.caption)}
                            </span>

                            <span className="text-pink-200/80">
                              สถานะ:{safeText(p.role) || "Admin"}
                            </span>
                          </div>

                          {/* Social */}
                          <div className="pt-2">
                            <p className="mb-1 text-[11px] text-pink-200/80">
                              โซเชียล:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <SocialLinkButton
                                type="facebook"
                                url={p.facebookurl}
                              />
                              <SocialLinkButton
                                type="instagram"
                                url={p.instagramurl}
                              />
                              <SocialLinkButton
                                type="tiktok"
                                url={p.tiktokurl}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {/* Donator Ranking */}
          <section>
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-pink-500 to-fuchsia-500 text-lg">
                🏆
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold text-pink-50 md:text-base">
                  อันดับสายเปย์ / ผู้สนับสนุนแมพ
                </h2>
                <p className="text-[11px] text-pink-200/80 md:text-xs">
                  เรียงตามยอดโดเนทจากสูงไปต่ำ อันดับ 1–3 ขึ้นแท่นรับรางวัล
                  คนที่ 4 เป็นต้นไปต่อแถวด้านล่าง
                </p>

                {/* ✅ ยอดโดเนทรวมทั้งหมด + ปุ่มดูสรุปผู้โดเนท */}
                {totalDonate > 0 && (
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <p className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-3 py-1 text-[11px] font-medium text-amber-200 md:text-xs">
                      <span>✨</span>
                      <span>
                        ยอดโดเนทรวมทั้งหมด:{" "}
                        <span className="font-semibold text-amber-300">
                          {formatDonateAmount(totalDonate)}
                        </span>{" "}
                        SweetDollar
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={openDonorSummaryModal}
                      className="text-[11px] md:text-xs rounded-full border border-pink-400/70 bg-black/60 px-3 py-1 font-medium text-pink-100 hover:bg-pink-500/20 hover:text-white transition"
                    >
                      ดูผู้โดเนททั้งหมด
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Podium 1–3 */}
            {podium.length > 0 ? (
              <div className="mb-6 rounded-2xl border border-pink-500/40 bg-black/85 px-3 py-5 md:px-5">
                <div className="mb-4 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-pink-200/80">
                  Top Donators
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* อันดับ 2 — mobile ให้เป็นลำดับที่ 2, desktop ซ้ายมือ (ลำดับ 1) */}
                  {podium[1] && (
                    <div className="order-2 md:order-1">
                      <PodiumCard
                        rank={2}
                        profile={podium[1]}
                        openPreview={openPreview}
                        openDonateModal={openDonateModal}
                      />
                    </div>
                  )}

                  {/* อันดับ 1 — mobile ให้เป็นลำดับที่ 1, desktop อยู่กลาง (ลำดับ 2) */}
                  {podium[0] && (
                    <div className="order-1 md:order-2">
                      <PodiumCard
                        rank={1}
                        profile={podium[0]}
                        highlight
                        openPreview={openPreview}
                        openDonateModal={openDonateModal}
                      />
                    </div>
                  )}

                  {/* อันดับ 3 — mobile/desktop ลำดับที่ 3 เหมือนเดิม */}
                  {podium[2] && (
                    <div className="order-3 md:order-3">
                      <PodiumCard
                        rank={3}
                        profile={podium[2]}
                        openPreview={openPreview}
                        openDonateModal={openDonateModal}
                      />
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="mb-6 rounded-2xl border border-pink-500/40 bg-black/80 px-4 py-5 text-center text-sm text-pink-100/80">
                ยังไม่มีข้อมูลสายเปย์ตอนนี้… ไว้จะมีป้ายไฟให้ทุกคนแน่นอน 💸
              </div>
            )}

            {/* Others 4+ */}
            {others.length > 0 && (
              <div className="rounded-2xl border border-pink-500/30 bg-black/85 p-4 md:p-5">
                <h3 className="mb-3 text-xs font-semibold text-pink-100 md:text-sm">
                  สมาชิกคนอื่น ๆ (อันดับ 4 เป็นต้นไป)
                </h3>
                <ul className="space-y-3">
                  {others.map((p, idx) => {
                    const rank = idx + 4;
                    const ocSrc = p.ocimage || LOLLIPOP_PLACEHOLDER;
                    const icSrc = p.icimage || LOLLIPOP_PLACEHOLDER;

                    return (
                      <li
                        key={`member-${idx}-${p.icid || p.icname || p.ocname || "x"}`}
                        className="group flex flex-col gap-3 rounded-2xl border border-pink-500/25 bg-black/80 px-3 py-2.5 text-xs text-pink-50 shadow-sm transition hover:-translate-y-0.5 hover:border-pink-400/70 hover:shadow-pink-500/40 md:flex-row md:items-center md:px-4 md:py-3 md:text-sm"
                      >
                        {/* Rank + รูป OC+IC */}
                        <div className="flex items-center gap-2 flex-shrink-0 md:flex-col md:items-center md:gap-1">
                          <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500/60 to-fuchsia-500/60 text-[12px] font-bold text-black">
                            #{rank}
                          </div>
                          <div className="relative h-14 w-14 md:h-16 md:w-16">
                            {/* OC */}
                            <button
                              type="button"
                              onClick={() =>
                                openPreview(
                                  ocSrc,
                                  `OC: ${safeText(p.ocname)} / IC: ${safeText(p.icname)}`
                                )
                              }
                              className="h-full w-full overflow-hidden rounded-2xl border border-pink-300/70 bg-black/80 shadow-md shadow-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-400"
                            >
                              <img
                                src={ocSrc}
                                alt={p.ocname}
                                className="h-full w-full object-cover"
                              />
                            </button>

                            {/* IC */}
                            <button
                              type="button"
                              onClick={() =>
                                openPreview(
                                  icSrc,
                                  `IC: ${safeText(p.icname)} (${safeText(p.icid)})`
                                )
                              }
                              className="absolute -bottom-1 -right-1 h-6 w-6 overflow-hidden rounded-xl border-2 border-black bg-black/90 shadow shadow-pink-500/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                            >
                              <img
                                src={icSrc}
                                alt={p.icname}
                                className="h-full w-full object-cover"
                              />
                            </button>
                          </div>
                        </div>

                        {/* ข้อมูลตัวละคร */}
                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <div className="font-medium text-pink-50">
                            {safeText(p.ocname)}
                          </div>
                          <div className="text-[11px] text-pink-200/85">
                            IC: {safeText(p.icname)} · ID:{" "}
                            <span className="font-mono">
                              {safeText(p.icid)}
                            </span>
                          </div>
                          <div className="text-[11px] text-pink-200/90">
                            แคปชั่น:{" "}
                            <span className="text-pink-100/90">
                              {safeText(p.caption)}
                            </span>
                          </div>
                        </div>

                        {/* Donate + Social */}
                        <div className="flex flex-col items-start gap-1 text-[11px] text-pink-200/80 md:items-end">
                          <button
                            type="button"
                            onClick={() => openDonateModal(p)}
                            className="rounded-full bg-pink-500/15 px-2 py-0.5 font-semibold text-pink-100 hover:bg-pink-500/30 hover:text-white transition"
                          >
                            {formatDonateAmount(p.donateAmount)}{" "}
                            {p.donateAmount > 0 && "SweetDollar"}
                          </button>
                          <div className="flex gap-1">
                            <SocialLinkButton
                              type="facebook"
                              url={p.facebookurl}
                              size="small"
                            />
                            <SocialLinkButton
                              type="instagram"
                              url={p.instagramurl}
                              size="small"
                            />
                            <SocialLinkButton
                              type="tiktok"
                              url={p.tiktokurl}
                              size="small"
                            />
                          </div>
                        </div>
                      </li>

                    );
                  })}
                </ul>
              </div>
            )}
          </section>

          {/* Footer text */}
          <div className="mt-6 text-center text-[12px] text-pink-200/80 md:text-sm">
            ไม่ว่าจะโดเนทมากหรือน้อย หรือแค่เข้ามานั่งเล่นตกปลา
            ทุกคนคือส่วนหนึ่งของ Sweet Paradise 💝
          </div>
        </div>
      </div>

      {/* Lightbox Preview */}
      {preview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm"
          onClick={closePreview}
        >
          <div
            className="relative max-h-[80vh] max-w-[90vw] rounded-3xl border border-pink-400/70 bg-black/90 p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={preview.src}
              alt={preview.alt}
              className="max-h-[70vh] max-w-[85vw] rounded-2xl object-contain"
            />
            {preview.alt && (
              <div className="mt-2 text-center text-[11px] text-pink-100/90">
                {preview.alt}
              </div>
            )}
            <button
              type="button"
              onClick={closePreview}
              className="absolute -top-3 -right-3 rounded-full border border-pink-400/80 bg-black/90 px-2 py-1 text-[11px] text-pink-100 shadow-md shadow-pink-500/60 hover:bg-pink-500/20"
            >
              ปิด
            </button>
          </div>
        </div>
      )}

      {/* Donate Detail Modal (ต่อ 1 โปรไฟล์) */}
      {donateModal && (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={closeDonateModal}
        >
          <div
            className="relative max-h-[80vh] w-full max-w-md overflow-hidden rounded-3xl border border-pink-400/80 bg-gradient-to-b from-slate-950 via-black to-slate-950 p-4 md:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
                Donation Detail
              </p>
              <h2 className="mt-1 text-sm font-bold text-pink-50 md:text-base">
                รายละเอียดการโดเนทของ {safeText(donateModal.profile.ocname)}
              </h2>
              <p className="mt-1 text-[11px] text-pink-200/85">
                IC: {safeText(donateModal.profile.icname)} (
                {safeText(donateModal.profile.icid)})
              </p>
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-3 py-1 text-[11px] font-medium text-amber-200">
                <span>💖 ยอดรวม :</span>
                <span className="font-semibold text-amber-300">
                  {formatDonateAmount(donateModal.total)}
                </span>
                <span>SweetDollar</span>
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto rounded-2xl bg-black/60 p-3">
              {donateModal.items.length === 0 ? (
                <div className="py-6 text-center text-[12px] text-pink-200/80">
                  ยังไม่มีข้อมูลโดเนทสำหรับคนนี้
                </div>
              ) : (
                <ul className="space-y-2">
                  {donateModal.items.map((item, idx) => (
                    <li
                      key={`${item.who}-${idx}`}
                      className="flex items-center justify-between rounded-xl bg-black/70 px-3 py-2 text-[11px] text-pink-50 md:text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-2xl bg-pink-500/30 text-[11px] font-bold text-black">
                          #{idx + 1}
                        </span>
                        <span className="font-medium text-pink-50">
                          {item.who}
                        </span>
                      </div>
                      <div className="font-semibold text-amber-300">
                        {formatDonateAmount(item.amount)}{" "}
                        <span className="text-[10px] text-amber-200/80">
                          SweetDollar
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              type="button"
              onClick={closeDonateModal}
              className="mt-3 w-full rounded-2xl border border-pink-400/70 bg-black/80 px-3 py-2 text-[12px] font-medium text-pink-100 hover:bg-pink-500/20 transition"
            >
              ปิดหน้ารายละเอียด
            </button>
          </div>
        </div>
      )}

      {/* ⭐ Global Donor Summary Modal (รวมทุกคนที่โดเนท) */}
      {donorSummaryModal && (
        <div
          className="fixed inset-0 z-[96] flex items-center justify-center bg-black/75 backdrop-blur-sm"
          onClick={closeDonorSummaryModal}
        >
          <div
            className="relative max-h-[80vh] w-full max-w-md overflow-hidden rounded-3xl border border-amber-400/80 bg-gradient-to-b from-black via-slate-950 to-black p-4 md:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300">
                Global Donor Ranking
              </p>
              <h2 className="mt-1 text-sm font-bold text-pink-50 md:text-base">
                สรุปรายชื่อผู้โดเนททั้งหมด
              </h2>
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-3 py-1 text-[11px] font-medium text-amber-200">
                <span>💎 ยอดรวมทุกคน :</span>
                <span className="font-semibold text-amber-300">
                  {formatDonateAmount(donorSummaryModal.total)}
                </span>
                <span>SweetDollar</span>
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto rounded-2xl bg-black/70 p-3">
              {donorSummaryModal.items.length === 0 ? (
                <div className="py-6 text-center text-[12px] text-pink-200/80">
                  ยังไม่มีข้อมูลผู้โดเนทในระบบ
                </div>
              ) : (
                <ul className="space-y-2">
                  {donorSummaryModal.items.map((item, idx) => (
                    <li
                      key={`${item.who}-${idx}`}
                      className="flex items-center justify-between rounded-xl bg-black/80 px-3 py-2 text-[11px] text-pink-50 md:text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-2xl bg-amber-400/70 text-[11px] font-bold text-black">
                          #{idx + 1}
                        </span>
                        <span className="font-medium text-pink-50">
                          {item.who}
                        </span>
                      </div>
                      <div className="font-semibold text-amber-300">
                        {formatDonateAmount(item.amount)}{" "}
                        <span className="text-[10px] text-amber-200/80">
                          SweetDollar
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              type="button"
              onClick={closeDonorSummaryModal}
              className="mt-3 w-full rounded-2xl border border-amber-400/70 bg-black/80 px-3 py-2 text-[12px] font-medium text-amber-100 hover:bg-amber-500/20 transition"
            >
              ปิดหน้าสรุปผู้โดเนท
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ----------------- Podium Card (Top 1–3) ----------------- */
function PodiumCard({ rank, profile, highlight, openPreview, openDonateModal }) {
  const rankLabel =
    rank === 1 ? "อันดับ 1" : rank === 2 ? "อันดับ 2" : "อันดับ 3";

  // พื้นหลังกรอบ (OC)
  const podiumColor =
    rank === 1
      ? "from-amber-300 via-pink-400 to-fuchsia-500" // ทองชมพู
      : rank === 2
        ? "from-slate-100 via-slate-300 to-slate-600" // โทนเงิน
        : "from-amber-800 via-orange-500 to-rose-700"; // ทองแดง / บรอนซ์

  // สีขอบการ์ดแต่ละอันดับ
  const frameBorder =
    rank === 1
      ? " border-2 border-[rgba(251,191,36)] shadow-[0_0_40px_rgba(251,191,36,0.6)]"
      : rank === 2
        ? "border-2 border-[rgba(226,232,240)] shadow-[0_0_36px_rgba(226,232,240,0.6)]"
        : "border-2 border-[rgba(146,64,14)] shadow-[0_0_36px_rgba(146,64,14,0.7)]";

  const ocSrc = profile.ocimage || LOLLIPOP_PLACEHOLDER;
  const icSrc = profile.icimage || LOLLIPOP_PLACEHOLDER;

  const crown = rank === 1 ? "👑" : rank === 2 ? "🥈" : "🥉";

  return (
    <div
      className={`flex flex-col items-center rounded-2xl bg-black/85 px-3 py-4 text-center text-xs text-pink-50 md:px-4 md:py-5 ${frameBorder}`}
    >
      <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-pink-500/20 px-3 py-1 text-[11px] font-semibold text-pink-50">
        <span>{crown}</span>
        <span>{rankLabel}</span>
      </div>

      {/* รูป OC + IC อยู่ในการ์ด ไม่ทับตัวหนังสือ และกดได้ทั้งคู่ */}
      <div className="relative mt-1 mb-3 h-28 w-28 md:h-32 md:w-32">
        {/* OC */}
        <button
          type="button"
          onClick={() =>
            openPreview(
              ocSrc,
              `OC: ${safeText(profile.ocname)} / IC: ${safeText(
                profile.icname
              )}`
            )
          }
          className={`h-full w-full overflow-hidden rounded-3xl border-2 border-pink-100/80 bg-gradient-to-br ${podiumColor} shadow-[0_0_35px_rgba(236,72,153,0.65)] focus:outline-none focus:ring-2 focus:ring-pink-400`}
        >
          <img
            src={ocSrc}
            alt={profile.ocname}
            className="h-full w-full object-cover"
          />
        </button>

        {/* IC (ปุ่มแยก กดได้เอง) */}
        <button
          type="button"
          onClick={() =>
            openPreview(
              icSrc,
              `IC: ${safeText(profile.icname)} (${safeText(profile.icid)})`
            )
          }
          className="absolute -bottom-2 -right-2 h-12 w-12 overflow-hidden rounded-2xl border-2 border-black bg-black/90 shadow shadow-pink-500/70 focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          <img
            src={icSrc}
            alt={profile.icname}
            className="h-full w-full object-cover"
          />
        </button>
      </div>

      <div className="mb-1 text-sm font-semibold text-pink-50">
        {safeText(profile.ocname)}
      </div>
      <div className="text-[11px] text-pink-200/85">
        IC: {safeText(profile.icname)} ({safeText(profile.icid)})
      </div>
      <button
        type="button"
        onClick={() => openDonateModal(profile)}
        className="mt-2 rounded-full bg-pink-500/15 px-3 py-1 text-[11px] font-semibold text-pink-100 hover:bg-pink-500/30 hover:text-white transition"
      >
        ยอดโดเนท: {formatDonateAmount(profile.donateAmount)}{" "}
        {profile.donateAmount > 0 && "SweetDollar"}
      </button>
      <div className="mt-2 text-[11px] text-pink-200/90">
        แคปชั่น: {safeText(profile.caption)}
      </div>

      {/* Social mini */}
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        <SocialLinkButton
          type="facebook"
          url={profile.facebookurl}
          size="small"
        />
        <SocialLinkButton
          type="instagram"
          url={profile.instagramurl}
          size="small"
        />
        <SocialLinkButton type="tiktok" url={profile.tiktokurl} size="small" />
      </div>
    </div>
  );
}
