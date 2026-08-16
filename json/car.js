// json/car.js — ระบบรถแข่ง + แต่งรถ (แอพ 🎨 ในโทรศัพท์)
// mirror ของ ReplicatedStorage.CarCustomConfig + CarUpgradeConfig + ShopConfig
// ดึง/verify กับเกมจริง 2026-08-16 — ตัวเลขทุกตัวคัดลอกจาก config ตรง ๆ

export const meta = {
  appName: "แต่งรถ",
  appEmoji: "🎨",
  openFrom: "โทรศัพท์ → แอพ 🎨 แต่งรถ",
  paintCost: 1000000, // PAINT_COST — ค่าเข้าอู่ต่อการบันทึก 1 ครั้ง (ที่มีอะไรเปลี่ยนจริง)
  maxPlate: 8, // MAX_PLATE — ป้ายทะเบียนยาวสุด (ตัวอักษร)
};

// ⚠️ ประกาศช่วงทดลอง — โชว์เด่น ๆ บนหน้าเว็บ
export const trialNotice = {
  title: "ระบบรถอยู่ในช่วงทดลอง",
  desc: "ราคา วิธีได้ ค่าจูน และความแรงของรถทุกคัน อาจมีการแก้ไข/ปรับสมดุลใหม่ได้ตลอดเวลาโดยไม่แจ้งล่วงหน้า",
};

// ===== รถทั้ง 4 คัน (CarCustomConfig.CARS + Config.ItemDefs + ShopConfig) =====
// body = ขนาดตัวถังจริง วัดจากเทมเพลตสะอาด (stud) · rideDropMax = โหลดลงได้ลึกสุดก่อนท้องครูด
// fx = ชิ้นส่วนที่คันนั้น "มีจริง" → ของที่ไม่มี กดแต่งยังไงก็ไม่เกิดอะไร
export const cars = [
  {
    key: "KoenigseggJesko",
    tool: "JeskoTool",
    name: "เจสโก้",
    fullName: "Koenigsegg Jesko",
    emoji: "🏎️",
    iconId: 79855832511312,
    tagline: "ซูเปอร์คาร์ตัวท็อป — ตัวถังยาว เกาะถนน",
    obtain: {
      kind: "shop",
      icon: "🏪",
      label: "ซื้อที่ร้านค้า Limited (NPC)",
      price: 25000000,
      priceFull: 50000000,
      minLevel: 6,
      note: "🎉 ช่วงทดลอง ลด 50% จากราคาปกติ 50,000,000",
    },
    length: 18.09, // rear 9.12 + |front -8.97|
    halfWidth: 4.38,
    rideDropMax: 0.85,
    paintParts: { main: ["Paint", "Paint L", "Paint R"], accent: ["Paint 2"] },
    fx: { head: true, smoke: true, ex: true, tint: true, horn: true },
  },
  {
    key: "FerrariFXXK",
    tool: "FerrariFXXKTool",
    name: "เฟอร์รารี่",
    fullName: "Ferrari FXX-K",
    emoji: "🐎",
    iconId: 99489588415836,
    tagline: "ตัวยาวที่สุดในบรรดา 4 คัน — สายทางตรง",
    obtain: {
      kind: "craft",
      icon: "🛠️",
      label: "คราฟที่โต๊ะคราฟ (หมวดไอเทม)",
      chance: 0.5,
      // ⬇️ ชุดช่วงทดลอง (ลด 25% จากราคาเต็ม)
      cost: [
        { item: "GoldenTicket", name: "🎫 Golden Ticket", amount: 150, full: 200 },
        { item: "ChairGachaBox", name: "🎁 กาชาเก้าอี้ V1", amount: 30, full: 40 },
        { item: "Iron", name: "🔩 เหล็ก", amount: 90, full: 120 },
        { item: "money", name: "💰 เงิน", amount: 3000000, full: 4000000 },
      ],
      note: "🎉 ช่วงทดลอง ลดของทุกอย่าง 25% (ราคาเต็ม 🎫200 · 🎁40 · 🔩120 · 💰4,000,000)",
      warn: "คราฟไม่ติดเสียวัตถุดิบ (โต๊ะคราฟหักของทุกครั้งที่กด)",
    },
    length: 20.12, // rear 9.75 + |front -10.37|
    halfWidth: 4.13,
    rideDropMax: 0.8,
    paintParts: { main: ["Paint", "Livery"] },
    fx: { head: true, smoke: true, ex: true, tint: true, horn: true },
  },
  {
    key: "DriftCar",
    tool: "DriftCarTool",
    name: "รถดริฟต์",
    fullName: "Drift Car (RB26)",
    emoji: "💨",
    iconId: 79927841466364,
    tagline: "เกิดมาเพื่อสไลด์ — ท้ายออกง่าย ควันเยอะ",
    obtain: {
      kind: "online",
      icon: "🕐",
      label: "รางวัลออนไลน์สะสม — ด่านที่ 1",
      stage: 1,
      altMoney: 15000000,
      note: "อยู่ในเกมสะสมเวลาครบตามที่กำหนด แล้วกดรับที่แอพ 🕐 ออนไลน์สะสม (ยืนเฉย ๆ ก็นับ)",
    },
    length: 21.56, // rear 10.50 + |front -11.06|
    halfWidth: 4.82,
    rideDropMax: 0.52,
    paintParts: { main: ["MeshPart", "untitled", "mesh", "xddd"] },
    fx: { head: true, smoke: true, ex: true, tint: true, horn: true },
  },
  {
    key: "FlyingCar",
    tool: "FlyingCarTool",
    name: "รถบิน",
    fullName: "Flying Car",
    emoji: "🛸",
    iconId: 102985592835094,
    tagline: "คันกว้างที่สุด ตัวเตี้ยติดดินอยู่แล้ว",
    obtain: {
      kind: "locked",
      icon: "🔒",
      label: "ยังไม่เปิดให้ผู้เล่นทั่วไป",
      note: "รอประกาศจากทีมงาน — ตอนนี้ยังไม่มีช่องทางได้สำหรับผู้เล่นทั่วไป (แต่งรถ/จูน/อัปเกรดรองรับไว้แล้ว)",
    },
    length: 19.42, // rear 11.94 + |front -7.48|
    halfWidth: 6.66,
    rideDropMax: 0.3,
    paintParts: { main: ["Body", "Logo"], accent: ["Union", "ฝาครอบล้อหลัง ซ้าย/ขวา"] },
    fx: { head: true, smoke: true, ex: true, tint: false, horn: true },
    fxNote: "คันนี้ไม่มีกระจกที่ติดฟิล์มได้ — ช่องฟิล์มกรองแสงจะไม่มีผล",
  },
];

