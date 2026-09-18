// json/rodskin.js — ระบบสกินเบ็ด (mirror ของ ReplicatedStorage.RodSkinConfig)
// สูตรคัดลอกจาก config จริง เพื่อให้ตัวเลขตรงกับในเกมเสมอ
// rare/money/score = บวกเข้าตัวคูณ (0.3 = +30%) · cast = บวกวินาที (ติดลบ = เร็วขึ้น)

const MAX_LEVEL = 30;

export const meta = {
  maxLevel: MAX_LEVEL,
  abilMinLv: 1, // ผสมสกิน: ความสามารถต้อง ≥ +1
  lookMinLv: 5, // ผสมสกิน: ลุคต้อง ≥ +5
  appIcon: "🎣",
  appName: "สกินเบ็ด",
  craftChance: 0.7,
  luckyBonus: 0.1,
};

// ===== สกิน 21 แบบ (rod1-rod21) — บาลานซ์ใหม่ทั้งชุด 18/09/2026 (ปรับลด ×0.806 ให้สายเงินล้วน = +25% เท่ามาตรฐานเดิม) =====
// ทุกสกินได้ "งบพลัง" เท่ากันที่ +30 · สายเดียว = เต็มด้านเดียว · 2 สาย = แบ่งครึ่ง/60-40 · 3-4 สาย = แบ่งเท่า ๆ กัน
// "โชค" เดิม (แค่ลดขยะ) ถูกแทนด้วย "ปลาหายาก" (rare) = ปลาแรร์ขึ้นไปออกบ่อยขึ้น แทนที่ปลาธรรมดา · โอกาสปลาสายรุ้งเท่าเดิม
// iconId = rbxassetid (ดึงรูปจริงจาก Roblox) · lane = สายของสกิน · color = สีธีมการ์ด (ของเว็บ)
export const skins = [
  {
    key: "rod1", order: 1, iconId: 101160609307839, emoji: "⭐", name: "ดาวนำโชค",
    lane: "ปลาหายากล้วน", color: "#FFD24A", desc: "ปลาหายากล้วน — ได้ปลาดีบ่อยสุด",
    at0: { rare: 0.027 }, at30: { rare: 0.266 },
  },
  {
    key: "rod2", order: 2, iconId: 98510590165885, emoji: "❄️", name: "เกล็ดน้ำแข็ง",
    lane: "เงิน + สกอร์ อย่างละครึ่ง", color: "#A5F3FC", desc: "เงิน + สกอร์ อย่างละครึ่ง",
    at0: { money: 0.013, score: 0.025 }, at30: { money: 0.129, score: 0.25 },
  },
  {
    key: "rod3", order: 3, iconId: 118338068086584, emoji: "🔥", name: "เปลวเพลิง",
    lane: "เร็วล้วน", color: "#FF6A2B", desc: "เร็วล้วน — ตกถี่สุด",
    at0: { cast: -0.145 }, at30: { cast: -1.452 },
  },
  {
    key: "rod4", order: 4, iconId: 80553095881231, emoji: "⚡", name: "ราชาสายฟ้า",
    lane: "สมดุล", color: "#FDE047", desc: "สมดุล — ได้ครบทั้ง 4 ด้าน",
    at0: { rare: 0.006, money: 0.006, score: 0.013, cast: -0.039 }, at30: { rare: 0.065, money: 0.065, score: 0.129, cast: -0.387 },
  },
  {
    key: "rod5", order: 5, iconId: 115339204240152, emoji: "🌸", name: "ซากุระ",
    lane: "เงินล้วน", color: "#FDA4CF", desc: "เงินล้วน — เงินต่อปลาสูงสุด",
    at0: { money: 0.025 }, at30: { money: 0.25 },
  },
  {
    key: "rod6", order: 6, iconId: 78917313933034, emoji: "🌹", name: "กุหลาบ",
    lane: "ปลาหายาก + สกอร์ อย่างละครึ่ง", color: "#FB4E6D", desc: "ปลาหายาก + สกอร์ อย่างละครึ่ง",
    at0: { rare: 0.013, score: 0.025 }, at30: { rare: 0.129, score: 0.25 },
  },
  {
    key: "rod7", order: 7, iconId: 87036865500486, emoji: "💎", name: "คริสตัล",
    lane: "เงิน + เร็ว อย่างละครึ่ง", color: "#A78BFA", desc: "เงิน + เร็ว อย่างละครึ่ง",
    at0: { money: 0.013, cast: -0.077 }, at30: { money: 0.129, cast: -0.774 },
  },
  {
    key: "rod8", order: 8, iconId: 103966729015203, emoji: "☠️", name: "มรกตพิษ",
    lane: "ปลาหายาก + เร็ว อย่างละครึ่ง", color: "#4ADE80", desc: "ปลาหายาก + เร็ว อย่างละครึ่ง",
    at0: { rare: 0.013, cast: -0.077 }, at30: { rare: 0.129, cast: -0.774 },
  },
  {
    key: "rod9", order: 9, iconId: 91806053293771, emoji: "🎋", name: "ไผ่ขยัน",
    lane: "สกอร์ล้วน", color: "#86EFAC", desc: "สกอร์ล้วน — สกอร์สูงสุด",
    at0: { score: 0.05 }, at30: { score: 0.5 },
  },
  {
    key: "rod10", order: 10, iconId: 114770753839017, emoji: "🐍", name: "เขี้ยวหยก",
    lane: "ล่าปลาหายากเป็นหลัก + เร็ว", color: "#34D399", desc: "ล่าปลาหายากเป็นหลัก + เร็ว",
    at0: { rare: 0.016, cast: -0.062 }, at30: { rare: 0.161, cast: -0.621 },
  },
  {
    key: "rod11", order: 11, iconId: 119998248664625, emoji: "🌺", name: "กระซิบซากุระ",
    lane: "เงินเป็นหลัก + สกอร์", color: "#F472B6", desc: "เงินเป็นหลัก + สกอร์",
    at0: { money: 0.015, score: 0.02 }, at30: { money: 0.153, score: 0.202 },
  },
  {
    key: "rod12", order: 12, iconId: 91502499235202, emoji: "⛈️", name: "ทลายพายุ",
    lane: "เร็วเป็นหลัก + เงิน", color: "#60A5FA", desc: "เร็วเป็นหลัก + เงิน",
    at0: { money: 0.01, cast: -0.097 }, at30: { money: 0.097, cast: -0.968 },
  },
  {
    key: "rod13", order: 13, iconId: 79602658962738, emoji: "🔮", name: "ไอริสเรืองแสง",
    lane: "สกอร์เป็นหลัก + เร็ว", color: "#C084FC", desc: "สกอร์เป็นหลัก + เร็ว",
    at0: { score: 0.03, cast: -0.065 }, at30: { score: 0.298, cast: -0.645 },
  },
  {
    key: "rod14", order: 14, iconId: 115174966049190, emoji: "🌟", name: "คลื่นสวรรค์",
    lane: "เงินเป็นหลัก + ปลาหายาก", color: "#FCD34D", desc: "เงินเป็นหลัก + ปลาหายาก",
    at0: { rare: 0.01, money: 0.015 }, at30: { rare: 0.105, money: 0.153 },
  },
  {
    key: "rod15", order: 15, iconId: 82591938215013, emoji: "🌈", name: "ปีกสวรรค์สายรุ้ง",
    lane: "ปลาหายาก + สกอร์ + เร็ว เท่า ๆ กัน", color: "#F9A8D4", desc: "ปลาหายาก + สกอร์ + เร็ว เท่า ๆ กัน",
    at0: { rare: 0.009, score: 0.017, cast: -0.052 }, at30: { rare: 0.089, score: 0.169, cast: -0.516 },
  },
  {
    key: "rod16", order: 16, iconId: 112151578326846, emoji: "🔱", name: "ตรีศูลธารลึก",
    lane: "เงิน + ปลาหายาก + เร็ว เท่า ๆ กัน", color: "#22D3EE", desc: "เงิน + ปลาหายาก + เร็ว เท่า ๆ กัน",
    at0: { rare: 0.009, money: 0.008, cast: -0.053 }, at30: { rare: 0.089, money: 0.081, cast: -0.532 },
  },
  {
    key: "rod17", order: 17, iconId: 101745102185740, emoji: "🌙", name: "แมงกะพรุนจันทรา",
    lane: "ปลาหายากเป็นหลัก + เงิน", color: "#A5B4FC", desc: "ปลาหายากเป็นหลัก + เงิน",
    at0: { rare: 0.016, money: 0.01 }, at30: { rare: 0.161, money: 0.097 },
  },
  {
    key: "rod18", order: 18, iconId: 90507360226861, emoji: "👁️", name: "เนตรอสูรแดง",
    lane: "ครบทั้ง 4 ด้าน เน้นปลาหายาก", color: "#F87171", desc: "ครบทั้ง 4 ด้าน เน้นปลาหายาก",
    at0: { rare: 0.009, money: 0.006, score: 0.013, cast: -0.024 }, at30: { rare: 0.089, money: 0.065, score: 0.129, cast: -0.242 },
  },
  {
    key: "rod19", order: 19, iconId: 101591740644813, emoji: "🌌", name: "เหวลึกไร้ขอบ",
    lane: "ปลาหายากจัดเต็ม + สกอร์นิดหน่อย", color: "#818CF8", desc: "ปลาหายากจัดเต็ม + สกอร์นิดหน่อย",
    at0: { rare: 0.021, score: 0.01 }, at30: { rare: 0.21, score: 0.097 },
  },
  {
    key: "rod20", order: 20, iconId: 90026999267448, emoji: "👼", name: "ปีกเทวดานิรันดร์",
    lane: "เงิน + สกอร์ + ปลาหายาก เท่า ๆ กัน", color: "#FDE68A", desc: "เงิน + สกอร์ + ปลาหายาก เท่า ๆ กัน",
    at0: { rare: 0.009, money: 0.008, score: 0.017 }, at30: { rare: 0.089, money: 0.081, score: 0.169 },
  },
  {
    key: "rod21", order: 21, iconId: 100758527398411, emoji: "✨", name: "ผู้ถักทอดวงดาว",
    lane: "เร็ว + สกอร์ อย่างละครึ่ง", color: "#FBBF24", desc: "เร็ว + สกอร์ อย่างละครึ่ง",
    at0: { score: 0.025, cast: -0.077 }, at30: { score: 0.25, cast: -0.774 },
  },
];

