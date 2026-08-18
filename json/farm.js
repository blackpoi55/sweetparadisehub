// json/farm.js — ระบบฟาร์ม (FarmConfig): นาข้าว + งัดตู้ร้าน + ที่มาของไอเทมฟาร์มทุกชิ้น
// ดึง/verify กับเกมจริง 2026-08-18 — ตัวเลขทุกตัวคัดลอกจาก config ตรง ๆ

// ===== แปลงฟาร์ม (FarmConfig.Farms) =====
export const farms = [
  {
    key: "Rice",
    displayName: "นาข้าว",
    emoji: "🌾",
    action: "เกี่ยวข้าว",
    tagline: "แหล่งข้าวหลักของเกม — ปลอดภัย ไม่มีความเสี่ยง",
    successCooldown: 1200, // 20 นาที
    failCooldown: 300, // 5 นาที
    maxDistance: 28,
    minigame: {
      type: "Whack",
      label: "ตีตุ่น",
      how: "เป้า 🌾 โผล่ทีละอัน กดให้ทันก่อนหาย",
      duration: 9,
      quota: 6,
      spawnTotal: 8,
      spawnInterval: 0.7,
      targetLifetime: 1.5,
    },
    rewards: [
      { item: "Rice", min: 1, max: 5, chance: 1 },
      { item: "RiceTop", min: 1, max: 1, chance: 0.03 },
      { item: "DollGachaBox", min: 1, max: 1, chance: 0.01 },
      { item: "ChairGachaBox", min: 1, max: 1, chance: 0.01 },
    ],
  },
  {
    key: "Lockpick",
    displayName: "งัดตู้ร้าน",
    emoji: "🔓",
    action: "งัดล็อค",
    tagline: "แหล่งเหล็กหลัก — มีความเสี่ยง พลาดแล้วติดคุก",
    risky: true,
    successCooldown: 1200, // 20 นาที
    failCooldown: 300, // 5 นาที
    maxDistance: 20,
    requireItem: { item: "Crowbar", note: "หักทิ้งตั้งแต่ตอนเริ่มงัด — งัดได้หรือไม่ได้ก็เสีย 1 อัน" },
    jail: { minutes: 3, reason: "🔓 งัดตู้สินค้าในร้าน" },
    noAuto: true, // เป็ดออโต้ฟาร์ม (กุ๊กเป็ด) ทำแทนไม่ได้ ต้องงัดเอง
    minigame: {
      type: "Lockpick",
      label: "งัดสลัก",
      how: "เข็มหมุนรอบวง หยุดให้ตรงจุดหวานแล้วกดค้างจนครบ ทำให้ครบทุกสลัก",
      pins: 3,
      lives: 3,
      duration: 35,
      zone: 14,
      hold: 0.7,
      speed: 75,
    },
    rewards: [
      { item: "Iron", min: 2, max: 6, chance: 1 },
      { item: "Iron", min: 3, max: 5, chance: 0.25, note: "ตู้ใหญ่ (โบนัสเพิ่มจากก้อนแรก)" },
      { item: "GoldenTicket", min: 1, max: 1, chance: 0.02 },
    ],
  },
];

export const farmMeta = {
  maxDistance: 28,
};