// assetId ทั้งหมดที่ต้องดึงรูปจาก Roblox
export const iconIds = cars.map((c) => c.iconId);

// ===== 🕐 ระบบออนไลน์สะสม (OnlineRewardConfig) — ทางได้รถดริฟต์/รถบิน =====
// ⚠️ ไม่ระบุจำนวนชั่วโมงบนเว็บ เพราะยังอยู่ระหว่างปรับจูน (ค่าในเกมตอนนี้เป็นค่าทดสอบ)
export const onlineReward = {
  appName: "ออนไลน์สะสม",
  appEmoji: "🕐",
  openFrom: "โทรศัพท์ → แอพ 🕐 ออนไลน์สะสม",
  rules: [
    "นับทีละด่าน — รับด่านที่ 1 ครบก่อน ด่านที่ 2 ถึงเริ่มนับ และเริ่มจาก 0 ใหม่",
    "นับทุกวินาทีที่อยู่ในเกม ยืนนิ่ง ๆ ก็นับ (ไม่หัก AFK)",
    "เวลาสะสมแยกของใครของมัน เก็บถาวรในโปรไฟล์",
    "ถ้ามีรถคันนั้นอยู่แล้ว ระบบจ่ายเงินชดเชยแทน",
  ],
};

// ===== ช่องแต่งหน้าตา (ของสวย) =====
export const bodyColors = [
  { n: "ขาวมุก", hex: "#F2F3F8" },
  { n: "ดำเงา", hex: "#16161A" },
  { n: "เทากราไฟต์", hex: "#5C6069" },
  { n: "แดงเลือดหมู", hex: "#9E1420" },
  { n: "แดงสด", hex: "#E2262E" },
  { n: "ส้มพระอาทิตย์", hex: "#F07420" },
  { n: "เหลืองมัสตาร์ด", hex: "#EEBE2E" },
  { n: "เขียวมรกต", hex: "#1C965C" },
  { n: "ฟ้าน้ำทะเล", hex: "#2EA8DE" },
  { n: "น้ำเงินเข้ม", hex: "#1E3EA0" },
  { n: "ม่วงองุ่น", hex: "#7E3ABE" },
  { n: "ชมพูหวาน", hex: "#F47AB2" },
  { n: "ทองคำ", hex: "#D4A83E" },
  { n: "เงินโครม", hex: "#C4CAD4" },
];