export const iconIds = skins.map((s) => s.iconId);

// สเตทที่โชว์ (ป้าย + วิธีฟอร์แมต)
export const STATS = [
  { key: "rare", label: "ปลาหายาก", emoji: "🐟", color: "#86EFAC", fmt: (v) => `+${+(v * 100).toFixed(1)}%` },
  { key: "money", label: "เงิน", emoji: "💰", color: "#FDE047", fmt: (v) => `+${+(v * 100).toFixed(1)}%` },
  { key: "score", label: "สกอร์", emoji: "⭐", color: "#93C5FD", fmt: (v) => `+${Math.round(v * 100)}%` },
  { key: "cast", label: "ความเร็ว", emoji: "⚡", color: "#FDBA74", fmt: (v) => `${v.toFixed(2)} วิ` },
];

// โบนัสที่เลเวล lv (ไล่เส้นตรง at0 → at30) — สูตรเดียวกับ Config.SkinBonus
export const skinBonus = (skin, lv) => {
  const t = Math.max(0, Math.min(MAX_LEVEL, lv)) / MAX_LEVEL;
  const out = {};
  for (const s of ["rare", "money", "score", "cast"]) {
    const a = skin.at0[s] || 0;
    const b = skin.at30[s] || 0;
    const v = a + (b - a) * t;
    if (v !== 0) out[s] = v;
  }
  return out;
};

