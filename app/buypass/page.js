"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import * as htmlToImage from "html-to-image";
import { robuxItems, shopCategories, RATE } from "@/json/robuxshop";
import { orderConfig } from "@/json/orderconfig";
import { promptPayPayload } from "@/lib/promptpay";

const fmt = (n) => Number(n || 0).toLocaleString("en-US");
const catEmoji = Object.fromEntries(shopCategories.map((c) => [c.key, c.emoji]));

function CopyChip({ label, value }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      setTimeout(() => setDone(false), 1400);
    } catch {}
  };
  return (
    <button
      onClick={copy}
      className="flex w-full items-center justify-between gap-2 rounded-xl border border-pink-500/30 bg-black/50 px-3 py-2 text-left transition hover:border-pink-400/60"
    >
      <span className="min-w-0">
        <span className="block text-[11px] text-pink-300/70">{label}</span>
        <span className="block truncate font-mono text-sm text-pink-50">{value}</span>
      </span>
      <span className={"flex-shrink-0 text-[11px] font-medium " + (done ? "text-emerald-300" : "text-pink-300/70")}>
        {done ? "✓ ก็อปแล้ว" : "📋 ก็อป"}
      </span>
    </button>
  );
}

/* ---------- SHOP ITEM ---------- */
function ShopItem({ item, qty, add, sub, src }) {
  const [err, setErr] = useState(false);
  return (
    <article className="flex items-center gap-3 rounded-2xl border border-pink-500/25 bg-black/70 p-3">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-pink-500/25 to-fuchsia-500/15">
        {src && !err ? (
          <img src={src} alt="" className="h-full w-full object-cover" onError={() => setErr(true)} />
        ) : (
          <span className="text-xl">{catEmoji[item.cat] || "🎁"}</span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-pink-50">{item.name}</p>
        <p className="truncate text-[11px] text-pink-200/70">{item.desc}</p>
        <p className="mt-0.5 text-xs font-bold text-amber-200">R$ {fmt(item.price)}</p>
      </div>
      {qty > 0 ? (
        <div className="flex flex-shrink-0 items-center gap-2">
          <button onClick={sub} className="h-7 w-7 rounded-lg border border-pink-500/40 text-pink-100 hover:bg-pink-500/10">−</button>
          <span className="w-5 text-center text-sm font-bold text-pink-50">{qty}</span>
          <button onClick={add} className="h-7 w-7 rounded-lg border border-pink-500/40 text-pink-100 hover:bg-pink-500/10">+</button>
        </div>
      ) : (
        <button
          onClick={add}
          className="flex-shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 px-3 py-1.5 text-xs font-semibold text-black transition hover:-translate-y-0.5"
        >
          + ใส่ตะกร้า
        </button>
      )}
    </article>
  );
}

export default function BuyPassPage() {
  const [cart, setCart] = useState({}); // { itemId: qty }
  const [view, setView] = useState("shop"); // shop | order
  const [cat, setCat] = useState("gamepass");
  const [search, setSearch] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [iconMap, setIconMap] = useState({});
  const [orderIcons, setOrderIcons] = useState({});
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    fetch("/api/robux-icons")
      .then((r) => r.json())
      .then((d) => setIconMap(d.icons || {}))
      .catch(() => {});
  }, []);
  const [toast, setToast] = useState("");
  const orderRef = useRef(null);

  const byId = useMemo(() => Object.fromEntries(robuxItems.map((i) => [i.id, i])), []);
  const add = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const sub = (id) =>
    setCart((c) => {
      const n = (c[id] || 0) - 1;
      const next = { ...c };
      if (n <= 0) delete next[id];
      else next[id] = n;
      return next;
    });

  const lines = useMemo(
    () => Object.entries(cart).map(([id, qty]) => ({ item: byId[id], qty })).filter((l) => l.item),
    [cart, byId]
  );
  const totalItems = lines.reduce((s, l) => s + l.qty, 0);
  const totalRobux = lines.reduce((s, l) => s + l.item.price * l.qty, 0);
  const totalThb = Math.ceil(totalRobux / RATE);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return robuxItems.filter((i) => (q ? `${i.name} ${i.desc}`.toLowerCase().includes(q) : i.cat === cat));
  }, [cat, search]);

  // สร้าง QR เมื่อเข้าหน้าสรุป / ยอดเปลี่ยน
  useEffect(() => {
    if (view !== "order" || totalThb <= 0) return;
    const payload = promptPayPayload(orderConfig.promptpayNumber, totalThb);
    QRCode.toDataURL(payload, { width: 240, margin: 1, color: { dark: "#111111", light: "#ffffff" } })
      .then(setQrUrl)
      .catch(() => setQrUrl(""));
  }, [view, totalThb]);

  const goOrder = () => {
    if (totalItems === 0) return;
    setOrderId("SPX-" + Date.now().toString(36).slice(-6).toUpperCase());
    // โหลดรูปแบบ data URI เฉพาะของในตะกร้า (ไว้ให้แคปใบสั่งซื้อได้ไม่ติด CORS)
    const ids = lines.map((l) => l.item.id).join(",");
    setOrderIcons({});
    fetch(`/api/robux-icons?format=data&ids=${encodeURIComponent(ids)}`)
      .then((r) => r.json())
      .then((d) => setOrderIcons(d.icons || {}))
      .catch(() => {});
    setView("order");
    window.scrollTo(0, 0);
  };

  const flash = (m) => { setToast(m); setTimeout(() => setToast(""), 1800); };

  const downloadImg = async () => {
    if (!orderRef.current) return;
    try {
      const url = await htmlToImage.toPng(orderRef.current, { pixelRatio: 2, backgroundColor: "#0b0610", cacheBust: true });
      const a = document.createElement("a");
      a.href = url;
      a.download = `${orderId}.png`;
      a.click();
      flash("ดาวน์โหลดรูปแล้ว ✓");
    } catch {
      flash("ดาวน์โหลดไม่สำเร็จ ลองใหม่");
    }
  };
  const copyImg = async () => {
    if (!orderRef.current) return;
    try {
      const blob = await htmlToImage.toBlob(orderRef.current, { pixelRatio: 2, backgroundColor: "#0b0610", cacheBust: true });
      await navigator.clipboard.write([new window.ClipboardItem({ "image/png": blob })]);
      flash("ก็อปรูปแล้ว วางในดิสคอร์ดได้เลย ✓");
    } catch {
      flash("เบราว์เซอร์นี้ก็อปรูปไม่ได้ — ใช้ปุ่มดาวน์โหลดแทน");
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl" />
      </div>

      {toast && (
        <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full border border-pink-400/50 bg-black/90 px-4 py-2 text-sm text-pink-100 shadow-lg">
          {toast}
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-6 text-center md:mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            🛒 สั่งซื้อเกมพาส
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">สั่งซื้อของ (จ่ายเป็นเงินบาท)</h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-pink-200/80 md:text-sm">
            เลือกของที่ต้องการใส่ตะกร้า ระบบคิดราคาเป็นบาทให้อัตโนมัติ (รวมโรบัค ÷ {RATE} ปัดขึ้น) →
            กดสั่งซื้อ → โอนเงิน → ส่งรูปออเดอร์ + สลิปให้แอดมินในดิสคอร์ด เดี๋ยวแอดมินส่งโค้ดให้
          </p>
        </header>

        {view === "shop" ? (
          <>
            {/* วิธีสั่งซื้อ */}
            <div className="mb-6 rounded-2xl border border-pink-500/25 bg-black/50 p-4">
              <p className="mb-3 text-sm font-semibold text-pink-50">🧭 วิธีสั่งซื้อ (5 ขั้นตอน)</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                {[
                  { n: 1, icon: "🛒", t: "เลือกของใส่ตะกร้า", d: "กด + ใส่ของที่อยากได้" },
                  { n: 2, icon: "🧾", t: "กดสั่งซื้อ", d: "ระบบคิดเป็นบาทให้" },
                  { n: 3, icon: "📱", t: "สแกน/โอนเงิน", d: "QR พร้อมเพย์ หรือทรูวอลเล็ท" },
                  { n: 4, icon: "📤", t: "ส่งให้แอดมิน", d: "รูปใบสั่งซื้อ + สลิป ในดิส" },
                  { n: 5, icon: "🎁", t: "รับโค้ด", d: "แอดมินส่งโค้ดให้ในดิส" },
                ].map((s) => (
                  <div key={s.n} className="rounded-xl border border-pink-500/15 bg-black/40 p-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-500 text-[10px] font-bold text-black">{s.n}</span>
                      <span className="text-base leading-none">{s.icon}</span>
                    </div>
                    <p className="mt-1.5 text-xs font-medium text-pink-50">{s.t}</p>
                    <p className="text-[10px] leading-tight text-pink-200/60">{s.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* tabs + search */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {shopCategories.map((c) => {
                  const active = !search && cat === c.key;
                  return (
                    <button
                      key={c.key}
                      onClick={() => { setCat(c.key); setSearch(""); }}
                      className={
                        "rounded-full border px-3.5 py-1.5 text-xs font-medium transition md:text-sm " +
                        (active ? "border-pink-200 bg-pink-500 text-black" : "border-pink-500/40 bg-black/60 text-pink-100 hover:bg-pink-500/10")
                      }
                    >
                      {c.emoji} {c.label}
                    </button>
                  );
                })}
              </div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ค้นหาของ..."
                className="rounded-xl border border-pink-500/40 bg-black/60 px-3 py-2 text-xs text-pink-50 placeholder-pink-200/40 outline-none focus:border-pink-300 md:w-52 md:text-sm"
              />
            </div>

            {/* items + cart */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {visible.map((item) => (
                  <ShopItem key={item.id} item={item} qty={cart[item.id] || 0} add={() => add(item.id)} sub={() => sub(item.id)} src={iconMap[item.id]} />
                ))}
              </div>

              {/* cart summary (sticky) */}
              <aside className="lg:sticky lg:top-4 lg:self-start">
                <div className="rounded-2xl border border-pink-500/30 bg-black/80 p-4">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h2 className="text-sm font-semibold text-pink-50">🧺 ตะกร้า ({totalItems})</h2>
                    {totalItems > 0 && (
                      <button
                        onClick={() => { setCart({}); flash("ล้างตะกร้าแล้ว"); }}
                        className="rounded-full border border-rose-400/40 px-2.5 py-1 text-[11px] font-medium text-rose-300 transition hover:bg-rose-500/10"
                      >
                        🗑️ ล้างตะกร้า
                      </button>
                    )}
                  </div>
                  {lines.length === 0 ? (
                    <p className="py-6 text-center text-xs text-pink-200/60">ยังไม่มีของในตะกร้า</p>
                  ) : (
                    <div className="mb-3 flex max-h-72 flex-col gap-2 overflow-y-auto">
                      {lines.map((l) => (
                        <div key={l.item.id} className="flex items-center gap-2 text-xs">
                          {iconMap[l.item.id] ? (
                            <img src={iconMap[l.item.id]} alt="" className="h-7 w-7 flex-shrink-0 rounded-md object-cover" />
                          ) : (
                            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-pink-500/10 text-[11px]">{catEmoji[l.item.cat]}</span>
                          )}
                          <span className="min-w-0 flex-1 truncate text-pink-100">{l.item.name} ×{l.qty}</span>
                          <span className="flex-shrink-0 font-mono text-amber-200">R$ {fmt(l.item.price * l.qty)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="space-y-1 border-t border-pink-500/15 pt-3 text-sm">
                    <div className="flex justify-between text-pink-200/80"><span>รวมโรบัค</span><span className="font-mono">R$ {fmt(totalRobux)}</span></div>
                    <div className="flex justify-between text-[11px] text-pink-300/60"><span>÷ {RATE} ปัดขึ้น</span><span className="font-mono">{totalRobux}/{RATE} = {(totalRobux / RATE).toFixed(2)}</span></div>
                    <div className="flex items-baseline justify-between pt-1"><span className="text-pink-50">ราคารวม</span><span className="text-2xl font-black text-emerald-300">฿{fmt(totalThb)}</span></div>
                  </div>
                  <button
                    onClick={goOrder}
                    disabled={totalItems === 0}
                    className="mt-4 w-full rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-500 py-2.5 text-sm font-semibold text-black shadow-lg shadow-pink-500/30 transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    สั่งซื้อ →
                  </button>
                </div>
              </aside>
            </div>
          </>
        ) : (
          /* ---------- ORDER SUMMARY ---------- */
          <div className="mx-auto max-w-lg">
            <div ref={orderRef} className="overflow-hidden rounded-2xl border border-pink-500/40 bg-[#0b0610] p-5">
              <div className="flex items-center justify-between border-b border-pink-500/20 pb-3">
                <div>
                  <p className="text-base font-bold text-white">🧾 ใบสั่งซื้อ Sweet Paradise</p>
                  <p className="font-mono text-[11px] text-pink-300/70">เลขที่ {orderId}</p>
                </div>
                <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold text-amber-200">รอชำระ</span>
              </div>

              <div className="flex flex-col gap-2 py-3">
                {lines.map((l) => (
                  <div key={l.item.id} className="flex items-center gap-2.5 text-xs">
                    {orderIcons[l.item.id] ? (
                      <img src={orderIcons[l.item.id]} alt="" className="h-8 w-8 flex-shrink-0 rounded-md object-cover" />
                    ) : (
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-pink-500/10 text-sm">{catEmoji[l.item.cat]}</span>
                    )}
                    <span className="min-w-0 flex-1 truncate text-pink-100">
                      {l.item.name} <span className="text-pink-300/60">×{l.qty}</span>
                    </span>
                    <span className="flex-shrink-0 font-mono text-pink-200">R$ {fmt(l.item.price * l.qty)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-0.5 border-t border-pink-500/20 pt-3 text-sm">
                <div className="flex justify-between text-pink-200/80"><span>รวมโรบัค</span><span className="font-mono">R$ {fmt(totalRobux)}</span></div>
                <div className="flex justify-between text-[11px] text-pink-300/60"><span>เรท ÷ {RATE} (ปัดขึ้น)</span><span className="font-mono">{(totalRobux / RATE).toFixed(2)}</span></div>
                <div className="flex items-baseline justify-between pt-1"><span className="font-semibold text-pink-50">ยอดชำระ</span><span className="text-3xl font-black text-emerald-300">฿{fmt(totalThb)}</span></div>
              </div>

              {/* payment */}
              <div className="mt-4 flex flex-col items-center gap-2 rounded-xl border border-pink-500/20 bg-black/40 p-4">
                <p className="text-xs font-semibold text-pink-100">📱 สแกนพร้อมเพย์ (ยอดตรงแล้ว)</p>
                {qrUrl ? (
                  <img src={qrUrl} alt="PromptPay QR" className="h-44 w-44 rounded-lg bg-white p-2" />
                ) : (
                  <div className="flex h-44 w-44 items-center justify-center rounded-lg bg-white/5 text-xs text-pink-300/60">กำลังสร้าง QR…</div>
                )}
                <p className="text-center font-mono text-xs text-pink-200/80">
                  พร้อมเพย์ {orderConfig.promptpayNumber}
                  {orderConfig.promptpayName ? ` · ${orderConfig.promptpayName}` : ""}
                </p>
                {orderConfig.truewalletNumber && (
                  <p className="text-center font-mono text-xs text-pink-200/80">ทรูวอลเล็ท {orderConfig.truewalletNumber}</p>
                )}
              </div>

              <p className="mt-3 text-center text-[10px] leading-relaxed text-pink-300/60">
                โอนแล้วส่งรูปนี้ + สลิป ให้ {orderConfig.discordLabel} ในดิสคอร์ด · แอดมินจะส่งโค้ดให้ในดิสคอร์ด
              </p>
            </div>

            {/* actions */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button onClick={copyImg} className="rounded-full border border-pink-400/50 bg-black/60 py-2.5 text-sm font-medium text-pink-100 transition hover:bg-pink-500/10">
                📋 ก็อปรูป
              </button>
              <button onClick={downloadImg} className="rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 py-2.5 text-sm font-semibold text-black transition hover:-translate-y-0.5">
                ⬇️ ดาวน์โหลดรูป
              </button>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2">
              <CopyChip label="เลขพร้อมเพย์" value={orderConfig.promptpayNumber} />
              {orderConfig.truewalletNumber && <CopyChip label="เลขทรูวอลเล็ท" value={orderConfig.truewalletNumber} />}
              {orderConfig.discordUrl && (
                <a href={orderConfig.discordUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-pink-500/30 bg-black/50 px-3 py-2 text-center text-sm text-pink-100 hover:border-pink-400/60">
                  💬 เปิดดิสคอร์ดแอดมิน
                </a>
              )}
            </div>

            <button onClick={() => setView("shop")} className="mt-4 w-full rounded-full border border-pink-500/40 py-2 text-sm text-pink-200/80 hover:bg-pink-500/10">
              ← กลับไปแก้ตะกร้า
            </button>

            <ol className="mt-5 space-y-1.5 text-[11px] text-pink-200/70">
              <li>1. โอนเงิน ฿{fmt(totalThb)} ตามพร้อมเพย์/ทรูวอลเล็ทด้านบน</li>
              <li>2. กด “ก็อปรูป” หรือ “ดาวน์โหลดรูป” ใบสั่งซื้อนี้</li>
              <li>3. ส่งรูปใบสั่งซื้อ + สลิปการโอน ให้แอดมิน {orderConfig.discordLabel} ทางดิสคอร์ด</li>
              <li>4. รอแอดมินเจนโค้ดแล้วส่งให้ในดิสคอร์ด ✨</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