export const glowColors = [
  { n: "ฟ้านีออน", hex: "#00DCFF" },
  { n: "ชมพูนีออน", hex: "#FF3CAA" },
  { n: "ม่วงนีออน", hex: "#A03CFF" },
  { n: "เขียวนีออน", hex: "#3CFF78" },
  { n: "แดงนีออน", hex: "#FF3232" },
  { n: "ส้มนีออน", hex: "#FF8C1E" },
  { n: "เหลืองนีออน", hex: "#FFE63C" },
  { n: "ขาวนีออน", hex: "#FFFFFF" },
];

export const glowModes = [
  { key: "solid", n: "นิ่ง", d: "ติดค้างสีเดียว" },
  { key: "breathe", n: "หายใจ", d: "หรี่-สว่างช้า ๆ" },
  { key: "rainbow", n: "สายรุ้ง", d: "ไล่สีไปเรื่อย ๆ" },
];

export const headColors = [
  { n: "ขาวเดิม", hex: "#FFFFFF", stock: true },
  { n: "ซีนอนฟ้า", hex: "#96C8FF" },
  { n: "แรลลี่เหลือง", hex: "#FFCD5A" },
  { n: "แดงซิ่ง", hex: "#FF4646" },
  { n: "ม่วงนีออน", hex: "#BE6EFF" },
  { n: "เขียวมีนต์", hex: "#6EFFAA" },
];

export const smokeColors = [
  { n: "ขาวปกติ", hex: "#EBEBEB", stock: true },
  { n: "แดง", hex: "#FF4646" },
  { n: "ฟ้า", hex: "#46C8FF" },
  { n: "ชมพู", hex: "#FF6EBE" },
  { n: "ม่วง", hex: "#B464FF" },
  { n: "เขียว", hex: "#5AF082" },
  { n: "ทอง", hex: "#F0C85A" },
];

export const tints = [
  { n: "ใสเดิม", v: 0.0 },
  { n: "อ่อน", v: 0.18 },
  { n: "กลาง", v: 0.36 },
  { n: "เข้ม", v: 0.54 },
  { n: "ดำสนิท", v: 0.72 },
];

export const engineTones = [
  { n: "เดิม", p: 1.0 },
  { n: "ทุ้มลึก", p: 0.78 },
  { n: "ทุ้ม", p: 0.9 },
  { n: "แหลม", p: 1.14 },
  { n: "แหลมจัด", p: 1.3 },
];

export const hornTones = [
  { n: "เดิม", p: 1.0 },
  { n: "รถบรรทุก", p: 0.7 },
  { n: "แหบแหลม", p: 1.35 },
];

export const soundVols = [
  { n: "ปกติ", v: 1.0 },
  { n: "เบาลง", v: 0.55 },
  { n: "เบามาก", v: 0.25 },
  { n: "เงียบสนิท", v: 0.0 },
];