// ===== 🎨 ความแรงเอฟเฟกต์ตามเลเวล (สูตร fxScale ใน RodSkinServer) =====
// +0 = 15% (จางมาก) → +30 = 100% (เต็มที่เท่าที่ทำไว้ในโมเดล)
export const fxScale = (lv) => 0.15 + 0.85 * (Math.max(0, Math.min(MAX_LEVEL, lv)) / MAX_LEVEL);
export const fxTable = [0, 5, 10, 15, 20, 30].map((lv) => ({
  lv,
  pct: Math.round(fxScale(lv) * 100),
  max: lv === MAX_LEVEL,
}));
export const fxNotes = [
  {
    icon: "🎭",
    title: "เอฟเฟกต์ยึดตาม “ลุค” ไม่ใช่ “ความสามารถ”",
    desc: "ถ้าผสมสกิน เช่นใช้ลุค 🌸 ซากุระ (+10) แต่เอาพลัง 🔥 เปลวเพลิง (+30) → เอฟเฟกต์ที่เห็นจะแรงตามซากุระ +10 เท่านั้น อยากให้สวยสุดต้องตีบวก “ตัวที่ใส่เป็นลุค”",
    tone: "amber",
  },
  {
    icon: "👀",
    title: "คนอื่นเห็นเอฟเฟกต์เราด้วย",
    desc: "ระบบทำฝั่งเซิร์ฟเวอร์ → ทุกคนในเซิร์ฟเห็นสกินและเอฟเฟกต์ของคุณ ไม่ได้สวยอยู่คนเดียว",
    tone: "sky",
  },
];
export const fxChanges = [
  { icon: "✨", label: "อนุภาค (Particle)", desc: "ยิ่งเลเวลสูง ยิ่งพ่นถี่ขึ้นและชัดขึ้น" },
  { icon: "🌈", label: "ลำแสง (Beam)", desc: "ความโปร่งใสจางลงเรื่อย ๆ จนคมชัดเต็มที่ที่ +30" },
];