// ===== 📦 ไอเทมฟาร์มทั้งหมด + ได้จากไหนบ้าง =====
// เขียนจากมุม "ผู้เล่นอยากได้ของชิ้นนี้ ต้องไปทำอะไร"
export const itemSources = [
  {
    item: "Rice",
    uses: "อาหารสัตว์เลี้ยง · วัตถุดิบคราฟแทบทุกสูตร",
    from: [
      { how: "🌾 เกี่ยวข้าวที่นาข้าว", detail: "ได้แน่นอน 1–5 ต่อครั้ง", main: true },
      { how: "🎁 เปิดกล่องกาชา", detail: "Event / Admin / ซีซั่น / บอส SadNoob" },
    ],
  },
  {
    item: "RiceTop",
    uses: "อาหารสัตว์เลี้ยงชั้นสูง · คราฟเหล็กงัด/ตั๋วต่าง ๆ",
    from: [
      { how: "🌾 เกี่ยวข้าวที่นาข้าว", detail: "โบนัส 3% ต่อครั้ง", main: true },
      { how: "🛠️ คราฟที่โต๊ะคราฟ", detail: "ข้าว 50 + 20,000 → ติด 50%" },
      { how: "🐤 สัตว์เลี้ยงกุ๊กเป็ด", detail: "Lv.50 เพิ่มโอกาสได้ยอดข้าว +5%" },
      { how: "🎁 เปิดกล่องกาชา", detail: "Event / Admin / ซีซั่น / บอส" },
    ],
  },
  {
    item: "Iron",
    uses: "คราฟกาชาสัตว์เลี้ยง · ตั๋วดันตลาด · เฟอร์รารี่ · อาหารแฮคเกอร์",
    from: [
      { how: "🔓 งัดตู้ร้าน", detail: "ได้แน่นอน 2–6 (+ โบนัสตู้ใหญ่ 3–5 อีก 25%)", main: true },
      { how: "🎁 เปิดกล่องกาชา", detail: "Event / Admin / ซีซั่น / บอส" },
    ],
  },
  {
    item: "Crowbar",
    uses: "ใช้เริ่มมินิเกมงัดตู้ร้าน (ของสิ้นเปลือง)",
    from: [{ how: "🛠️ คราฟที่โต๊ะคราฟ", detail: "ยอดข้าว 5 + 10,000 → ติด 30%", main: true }],
  },
  {
    item: "GoldenTicket",
    uses: "วัตถุดิบหลักของสูตรใหญ่ (เกมพาส · รถ · ตั๋วครอบครัว)",
    from: [
      { how: "🛠️ คราฟที่โต๊ะคราฟ", detail: "ยอดข้าว 10 + ข้าว 30 + 50,000 → ติด 25%", main: true },
      { how: "🔓 งัดตู้ร้าน", detail: "ลุ้น 2% ต่อครั้งที่งัดสำเร็จ" },
      { how: "🎁 เปิดกล่องกาชา", detail: "Event / Admin / ซีซั่น / บอส" },
    ],
  },
  {
    item: "OldClothes",
    uses: "คราฟปืนแดนซ์ · ตั๋วครอบครัว/แต่งงาน · หนังสือวาร์ป",
    from: [{ how: "📜 เควส NPC แอดมิน", detail: "โผล่ทุกชั่วโมงคี่ (เวลาไทย) ครั้งละ 15 นาที", main: true }],
  },
  {
    item: "LuckyCraftTicket",
    uses: "ใช้ตอนคราฟ เพิ่มโอกาสสำเร็จ +5%",
    from: [
      { how: "🎁 เปิดกล่องกาชา", detail: "Event / Admin / บอส SadNoob (เรทตำนาน)", main: true },
      { how: "🎫 แอพขอพร", detail: "สุ่มติดช่อง Lucky คราฟ" },
    ],
  },
  {
    item: "GuaranteeCraftTicket",
    uses: "ใช้ตอนคราฟ ติด 100% (1 ใบ/ครั้ง)",
    from: [
      { how: "🛠️ คราฟที่โต๊ะคราฟ", detail: "บัตรกันแตก 35 + 5,000,000 → ติด 100%", main: true },
      { how: "🎁 เปิดกล่องกาชา", detail: "Event / Admin / บอส (โอกาสต่ำมาก)" },
      { how: "🎫 แอพขอพร", detail: "สุ่มติดช่อง Guarantee คราฟ" },
    ],
  },
];