export const rideSteps = [
  { n: "โหลดติดดิน", f: -1.0, d: "เตี้ยสุดเท่าที่คันนั้นลงได้" },
  { n: "โหลด", f: -0.55, d: "เตี้ยลงพอสวย" },
  { n: "มาตรฐาน", v: 0, d: "ความสูงเดิมของรถ" },
  { n: "ยก", v: 0.28, d: "สูงขึ้นเล็กน้อย" },
  { n: "ยกสูง", v: 0.6, d: "สูงสุด ลุยทางขรุขระ" },
];

// หมวดแต่งสวยทั้งหมด (ไว้สรุปเป็นการ์ด)
export const looksGroups = [
  { icon: "🎨", name: "สีตัวถัง", count: bodyColors.length, desc: "สีหลัก + สีรอง (บางคันมี 2 ชั้น) หรือเลื่อนแถบผสมสีเองก็ได้" },
  { icon: "💡", name: "ไฟใต้ท้อง", count: glowColors.length, desc: "8 สีนีออน × 3 รูปแบบ (นิ่ง / หายใจ / สายรุ้ง)" },
  { icon: "🛞", name: "ไฟล้อเรืองแสง", count: glowColors.length, desc: "ใช้ชุดสีเดียวกับไฟใต้ท้อง เปิด/ปิดแยกกันได้" },
  { icon: "🔦", name: "สีไฟหน้า", count: headColors.length, desc: "จากขาวเดิม → ซีนอนฟ้า แรลลี่เหลือง แดงซิ่ง ฯลฯ" },
  { icon: "🔥", name: "ไฟท้ายท่อ", count: glowColors.length, desc: "ไฟแวบตอนยกคันเร่ง (backfire) เลือกสีได้" },
  { icon: "💨", name: "สีควันยาง", count: smokeColors.length, desc: "ควันตอนดริฟต์ — เปลี่ยนเป็นสีสวย ๆ ได้" },
  { icon: "🪟", name: "ฟิล์มกรองแสง", count: tints.length, desc: "ใสเดิม → ดำสนิท (รถบินไม่มีกระจกที่ติดได้)" },
  { icon: "📐", name: "ความสูงรถ", count: rideSteps.length, desc: "โหลดติดดิน → ยกสูง (ระยะจริงต่างกันตามรุ่น)" },
  { icon: "🔊", name: "โทนเสียงเครื่อง", count: engineTones.length, desc: "ทุ้มลึก → แหลมจัด (ปรับโทนจากเสียงเดิมของรถ)" },
  { icon: "📣", name: "โทนแตร", count: hornTones.length, desc: "เดิม / รถบรรทุก / แหบแหลม" },
  { icon: "🔇", name: "ความดังเสียง", count: soundVols.length, desc: "เสียงรถ กับ เสียงท่อ ปรับแยกกันได้ ปิดเงียบสนิทก็ได้" },
  { icon: "🔖", name: "ป้ายทะเบียน", count: meta.maxPlate, desc: `พิมพ์เองได้ ${meta.maxPlate} ตัวอักษร` },
];