// ===== ตีบวก =====
export const upgradeChance = (lv) => Math.max(0.1, 0.3 - lv * 0.0069);
export const upgradeCost = (lv) => ({
  money: 150000 + lv * lv * 6000,
  fscore: 9000 + lv * 1500,
});
export const guaranteeNeed = (lv) => (lv < 15 ? 1 : lv < 20 ? 2 : lv < 25 ? 3 : 4);

export const upgradeTable = [0, 5, 10, 15, 20, 25, 29].map((lv) => {
  const c = upgradeCost(lv);
  return { lv, to: lv + 1, ...c, chance: upgradeChance(lv), guarantee: guaranteeNeed(lv) };
});

// ไอเทมที่ใช้ตีบวก แยกตามช่วงเลเวล (นอกจากของพื้นฐาน)
export const upgradeItems = {
  base: [
    { item: "Rice", formula: "100 + เลเวล×20" },
    { item: "RiceTop", formula: "40 + เลเวล×10" },
    { item: "Iron", formula: "40 + เลเวล×10" },
    { item: "OldClothes", formula: "10 + เลเวล×4" },
    { item: "OldHat", formula: "10 + เลเวล×4" },
    { item: "OldShoes", formula: "10 + เลเวล×4" },
  ],
  tiers: [
    {
      range: "+0 → +9",
      label: "ขั้นต้น",
      items: [
        { item: "DollGachaBox", amount: 1 },
        { item: "ChairGachaBox", amount: 1 },
        { item: "MFExp100", amount: 2 },
      ],
    },
    {
      range: "+10 → +19",
      label: "ขั้นกลาง",
      items: [
        { item: "GoldenTicket", amount: 1 },
        { item: "SeasonGachaBox", amount: 1 },
        { item: "EventGachaBox", amount: 1 },
        { item: "MFExp500", amount: 2 },
        { item: "MarketBumpTicket", amount: 1 },
      ],
    },
    {
      range: "+20 → +29",
      label: "ขั้นสูง",
      items: [
        { item: "GoldenTicket", amount: 2 },
        { item: "PetGachaBox", amount: 1 },
        { item: "SadnoobBossGachaBox", amount: 1 },
        { item: "MFExp1000", amount: 1 },
        { item: "MFExpX2", amount: 1 },
      ],
    },
  ],
};

// ===== คราฟสกิน (ได้สกินใหม่ที่ +0) =====
export const craft = {
  chance: 0.7,
  money: 5000000,
  fscore: 50000,
  items: [
    { item: "Rice", amount: 2000 },
    { item: "RiceTop", amount: 1000 },
    { item: "Iron", amount: 1000 },
    { item: "OldClothes", amount: 100 },
    { item: "OldHat", amount: 100 },
    { item: "OldShoes", amount: 100 },
    { item: "GoldenTicket", amount: 30 },
    { item: "DollGachaBox", amount: 20 },
    { item: "ChairGachaBox", amount: 20 },
    { item: "EventGachaBox", amount: 20 },
    { item: "SadnoobBossGachaBox", amount: 10 },
    { item: "SeasonGachaBox", amount: 1 },
    { item: "PetGachaBox", amount: 1 },
    { item: "MFExp1000", amount: 1 },
    { item: "MFExpX2", amount: 1 },
    { item: "MarketBumpTicket", amount: 5 },
  ],
};

