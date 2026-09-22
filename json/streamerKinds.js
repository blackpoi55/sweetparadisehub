// สเปกเอฟเฟกต์สตรีมเมอร์ชุดใหม่ (21/09/2026) — ใช้ทั้งตัวตรวจค่าฝั่งเซิร์ฟ (lib/streamer.js) และฟอร์มหน้า /streamer
// ☠️ ชื่อ kind / mode ต้องตรงกับ StreamerServer (KIND_GAP + runFx) ในเกม · ช่วงตัวเลขเกม clamp ซ้ำอีกชั้น
// ชุดเดิม (dance/soak/launch/slap/firework/text) มีฟอร์มเฉพาะของตัวเองในหน้าเว็บ ไม่อยู่ในไฟล์นี้

export const KIND_GROUPS = [
  { id: "classic", label: "✨ พื้นฐาน" },
  { id: "screen", label: "📺 ป่วนจอ (เห็นแค่จอคุณ)" },
  { id: "body", label: "🧍 ตัวละคร (คนรอบ ๆ เห็นด้วย)" },
  { id: "control", label: "🎮 ป่วนการบังคับ" },
];

const sec = (min, max, def) => ({ key: "sec", type: "range", label: "นาน", unit: "วิ", min, max, def });

export const KIND_SPEC = {
  // 📺 จอ
  spin: {
    group: "screen", icon: "🌀", label: "จอหมุน", hint: "จอหมุนติ้ว หรือพลิกกลับหัว",
    fields: [
      { key: "mode", type: "choice", def: "spin", options: [["spin", "🌀 หมุนติ้ว"], ["flip", "🙃 กลับหัว"]] },
      sec(2, 10, 4),
    ],
  },
  drunk: { group: "screen", icon: "🥴", label: "จอเมา", hint: "จอโยกไปมา ภาพเบลอ สีเพี้ยน", fields: [sec(3, 15, 6)] },
  dark: {
    group: "screen", icon: "🌑", label: "ไฟดับ / สีจอ", hint: "จอมืดเหลือไฟฉาย ดับทั้งจอ หรือเปลี่ยนสีจอ",
    fields: [
      { key: "mode", type: "choice", def: "flashlight", options: [["flashlight", "🔦 ไฟฉาย"], ["blackout", "🌑 ไฟดับ"], ["rainbow", "🌈 จอสีรุ้ง"], ["gray", "🖤 จอขาวดำ"]] },
      sec(3, 15, 6),
    ],
  },
  crack: { group: "screen", icon: "💥", label: "จอแตก", hint: "ทุบจอ 3 ครั้งร้าวทั้งจอ แล้วกระจกแตกร่วงเป็นเสี่ยง ๆ", fields: [sec(2, 8, 4)] },
  emoji: {
    group: "screen", icon: "🌧️", label: "ฝนอีโมจิ", hint: "อีโมจิร่วงเต็มจอ",
    fields: [
      { key: "emoji", type: "choice", def: "mix", options: [["mix", "🎲 สุ่ม"], ["🌹", "🌹"], ["💖", "💖"], ["😂", "😂"], ["🐸", "🐸"], ["💩", "💩"], ["🔥", "🔥"], ["⭐", "⭐"], ["🍭", "🍭"], ["🎉", "🎉"], ["👻", "👻"], ["🐟", "🐟"], ["💰", "💰"]] },
      sec(2, 10, 4),
    ],
  },
  shake: {
    group: "screen", icon: "📳", label: "แผ่นดินไหว", hint: "จอสั่นแรง ๆ",
    fields: [{ key: "power", type: "range", label: "แรง", unit: "", min: 1, max: 3, def: 2 }, sec(1, 6, 2)],
  },
  zoom: {
    group: "screen", icon: "🔍", label: "ซูมจอ", hint: "ซูมใกล้ ซูมไกล หรือซูมเข้าออกรัว ๆ",
    fields: [
      { key: "mode", type: "choice", def: "pulse", options: [["in", "🔍 ซูมใกล้"], ["out", "🔭 ซูมไกล"], ["pulse", "💓 เข้าออก"]] },
      sec(2, 8, 4),
    ],
  },
  scare: {
    group: "screen", icon: "👻", label: "ผีหลอก", hint: "ไฟกะพริบแล้วหน้าผีพุ่งเต็มจอ พร้อมเสียงกรี๊ด (ซ้ำได้ทุก 2.5 วิ)",
    fields: [
      {
        key: "style", type: "choice", def: "random",
        options: [["random", "🎲 สุ่มทุกครั้ง"], ["1", "👻 ผีผ้าห่ม"], ["2", "💇‍♀️ ผีสาวผมยาว"], ["3", "💀 หัวกะโหลกเรืองแสง"], ["4", "🎃 ฟักทองผี"], ["5", "👁️ อสูรตาเดียว"], ["6", "😈 เงาดำยิ้มกว้าง"]],
      },
    ],
  },
  // 🧍 ตัวละคร
  size: {
    group: "body", icon: "🦖", label: "ตัวเล็ก / ตัวยักษ์", hint: "หดเหลือจิ๋วหรือขยายยักษ์ชั่วคราว",
    fields: [{ key: "mode", type: "choice", def: "giant", options: [["tiny", "🐜 ตัวจิ๋ว"], ["giant", "🦖 ตัวยักษ์"]] }, sec(3, 15, 6)],
  },
  float: {
    group: "body", icon: "🎈", label: "ลอยฟ้า / จรวด", hint: "ลูกโป่ง 3 ลูกพาลอย ลมพัดหมุนติ้ว แล้วแตกทีละลูกจนร่วงตุ้บ หรือพุ่งขึ้นฟ้าแบบจรวด",
    fields: [
      { key: "mode", type: "choice", def: "balloon", options: [["balloon", "🎈 ลูกโป่ง"], ["rocket", "🚀 จรวด"]] },
      { ...sec(3, 10, 6), showIf: ["mode", "balloon"] },
    ],
  },
  freeze: { group: "body", icon: "🧊", label: "แช่แข็ง", hint: "ติดในก้อนน้ำแข็ง ขยับไม่ได้", fields: [sec(2, 8, 4)] },
  twirl: { group: "body", icon: "🌪️", label: "หมุนติ้ว", hint: "ตัวหมุนเป็นลูกข่าง", fields: [sec(2, 8, 4)] },
  zap: { group: "body", icon: "⚡", label: "ฟ้าผ่า", hint: "เมฆพายุรวมหัว ผ่าซ้ำ 3 ที ช็อตชักล้ม ตัวดำเกรียม ผมฟูมีควัน", fields: [] },
  fire: { group: "body", icon: "🔥", label: "ไฟลุก", hint: "ไฟลุกท่วมตัว (เอฟเฟกต์ ไม่เสียเลือด)", fields: [sec(3, 10, 5)] },
  // 🎮 บังคับ
  bouncy: { group: "control", icon: "🦘", label: "กระโดดไม่หยุด", hint: "ตัวละครกระโดดเองรัว ๆ", fields: [sec(3, 12, 6)] },
  speed: {
    group: "control", icon: "🐢", label: "ช้า / เร็ว", hint: "เดินช้าเป็นเต่า หรือวิ่งเร็วจนคุมไม่อยู่",
    fields: [{ key: "mode", type: "choice", def: "slow", options: [["slow", "🐢 ช้าเป็นเต่า"], ["fast", "⚡ เร็วจี๋"]] }, sec(3, 15, 6)],
  },
  warp: { group: "control", icon: "📍", label: "วาร์ปกลับจุดเกิด", hint: "ส่งกลับจุดเกิดทันที (ไม่ทำงานตอนเก็บแอร์ดรอป/ลานบอส/โซน AFK)", fields: [] },
};

/** ค่าเริ่มต้นของฟอร์ม */
export function defaultParams(kind) {
  const spec = KIND_SPEC[kind];
  if (!spec) return {};
  return Object.fromEntries(spec.fields.map((f) => [f.key, f.def]));
}

/** ตรวจ/ตัดค่าตามสเปก — ค่าที่ไม่รู้จักถูกทิ้ง */
export function cleanParams(kind, p) {
  const spec = KIND_SPEC[kind];
  const out = {};
  for (const f of spec.fields) {
    const v = p?.[f.key];
    if (f.type === "choice") {
      out[f.key] = f.options.some(([val]) => val === v) ? v : f.def;
    } else {
      const n = Number(v);
      out[f.key] = Number.isFinite(n) ? Math.round(Math.min(f.max, Math.max(f.min, n))) : f.def;
    }
  }
  return out;
}