// ===== 🔧 จูนรถ (ฟรี ไม่เสียเงิน) =====
// ทุกช่องเป็น "ได้อย่างเสียอย่าง" — ไม่มีช่องไหนเพิ่มพลังฟรี ๆ
export const tuneOptions = [
  {
    key: "drive", n: "ระบบขับเคลื่อน", icon: "🚗", d: "ล้อไหนได้กำลัง", def: 1,
    opts: [
      { n: "ขับสี่ AWD", d: "เกาะที่สุด ออกตัวไม่ฟรีล้อ" },
      { n: "ขับหลัง RWD", d: "ท้ายปัดง่าย สนุกแต่คุมยาก" },
      { n: "ขับหน้า FWD", d: "หน้าลาก ปลอดภัย แต่จืด" },
    ],
  },
  {
    key: "gear", n: "ทดเกียร์", icon: "⚙️", d: "ออกตัวไว หรือ ปลายไหล", def: 2,
    opts: [
      { n: "ออกตัวไว", d: "พุ่งไว ปลายตัน" },
      { n: "สมดุล", d: "ค่าเดิมของรถ" },
      { n: "ปลายไหล", d: "ออกตัวอืด ปลายสูง" },
    ],
  },
  {
    key: "steer", n: "องศาเลี้ยว", icon: "🎯", d: "หักพวงมาลัยได้สุดแค่ไหน", def: 2,
    opts: [
      { n: "แคบ", d: "นิ่งตอนความเร็วสูง" },
      { n: "ปกติ", d: "ค่าเดิมของรถ" },
      { n: "กว้าง", d: "เลี้ยววงแคบ แต่ไวจนหวิว" },
    ],
  },
  {
    key: "sspd", n: "ความไวพวงมาลัย", icon: "🌀", d: "หมุนพวงมาลัยเร็วแค่ไหน", def: 2,
    opts: [
      { n: "นุ่ม", d: "ค่อย ๆ เข้าโค้ง คุมง่าย" },
      { n: "ปกติ", d: "ค่าเดิมของรถ" },
      { n: "ไว", d: "สะบัดทันใจ ใช้ดริฟต์" },
    ],
  },
  {
    key: "bbal", n: "สมดุลเบรก", icon: "🛑", d: "เบรกหน้า/หลัง อันไหนแรงกว่า", def: 2,
    opts: [
      { n: "เน้นหน้า", d: "หัวจิกเข้าโค้ง ท้ายไม่ปัด" },
      { n: "สมดุล", d: "ค่าเดิมของรถ" },
      { n: "เน้นหลัง", d: "เบรกแล้วท้ายออก ใช้ดริฟต์" },
    ],
  },
  {
    key: "tcs", n: "ระบบกันล้อฟรี TCS", icon: "🧊", d: "ตัดกำลังเมื่อล้อหมุนฟรี", def: 3,
    opts: [
      { n: "ปิด", d: "ล้อฟรีได้เต็มที่ ควันเยอะ" },
      { n: "หลวม", d: "ปล่อยให้ฟรีนิดหน่อย" },
      { n: "เต็ม", d: "ค่าเดิม ออกตัวไม่ฟรีล้อ" },
    ],
  },
  {
    key: "abs", n: "เบรก ABS", icon: "🅰️", d: "กันล้อล็อกตอนเบรก", def: 2,
    opts: [
      { n: "ปิด", d: "ล้อล็อกได้ ไถลยาว" },
      { n: "เปิด", d: "ค่าเดิม เบรกแล้วยังเลี้ยวได้" },
    ],
  },
  {
    key: "rdiff", n: "เฟืองท้าย", icon: "🔩", d: "ล้อหลังสองข้างล็อกกันแค่ไหน", def: 1,
    opts: [
      { n: "ฟรี", d: "ค่าเดิม เกาะถนนดี" },
      { n: "กึ่งล็อก", d: "กลาง ๆ" },
      { n: "ล็อกแน่น", d: "ล้อหลังหมุนพร้อมกัน ดริฟต์นิ่ง" },
    ],
  },
  {
    key: "shift", n: "จุดเปลี่ยนเกียร์", icon: "📈", d: "เกียร์ออโต้เปลี่ยนตอนรอบเท่าไหร่", def: 2,
    opts: [
      { n: "ประหยัดรอบ", d: "เปลี่ยนไว เงียบ นุ่ม" },
      { n: "ปกติ", d: "ค่าเดิมของรถ" },
      { n: "ลากรอบ", d: "ลากยาว เสียงดี แรงต่อเนื่อง" },
    ],
  },
  {
    key: "dgrip", n: "ความลื่นโหมดดริฟต์", icon: "💨", d: "กดปุ่มดริฟต์แล้วล้อหลังลื่นแค่ไหน", def: 2,
    opts: [
      { n: "ลื่นน้อย", d: "คุมง่าย เหมาะมือใหม่" },
      { n: "กลาง", d: "ค่ามาตรฐาน" },
      { n: "ลื่นจัด", d: "ท้ายออกไว ต้องคุมเก่ง" },
    ],
  },
];

