// ตัวช่วยกลาง: แปลง "code" ของไอเทม/วัตถุดิบ/เพ็ท → ชื่อไทย + รูป/emoji
// ใช้ร่วมกันในหน้าโต๊ะคราฟ + กาชา
import { itemall } from "@/json/item";
import { materialMeta } from "@/json/materials";
import { petByKey } from "@/json/pets";

const itemByCode = Object.fromEntries(itemall.map((i) => [i.code, i]));

/**
 * คืน { label, img, emoji } สำหรับ code ใด ๆ
 * ลำดับ: วัตถุดิบฟาร์ม → ไอเทม catalog (มีรูป local) → เพ็ท → fallback
 */
export function resolveAsset(code) {
  if (!code) return { label: "-", emoji: "❓" };

  const mat = materialMeta[code];
  if (mat) return { label: mat.name, emoji: mat.emoji };

  const pet = petByKey[code];
  if (pet) return { label: pet.displayName, emoji: pet.emoji };

  const it = itemByCode[code];
  if (it) return { label: it.nameTH || code, img: `/images/items/${code}.png`, emoji: "🎁" };

  // ไอเทมที่ยังไม่มีใน item.js — เดารูปจาก code ไว้ก่อน + emoji สำรอง
  return { label: code, img: `/images/items/${code}.png`, emoji: "🎁" };
}

export function fmtNum(n) {
  const x = Number(n || 0);
  return Number.isFinite(x) ? x.toLocaleString("en-US") : "0";
}

// โอกาสสำเร็จ/อัตราออก → ข้อความ %
export function pct(x) {
  const n = Number(x || 0) * 100;
  if (n > 0 && n < 1) return `${n.toFixed(2)}%`;
  return `${Math.round(n * 100) / 100}%`;
}

// ===== ความหายาก (5 ระดับ) =====
export const RARITY_ORDER = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];

export function rarityStyle(rarity) {
  switch (rarity) {
    case "Common":
      return { label: "ธรรมดา", className: "border-slate-400/70 bg-[#B0BEC5] text-slate-900" };
    case "Uncommon":
      return { label: "ไม่ธรรมดา", className: "border-emerald-400/70 bg-[#66BB6A] text-slate-900" };
    case "Rare":
      return { label: "หายาก", className: "border-sky-400/70 bg-[#42A5F5] text-slate-900" };
    case "Epic":
      return { label: "หายากมาก", className: "border-purple-400/70 bg-[#AB47BC] text-slate-50" };
    case "Legendary":
      return { label: "ตำนาน", className: "border-amber-300/80 bg-[#FFC107] text-slate-900 font-semibold" };
    case "Event":
      return { label: "อีเวนต์", className: "border-pink-300/80 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-sky-400 text-black font-semibold" };
    default:
      return { label: rarity || "-", className: "border-slate-500/60 bg-slate-600 text-slate-50" };
  }
}
