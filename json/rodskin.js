// json/rodskin.js — ระบบสกินเบ็ด (mirror ของ ReplicatedStorage.RodSkinConfig)
// สูตรคัดลอกจาก config จริง เพื่อให้ตัวเลขตรงกับในเกมเสมอ
// luck/money/score = บวกเข้าตัวคูณ (0.25 = +25%) · cast = บวกวินาที (ติดลบ = เร็วขึ้น)

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

// ===== สกิน 8 แบบ (rod1-rod8) =====
// iconId = rbxassetid (ดึงรูปจริงจาก Roblox) · lane = สายของสกิน · color = สีธีมการ์ด
export const skins = [
  {
    key: "rod1", order: 1, iconId: 101160609307839, emoji: "⭐", name: "ดาวนำโชค",
    lane: "ดวงล้วน", color: "#FFD24A", desc: "สายดวงล้วน — โอกาสเจอปลาดีสูงสุด",
    at0: { luck: 0.25 }, at30: { luck: 2.5 },
  },
  {
    key: "rod2", order: 2, iconId: 98510590165885, emoji: "❄️", name: "เกล็ดน้ำแข็ง",
    lane: "เงิน + สกอร์", color: "#A5F3FC", desc: "เงิน + สกอร์ ไปพร้อมกัน",
    at0: { money: 0.015, score: 0.03 }, at30: { money: 0.15, score: 0.3 },
  },
  {
    key: "rod3", order: 3, iconId: 118338068086584, emoji: "🔥", name: "เปลวเพลิง",
    lane: "เร็วล้วน", color: "#FF6A2B", desc: "เร็วล้วน — ลดคูลดาวน์แรงสุด",
    at0: { cast: -0.15 }, at30: { cast: -1.5 },
  },
  {
    key: "rod4", order: 4, iconId: 80553095881231, emoji: "⚡", name: "ราชาสายฟ้า",
    lane: "สมดุล", color: "#FDE047", desc: "สมดุล — ได้ครบทุกด้านอย่างละนิด",
    at0: { luck: 0.1, money: 0.008, score: 0.015, cast: -0.06 },
    at30: { luck: 1.0, money: 0.08, score: 0.15, cast: -0.6 },
  },
  {
    key: "rod5", order: 5, iconId: 115339204240152, emoji: "🌸", name: "ซากุระ",
    lane: "เงินล้วน", color: "#FDA4CF", desc: "เงินล้วน — โบนัสเงินสูงสุด",
    at0: { money: 0.025 }, at30: { money: 0.25 },
  },
  {
    key: "rod6", order: 6, iconId: 78917313933034, emoji: "🌹", name: "กุหลาบ",
    lane: "ดวง + สกอร์", color: "#FB4E6D", desc: "ดวง + สกอร์",
    at0: { luck: 0.15, score: 0.03 }, at30: { luck: 1.5, score: 0.3 },
  },
  {
    key: "rod7", order: 7, iconId: 87036865500486, emoji: "💎", name: "คริสตัล",
    lane: "เงิน + เร็ว", color: "#A78BFA", desc: "เงิน + เร็ว",
    at0: { money: 0.015, cast: -0.09 }, at30: { money: 0.15, cast: -0.9 },
  },
  {
    key: "rod8", order: 8, iconId: 103966729015203, emoji: "☠️", name: "มรกตพิษ",
    lane: "ดวง + เร็ว", color: "#4ADE80", desc: "ดวง + เร็ว",
    at0: { luck: 0.15, cast: -0.09 }, at30: { luck: 1.5, cast: -0.9 },
  },
];

export const iconIds = skins.map((s) => s.iconId);

// สเตทที่โชว์ (ป้าย + วิธีฟอร์แมต)
export const STATS = [
  { key: "luck", label: "โชค", emoji: "🍀", color: "#86EFAC", fmt: (v) => `+${Math.round(v * 100)}%` },
  { key: "money", label: "เงิน", emoji: "💰", color: "#FDE047", fmt: (v) => `+${+(v * 100).toFixed(1)}%` },
  { key: "score", label: "สกอร์", emoji: "⭐", color: "#93C5FD", fmt: (v) => `+${Math.round(v * 100)}%` },
  { key: "cast", label: "ความเร็ว", emoji: "⚡", color: "#FDBA74", fmt: (v) => `${v.toFixed(2)} วิ` },
];

// โบนัสที่เลเวล lv (ไล่เส้นตรง at0 → at30) — สูตรเดียวกับ Config.SkinBonus
export const skinBonus = (skin, lv) => {
  const t = Math.max(0, Math.min(MAX_LEVEL, lv)) / MAX_LEVEL;
  const out = {};
  for (const s of ["luck", "money", "score", "cast"]) {
    const a = skin.at0[s] || 0;
    const b = skin.at30[s] || 0;
    const v = a + (b - a) * t;
    if (v !== 0) out[s] = v;
  }
  return out;
};

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
  { icon: "➕", title: "โบนัสเป็นการ “บวกเพิ่ม”", desc: "สกินบวกค่าเข้ากับเบ็ดเดิม (ไม่ใช่คูณ) — เบ็ดดีอยู่แล้วใส่สกินยิ่งดีขึ้น" },
  { icon: "🎣", title: "ใส่ทับเบ็ดไหนก็ได้", desc: "สกินไม่ผูกกับเบ็ดตัวใดตัวหนึ่ง เปลี่ยนเบ็ดแล้วสกินยังติดไปด้วย" },
  { icon: "👀", title: "คนอื่นเห็นสกินเราด้วย", desc: "หน้าตาเบ็ด + เอฟเฟกต์แสดงให้ทุกคนในเซิร์ฟเห็น ไม่ใช่เห็นคนเดียว" },
  { icon: "🎨", title: "เอฟเฟกต์แรงตามเลเวล", desc: "+0 เอฟเฟกต์จาง ๆ → +30 เอฟเฟกต์เต็มสูบ สวยสุด" },
];