// ชุดจูนสำเร็จรูป — กดปุ่มเดียวได้ครบทุกช่อง
export const tunePresets = [
  {
    key: "street", n: "ถนน", icon: "🛣️", d: "ค่าเดิมของรถ ขับง่ายที่สุด",
    v: { drive: 1, gear: 2, steer: 2, sspd: 2, bbal: 2, tcs: 3, abs: 2, rdiff: 1, shift: 2, dgrip: 2 },
  },
  {
    key: "race", n: "สนามแข่ง", icon: "🏁", d: "เกาะโค้ง ปลายไหล",
    v: { drive: 1, gear: 3, steer: 3, sspd: 3, bbal: 1, tcs: 2, abs: 2, rdiff: 2, shift: 3, dgrip: 1 },
  },
  {
    key: "drift", n: "ดริฟต์", icon: "💨", d: "ขับหลัง ปิดตัวช่วย ท้ายออกง่าย",
    v: { drive: 2, gear: 1, steer: 3, sspd: 3, bbal: 3, tcs: 1, abs: 1, rdiff: 3, shift: 3, dgrip: 3 },
  },
  {
    key: "easy", n: "มือใหม่", icon: "🐣", d: "ตัวช่วยเปิดหมด พลาดยาก",
    v: { drive: 1, gear: 2, steer: 1, sspd: 1, bbal: 2, tcs: 3, abs: 2, rdiff: 1, shift: 1, dgrip: 1 },
  },
];

// ===== ⬆️ อัปเกรดรถ (เสียเงิน — ตัวเพิ่มพลังจริง) =====
export const upgradeMeta = {
  maxLevel: 24, // MAX_LEVEL ต่อสาย
  guaranteed: true, // GUARANTEED = true → อัปติดแน่นอนทุกขั้น ไม่ใช่การพนัน
  moneyScale: 5, // MONEY_SCALE
  note: "อัปเกรดแล้วต้อง “เก็บรถแล้วเสกใหม่” ค่าถึงจะมีผล (ตัวรถอ่านค่าแรงตอนเกิดครั้งเดียว)",
};

export const upgradeTracks = [
  { key: "engine", icon: "🔧", name: "เครื่องยนต์", desc: "แรงม้า — ออกตัวไวขึ้น", maxGainText: "+80% แรงม้า" },
  { key: "gear", icon: "⚙️", name: "เกียร์", desc: "ความเร็วปลาย — วิ่งได้เร็วขึ้น", maxGainText: "ปลายไหลขึ้น 35%" },
  { key: "brake", icon: "🛑", name: "เบรก", desc: "แรงเบรก — หยุดสั้นลง", maxGainText: "+90% แรงเบรก" },
  { key: "handle", icon: "🎯", name: "การเลี้ยว", desc: "องศาเลี้ยว — เข้าโค้งคมขึ้น", maxGainText: "+30% องศาเลี้ยว" },
];

// 6 ช่วง ช่วงละ 4 ขั้น — ราคาต่อขั้น = money × MONEY_SCALE(5)
export const upgradeTiers = [
  { tier: 1, levels: "1–4", perStep: 250000 },
  { tier: 2, levels: "5–8", perStep: 500000 },
  { tier: 3, levels: "9–12", perStep: 1000000 },
  { tier: 4, levels: "13–16", perStep: 1500000 },
  { tier: 5, levels: "17–20", perStep: 2000000 },
  { tier: 6, levels: "21–24", perStep: 2500000 },
];

/** ราคาอัป 1 ขั้น (ขั้นที่ level) */
export function upgradeCost(level) {
  const t = upgradeTiers[Math.floor((level - 1) / 4)];
  return t ? t.perStep : 0;
}
/** รวมเงินอัปสายเดียวจนสุด 24 ขั้น */
export const costPerTrackFull = upgradeTiers.reduce((s, t) => s + t.perStep * 4, 0); // 31,000,000
/** รวมเงินอัปครบทั้ง 4 สายของรถ 1 คัน */
export const costAllTracksFull = costPerTrackFull * upgradeTracks.length; // 124,000,000