// ===== 🎁 กล่องกาชาที่ให้ "ของฟาร์ม" =====
export const gachaFarmDrops = [
  {
    key: "Event",
    name: "กล่องกาชา Event",
    box: "EventGachaBox",
    source: "🪂 แอร์ดรอป (ทุกชั่วโมง) · แอดมินแจก",
    items: ["Rice", "Money", "RiceTop", "Iron", "GoldenTicket", "LuckyCraftTicket", "GuaranteeCraftTicket"],
  },
  {
    key: "Admin",
    name: "กล่องกาชา Admin",
    box: "AdminGachaBox",
    source: "🛠 แอดมินแจก (อีเวนต์พิเศษ)",
    items: ["Rice", "Money", "RiceTop", "Iron", "GoldenTicket", "LuckyCraftTicket", "GuaranteeCraftTicket"],
  },
  {
    key: "Season",
    name: "กาชาไอเทมซีซั่น",
    box: "SeasonGachaBox",
    source: "🛠️ คราฟที่โต๊ะคราฟ",
    items: ["Rice", "Money", "Iron", "RiceTop"],
    extra: "+ ลุ้นอาวุธซีซั่น (เชือก · ริบบิ้น · ค้อนน้ำแข็ง · เบสบอล · ปืนล็อคเป้า)",
  },
  {
    key: "SadnoobBossGacha",
    name: "กาชา SadnoobBoss",
    box: "SadnoobBossGachaBox",
    source: "⚔️ ตีบอส SadNoob",
    items: ["Rice", "Money", "RiceTop", "Iron", "GoldenTicket", "LuckyCraftTicket", "GuaranteeCraftTicket"],
    extra: "+ ลุ้นปีกรุ้ง (Rainbowwing) เรทตำนาน",
  },
];

// ===== 🎉 กิจกรรมในเกม → ได้ไอเทมอะไร =====
export const activityRewards = [
  {
    icon: "🌾",
    name: "นาข้าว",
    when: "กดได้ทุก 20 นาที/แปลง",
    gets: "ข้าว · ยอดข้าว · กล่องกาชาตุ๊กตา/เก้าอี้",
  },
  {
    icon: "🔓",
    name: "งัดตู้ร้าน",
    when: "ทุก 20 นาที/ตู้ (ต้องมีเหล็กงัด)",
    gets: "เหล็ก · Golden Ticket",
    risk: "พลาด = ติดคุก 3 นาที",
  },
  {
    icon: "🪂",
    name: "แอร์ดรอป",
    when: "ทุกชั่วโมง (นาทีที่ 30)",
    gets: "กล่องกาชา Event ×5 (5 คนแรก)",
  },
  {
    icon: "⚔️",
    name: "บอสโลก",
    when: "ทุก 2 ชั่วโมง (ชั่วโมงคู่)",
    gets: "กล่องกาชาตามชนิดบอส · สัตว์เลี้ยง · ปีกรุ้ง (บอส SadNoob)",
  },
  {
    icon: "📜",
    name: "เควส NPC แอดมิน",
    when: "ทุกชั่วโมงคี่ ครั้งละ 15 นาที",
    gets: "ของเก่า (เสื้อ/รองเท้า/หมวก) · เงิน · ลุ้นบัตรสกินเบ็ด",
  },
  {
    icon: "🎣",
    name: "ตกปลา",
    when: "ตลอดเวลา",
    gets: "เงิน · คะแนนตกปลา · ปลารุ้งปลดล็อกไอเทมถาวร",
  },
  {
    icon: "🥊",
    name: "มอนสเตอร์ฟาร์ม",
    when: "ตลอดเวลา",
    gets: "เงิน · EXP หมัด · ของดรอปจากมอน",
  },
];

// ผลผลิต/ทรัพยากรจากฟาร์ม (ใช้ resolveAsset โชว์ไอคอน/ชื่อ)
export const farmResources = {
  "ผลผลิตหลัก": ["Rice", "RiceTop", "Iron", "Crowbar"],
  "ของเก่า (ใช้คราฟ)": ["OldClothes", "OldShoes", "OldHat"],
  "ตั๋วพิเศษ": [
    "GoldenTicket",
    "MarketBumpTicket",
    "LuckyCraftTicket",
    "GuaranteeCraftTicket",
    "FamilyCreateTicket",
    "FamilyExpandTicket",
    "MarriageTicket",
  ],
  "กล่องกาชา": ["DollGachaBox", "ChairGachaBox", "PetGachaBox", "SeasonGachaBox", "DecorGachaBox"],
};