// ===== บัตร/ตั๋วช่วย =====
export const helpers = [
  {
    code: "RodSkinStartCard", emoji: "🎴", name: "บัตรการันตีตี +0",
    tone: "emerald",
    effect: "ใช้ 1 ใบ = ได้สกินที่เลือกที่ +0 ทันที 100%",
    note: "ไม่เสียเงิน/คะแนน/วัตถุดิบเลย — ทางลัดข้ามการคราฟ",
  },
  {
    code: "RodSkinSafeCard", emoji: "🛡️", name: "บัตรกันตีบวกแตก",
    tone: "sky",
    effect: "ตีแตก → ไม่เสียของเลย หักบัตรนี้ 1 ใบแทน",
    note: "ใช้กับตีบวก +1 ถึง +30 · ตีติด = เสียของปกติ บัตรไม่หาย",
  },
  {
    code: "LuckyCraftTicket", emoji: "🍀", name: "ตั๋วนำโชค",
    tone: "lime",
    effect: "+10% โอกาสสำเร็จ (1 ใบ/ครั้ง)",
    note: "ใช้ได้ทั้งคราฟและตีบวก · หักเสมอไม่ว่าติดหรือแตก",
  },
  {
    code: "GuaranteeCraftTicket", emoji: "🎫", name: "ตั๋วการันตี",
    tone: "amber",
    effect: "สำเร็จ 100% แน่นอน",
    note: "ใช้เฉพาะตีบวก · ยิ่งเลเวลสูงยิ่งใช้หลายใบ (1–4 ใบ)",
  },
];

// ===== กฎล็อก ลุค/ความสามารถ =====
export const lockRules = [
  {
    title: "ใช้สกินเดียวกัน",
    sub: "ลุค = ความสามารถ",
    req: "ใช้ได้ตั้งแต่ +0",
    ok: true,
    desc: "เพิ่งคราฟได้สกินใหม่ ใส่คู่ตัวเองได้ทันที ไม่ต้องตีบวกก่อน",
  },
  {
    title: "ผสมข้ามสกิน",
    sub: "ลุค ≠ ความสามารถ",
    req: "ความสามารถ ≥ +1 · ลุค ≥ +5",
    ok: false,
    desc: "เช่น ใช้ลุค 🌸 ซากุระ แต่เอาความสามารถ 🔥 เปลวเพลิง — ต้องตีบวกทั้งคู่ถึงเกณฑ์ก่อน",
  },
];

export const howto = [
  { icon: "📱", title: "เปิดแอปสกินเบ็ด", desc: "เปิดโทรศัพท์ → แอป 🎣 สกินเบ็ด (จบในแอปเดียว ไม่ต้องเดินไปโต๊ะคราฟ)" },
  { icon: "🔨", title: "คราฟสกิน", desc: "กด “คราฟสกินนี้” ในการ์ดที่ยังไม่มี — โอกาส 70% ได้ที่ +0" },
  { icon: "✨", title: "ใส่สกิน", desc: "กด “ใส่ชุดนี้” = ใช้ทั้งลุคและความสามารถของสกินนั้น ใส่ทับเบ็ดไหนก็ได้" },
  { icon: "⬆️", title: "ตีบวกให้แรงขึ้น", desc: "ตีบวกได้ถึง +30 โบนัสเพิ่มขึ้นเรื่อย ๆ และเอฟเฟกต์อลังขึ้นตามเลเวล" },
];

export const facts = [
  { icon: "🐟", title: "“ปลาหายาก” คืออะไร", desc: "ปลาระดับแรร์ขึ้นไปออกบ่อยขึ้น แทนที่ปลาธรรมดา — โอกาสปลาสายรุ้งเท่าเดิมเป๊ะ (ของเดิม “โชค” แค่ลดขยะ เลยถูกแทนที่)" },
  { icon: "⚖️", title: "บาลานซ์ใหม่ทุกสกิน", desc: "ทุกสกินได้พลังรวมเท่ากันที่ +30 — สายเดียวได้เต็มด้านเดียว ยิ่งหลายสายยิ่งแบ่งกัน เลือกตามสไตล์การตกได้เลย ไม่มีตัวไหนเสียเปรียบ" },
  { icon: "➕", title: "โบนัสเป็นการ “บวกเพิ่ม”", desc: "สกินบวกค่าเข้ากับเบ็ดเดิม (ไม่ใช่คูณ) — เบ็ดดีอยู่แล้วใส่สกินยิ่งดีขึ้น" },
  { icon: "🎣", title: "ใส่ทับเบ็ดไหนก็ได้", desc: "สกินไม่ผูกกับเบ็ดตัวใดตัวหนึ่ง เปลี่ยนเบ็ดแล้วสกินยังติดไปด้วย" },
  { icon: "👀", title: "คนอื่นเห็นสกินเราด้วย", desc: "หน้าตาเบ็ด + เอฟเฟกต์แสดงให้ทุกคนในเซิร์ฟเห็น ไม่ใช่เห็นคนเดียว" },
  { icon: "🎨", title: "เอฟเฟกต์แรงตามเลเวล", desc: "+0 เอฟเฟกต์จาง ๆ → +30 เอฟเฟกต์เต็มสูบ สวยสุด" },
];