// ===== ขั้นตอนใช้งาน =====
export const howto = [
  { step: 1, icon: "🚗", title: "เสกรถออกมาก่อน", desc: "หยิบไอเทมอัญเชิญรถในกระเป๋าแล้วกดเสก — ต้องมีรถอยู่บนพื้นถึงจะแต่งแล้วเห็นผล" },
  { step: 2, icon: "📱", title: "เปิดแอพแต่งรถ", desc: `หยิบโทรศัพท์ → แอพ 🎨 แต่งรถ แล้วเลือกคันที่จะแต่งจาก ${cars.length} คัน (ค่าที่แต่งแยกเก็บรายคัน)` },
  { step: 3, icon: "🎨", title: "แต่งหน้าตา", desc: `เลือกสี ไฟ ฟิล์ม เสียง ความสูง ป้ายทะเบียน แล้วกดบันทึก — เสียค่าเข้าอู่ ${meta.paintCost.toLocaleString("en-US")} ต่อครั้งที่มีการเปลี่ยนจริง` },
  { step: 4, icon: "🔧", title: "จูนการขับ (ฟรี)", desc: "10 ช่อง ปรับได้ไม่เสียเงิน · ลงจากรถแล้วขึ้นใหม่ = มีผลทันที" },
  { step: 5, icon: "⬆️", title: "อัปเกรดเพิ่มพลัง", desc: "4 สาย สายละ 24 ขั้น อัปติดแน่นอน 100% · อัปแล้วต้องเก็บรถเสกใหม่ค่าถึงเข้า" },
];

// ===== ข้อควรรู้ (กันเสียเงินฟรี) =====
export const tips = [
  {
    icon: "💸", tone: "amber", title: "กดบันทึกซ้ำโดยไม่เปลี่ยนอะไร = ไม่คิดเงิน",
    desc: `ค่าเข้าอู่ ${meta.paintCost.toLocaleString("en-US")} คิดต่อ “ครั้งที่บันทึกแล้วมีอะไรเปลี่ยนจริง” เท่านั้น เข้าไปดูเฉย ๆ หรือกดบันทึกซ้ำค่าเดิม ไม่เสียเงิน`,
  },
  {
    icon: "🔧", tone: "sky", title: "จูนฟรี — ไม่ต้องจ่ายสักบาท",
    desc: "ช่องจูนทั้ง 10 ช่องปรับได้ฟรีไม่จำกัด ค่าเข้าอู่คิดเฉพาะของสวย (สี ไฟ ฟิล์ม เสียง ความสูง ป้าย) เท่านั้น",
  },
  {
    icon: "♻️", tone: "amber", title: "อัปเกรดแล้วต้องเสกรถใหม่",
    desc: "ตัวรถอ่านค่าแรงม้า/เบรกตอนเกิดครั้งเดียว — อัปเสร็จให้เก็บรถแล้วเสกใหม่ ค่าถึงจะเข้า (จูนไม่ต้อง แค่ลงแล้วขึ้นใหม่)",
  },
  {
    icon: "🪟", tone: "rose", title: "รถบินติดฟิล์มไม่ได้",
    desc: "รถบินไม่มีชิ้นกระจกที่ระบบติดฟิล์มได้ กดเลือกฟิล์มไปก็ไม่มีอะไรเปลี่ยน — ช่องอื่น (ไฟหน้า ควัน ท่อ แตร) ใช้ได้ครบปกติ",
  },
  {
    icon: "📐", tone: "sky", title: "โหลดเตี้ยไม่เท่ากันทุกคัน",
    desc: "แต่ละคันท้องต่ำไม่เท่ากัน ระบบเลยคิดระยะโหลดแยกรายคัน — กด “โหลดติดดิน” คันไหนก็เตี้ยสุดของคันนั้นโดยไม่ครูดพื้น",
  },
  {
    icon: "🎨", tone: "emerald", title: "ไม่ถูกใจสีสำเร็จรูป ผสมเองได้",
    desc: "ทุกช่องสี (ตัวถัง สีรอง ไฟใต้ท้อง ล้อ ท่อ ไฟหน้า ควัน) มีแถบเลื่อนผสมสีเอง 16.7 ล้านสี",
  },
];
