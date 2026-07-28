// json/wish.js — ระบบขอพร (แอพขอพร)
// mirror ของ ReplicatedStorage.WishConfig + กติกาจริงใน ServerScriptService.WishServer
// ดึง/verify กับเกมจริง 2026-07-27 — ตัวเลขทุกตัวคัดลอกจาก config ตรง ๆ

export const meta = {
  appName: "แอพขอพร",
  appEmoji: "🎫",
  appIconId: 97625743944115, // WishConfig.APP_ICON
  openFrom: "โทรศัพท์ → แอพขอพร",

  costMoney: 1000000, // COST_MONEY — หมุน 1 ครั้ง
  ticketItem: "WishTicket", // หรือจ่ายด้วยบัตรอธิษฐาน 1 ใบ (ผลเท่ากันเป๊ะ)

  wishCardValue: 500, // WISHCARD_VALUE — มูลค่าโรบัคตอนแลกเกมพาส
  wishCardPrice: 100000000, // WISHCARD_PRICE — ราคาซื้อบัตรขอพรในแอพ (เงินในเกม)
  hbdValue: 1500, // HBD_VALUE

  allOwnedMoney: 500000, // ALL_OWNED_MONEY — สุ่มติดหมวดที่มีของครบแล้ว → ได้เงินแทน
  logCap: 300, // LOG_CAP — log แอดมิน (ring buffer ข้ามเซิร์ฟ)
  myLogCap: 50, // MYLOG_CAP — ประวัติส่วนตัวต่อผู้เล่น

  rollAnimSec: 3.8, // เวลาอนิเมชั่นรีลก่อนหยุด
  landCell: 42, // ช่องที่รางวัลจริงถูกวาง (จาก 50 ช่อง)
};

// ===== แท็บในแอพ (WishClient tabDefs) =====
export const appTabs = [
  { id: "spin", label: "🎡 หมุน", desc: "รีลแนวนอนสไตล์ CS:GO — เลือกจ่ายด้วยเงินหรือบัตรอธิษฐาน" },
  { id: "reward", label: "🎁 ของเลือกได้", desc: "เปิดดูของทั้ง 8 หมวด ว่ามีอะไรบ้าง / เรามีอันไหนแล้ว" },
  { id: "cards", label: "🎫 บัตร", desc: "ซื้อบัตรขอพร • ใช้บัตรเลือกของ • แลกเกมพาส" },
  { id: "pending", label: "📥 ค้างเลือก", desc: "สิทธิ์เลือกของที่สุ่มได้แต่ยังไม่ได้เลือก (เก็บถาวร ไม่หาย)" },
  { id: "hist", label: "📜 ประวัติ", desc: `ผลหมุนล่าสุด ${50} ครั้งของตัวเอง + จ่ายด้วยอะไร` },
];

// ===== บัตรทั้ง 3 ใบ (FarmConfig.Items กลุ่ม "บัตรขอพร") =====
// ทั้ง 3 ใบเป็นไอเทมฟาร์มแบบนับจำนวน → เก็บในกระเป๋า เทรด/ฝากขายตลาดได้
export const cards = [
  {
    code: "WishTicket",
    name: "บัตรอธิษฐาน",
    emoji: "🙏",
    iconId: 96708031527488,
    color: "#5A96DC",
    role: "ตั๋วหมุน",
    short: "1 ใบ = หมุน 1 ครั้ง (แทนเงิน 1,000,000)",
    detail:
      "ใช้แทนค่าหมุนได้ตรง ๆ — กดปุ่ม “หมุน • บัตรอธิษฐาน” แล้วระบบหักบัตร 1 ใบแทนเงิน ผลรางวัลและอัตราออกเหมือนกันทุกอย่างกับการหมุนด้วยเงิน",
    obtain: ["แอดมินแจก (เมนู F2)", "ของรางวัลอีเวนต์"],
    robux: null,
    cantDo: "แลกเกมพาสไม่ได้ · เลือกของไม่ได้ (ใช้หมุนอย่างเดียว)",
  },
  {
    code: "WishCard",
    name: "บัตรขอพร",
    emoji: "🎫",
    iconId: 97625743944115,
    color: "#A78BFA",
    role: "เลือกของ / แลกพาส",
    short: "เลือกของ 1 ชิ้นจากหมวดไหนก็ได้ · หรือคิดเป็น 500R ตอนแลกเกมพาส",
    detail:
      "ใบนี้ข้ามการสุ่มไปเลย — กด “ใช้บัตรขอพร” แล้วเลือกหมวด → เลือกของ 1 ชิ้นที่อยากได้ทันที (ยกเว้นของที่มีอยู่แล้ว) หรือเก็บสะสมไว้แลกเป็นเกมพาสก็ได้",
    obtain: [
      "ซื้อในแอพ 100,000,000 เงินในเกม",
      "สุ่มติดจากรีล (น้ำหนัก 22 = ช่องหายากที่สุด)",
      "แอดมินแจก / อีเวนต์",
    ],
    robux: 500,
    cantDo: "ใช้หมุนรีลไม่ได้ (นั่นคือหน้าที่ของบัตรอธิษฐาน)",
  },
  {
    code: "HBDCard",
    name: "บัตร Happy Birthday",
    emoji: "🎂",
    iconId: 117062181611241,
    color: "#F472B6",
    role: "เลือกของ / แลกพาส (แรงสุด)",
    short: "เลือกของ 1 ชิ้นเหมือนบัตรขอพร · แต่คิดเป็น 1,500R ตอนแลกเกมพาส",
    detail:
      "ความสามารถ “เลือกของ” เท่ากับบัตรขอพรเป๊ะ (1 ใบ = ของ 1 ชิ้น) แต่มูลค่าแลกพาสสูงกว่า 3 เท่า — ถ้าจะใช้เลือกของธรรมดา แนะนำใช้บัตรขอพรก่อน แล้วเก็บใบนี้ไว้แลกพาสแพง ๆ จะคุ้มกว่ามาก",
    obtain: ["แอดมินแจกเท่านั้น (วันเกิด / อีเวนต์พิเศษ)"],
    robux: 1500,
    cantDo: "ใช้หมุนรีลไม่ได้ · ซื้อด้วยเงินในเกมไม่ได้",
  },
];

// ===== รางวัลในรีล 25 ช่อง (WishConfig.Rewards) =====
// weight เรียงจากง่าย → ยาก · % = weight / รวมทั้งหมด
// kind: money | farm | choose | wishcard
export const rewards = [
  { key: "cash20k", kind: "money", amount: 20000, weight: 1100, emoji: "💰", label: "เศษเงิน 20K", color: "#56966E" },
  { key: "rice10", kind: "farm", item: "Rice", iconId: 85477494371008, amount: 10, weight: 950, emoji: "🌾", label: "ข้าว ×10", color: "#78A858" },
  { key: "ricetop3", kind: "farm", item: "RiceTop", iconId: 123722914776640, amount: 3, weight: 850, emoji: "🌾", label: "ยอดข้าว ×3", color: "#96B45A" },
  { key: "iron3", kind: "farm", item: "Iron", iconId: 97472592959500, amount: 3, weight: 780, emoji: "🔩", label: "เหล็ก ×3", color: "#808A96" },
  { key: "oldcloth3", kind: "farm", item: "OldClothes", iconId: 118253458347766, amount: 3, weight: 680, emoji: "👕", label: "เสื้อผ้าเก่า ×3", color: "#968278" },
  { key: "oldshoe3", kind: "farm", item: "OldShoes", iconId: 77902936390195, amount: 3, weight: 620, emoji: "👟", label: "รองเท้าเก่า ×3", color: "#8C786E" },
  { key: "oldhat3", kind: "farm", item: "OldHat", iconId: 136791974687316, amount: 3, weight: 560, emoji: "🎩", label: "หมวกเก่า ×3", color: "#968C78" },
  { key: "mfx100", kind: "farm", item: "MFExp100", iconId: 138443420054491, amount: 2, weight: 500, emoji: "🃏", label: "EXP หมัด +100 ×2", color: "#78A0DC" },
  { key: "gold3", kind: "farm", item: "GoldenTicket", iconId: 130180104763127, amount: 3, weight: 460, emoji: "🎫", label: "Golden Ticket ×3", color: "#EBC658" },
  { key: "mfx500", kind: "farm", item: "MFExp500", iconId: 95693891337269, amount: 1, weight: 400, emoji: "🃏", label: "EXP หมัด +500", color: "#6E96E6" },
  { key: "lucky1", kind: "farm", item: "LuckyCraftTicket", iconId: 70388488463376, amount: 1, weight: 350, emoji: "🍀", label: "Lucky คราฟ", color: "#82C88C" },
  { key: "mfx1000", kind: "farm", item: "MFExp1000", iconId: 93656820955999, amount: 1, weight: 300, emoji: "🃏", label: "EXP หมัด +1000", color: "#5A8CF0" },
  { key: "mfxx2", kind: "farm", item: "MFExpX2", iconId: 134527392047996, amount: 1, weight: 260, emoji: "🃏", label: "EXP หมัด x2", color: "#5082FA" },
  { key: "safecard", kind: "farm", item: "RodSkinSafeCard", iconId: 98856359995531, amount: 1, weight: 220, emoji: "🛡️", label: "บัตรกันแตก", color: "#82C8B4" },
  { key: "c_doll", kind: "choose", cat: "doll", weight: 190, emoji: "🧸", label: "เลือกตุ๊กตา!", color: "#E696C8" },
  { key: "c_chair", kind: "choose", cat: "chair", weight: 160, emoji: "🪑", label: "เลือกเก้าอี้!", color: "#C8A078" },
  { key: "start0", kind: "farm", item: "RodSkinStartCard", iconId: 103294967033174, amount: 1, weight: 135, emoji: "🎴", label: "บัตรการันตี +0", color: "#96B4C8" },
  { key: "c_fashion", kind: "choose", cat: "fashion", weight: 115, emoji: "👗", label: "เลือกแฟชั่น!", color: "#EB8CB4" },
  { key: "c_decor", kind: "choose", cat: "decor", weight: 95, emoji: "🎀", label: "เลือกของตกแต่ง!", color: "#DC96BE" },
  { key: "guar1", kind: "farm", item: "GuaranteeCraftTicket", iconId: 76075679303888, amount: 1, weight: 80, emoji: "💯", label: "Guarantee คราฟ", color: "#78D2AA" },
  { key: "c_mount", kind: "choose", cat: "mount", weight: 65, emoji: "🐎", label: "เลือกสัตว์ขี่!", color: "#C8B478" },
  { key: "c_fish", kind: "choose", cat: "fish", weight: 52, emoji: "🐟", label: "เลือกปลารุ้ง!", color: "#78C8FF" },
  { key: "c_pet", kind: "choose", cat: "pet", weight: 40, emoji: "🐾", label: "เลือกสัตว์เลี้ยง!", color: "#78D2F0" },
  { key: "c_season", kind: "choose", cat: "season", weight: 30, emoji: "⚔️", label: "เลือกอาวุธซีซั่น!", color: "#FF7676" },
  { key: "wishcard", kind: "wishcard", weight: 22, emoji: "🎫", label: "บัตรขอพร!!!", color: "#FFDC78" },
];

export const KIND_META = {
  money: { label: "เงิน", emoji: "💰", tone: "emerald" },
  farm: { label: "ไอเทม", emoji: "📦", tone: "sky" },
  choose: { label: "เลือกได้", emoji: "🎁", tone: "amber" },
  wishcard: { label: "บัตรขอพร", emoji: "🎫", tone: "fuchsia" },
};

export function totalWeight() {
  return rewards.reduce((s, r) => s + r.weight, 0);
}

// อัตราออกเป็น % (จาก weight)
export function rewardPct(weight) {
  return (weight / totalWeight()) * 100;
}

// ===== 8 หมวด "ของเลือกได้" (WishConfig.Categories เรียงตาม CategoryOrder) =====
// grant: permanent = ไอเทมถาวร · pet = สัตว์เลี้ยง · fish = ลงสมุดปลา
// dup=false → ของที่มีแล้วจะเป็นสีจาง เลือกไม่ได้ · มีครบทั้งหมวด → สุ่มติดหมวดนี้จะได้เงิน 500,000 แทน
// dup=true  → เลือกซ้ำได้ ไม่มีเงื่อนไข "ครบ"
export const categories = [
  {
    key: "fish",
    label: "ปลารุ้ง",
    emoji: "🐟",
    grant: "fish",
    dup: true,
    color: "#78C8FF",
    note: "เลือกซ้ำได้ ไม่ต้องกลัวของซ้ำ — ปลาที่ยังไม่มีจะติดป้าย ✨ ยังไม่มี",
    grantDesc: "บันทึกลงสมุดปลา (FishDex) เหมือนตกได้เอง — ได้คะแนน/สถิติครบ",
  },
  {
    key: "pet",
    label: "สัตว์เลี้ยง",
    emoji: "🐾",
    grant: "pet",
    dup: false,
    color: "#78D2F0",
    items: ["Bunny", "SharkPet", "Dog", "frog", "Chicken", "Cat", "DarkDevil", "Haxigator"],
    note: "8 ตัว — 404 เดมอน ไม่อยู่ในลิสต์ (สงวนไว้ ซื้อด้วยโรบัคเท่านั้น)",
    grantDesc: "เข้ากระเป๋าสัตว์เลี้ยงทันที",
  },
  {
    key: "chair",
    label: "เก้าอี้",
    emoji: "🪑",
    grant: "permanent",
    dup: false,
    color: "#C8A078",
    items: [
      "ChairDevilPremiumTool", "ChairGamingBlackBlueTool", "ChairGamingBlueTool", "ChairGamingRGBTool",
      "ChairGroupThreeTool", "ChairKuromiTool", "ChairLoveWhiteTool", "ChairMymelodyTool",
      "ChairPinkRabbitTool", "ChairRoyalTool", "ChairSakuratreeswingTool", "ChairSpongeTool",
      "ChairSwinglTool", "ChairTwoPersonTool", "ChairstrawberryTool", "RedPlasticChairTool",
    ],
    note: "หมวดใหญ่สุด 16 ชิ้น — รวมเก้าอี้ลิมิเต็ดอย่าง Chair Devil Premium",
    grantDesc: "ไอเทมถาวร เข้ากระเป๋าตลอดไป",
  },
  {
    key: "decor",
    label: "ของตกแต่ง",
    emoji: "🎀",
    grant: "permanent",
    dup: false,
    color: "#DC96BE",
    items: [
      "BalloonDoorTool", "BalloonsTool", "BlueConfettiTool", "DiscoTool", "GrillTool", "PartyTable6Tool",
      "PicnicBasketTool", "PoolFloatTool", "PurpleConfettiTool", "SmokeMachineTool", "StableTool", "TableParty4Tool",
    ],
    note: "ชุดเดียวกับกาชาของตกแต่ง v1 — ครบ 12 ชิ้น",
    grantDesc: "ไอเทมถาวร เข้ากระเป๋าตลอดไป",
  },
  {
    key: "season",
    label: "อาวุธซีซั่น",
    emoji: "⚔️",
    grant: "permanent",
    dup: false,
    color: "#FF7676",
    items: ["BaseBallss3", "FrozenHammer", "RibbonRope", "Rope", "SniperGun", "Sniperinvite"],
    note: "หมวดหายาก (น้ำหนัก 30) — ของซีซั่นที่ปกติต้องคราฟกาชาซีซั่นเท่านั้น",
    grantDesc: "ไอเทมถาวร เข้ากระเป๋าตลอดไป",
  },
  {
    key: "fashion",
    label: "แฟชั่น",
    emoji: "👗",
    grant: "permanent",
    dup: false,
    color: "#EB8CB4",
    items: ["ChistmasHat", "HbdAdminBoatHat", "PumkinHat", "WitchHat"],
    note: "หมวดเล็กสุด 4 ชิ้น — เก็บครบง่ายที่สุด (ครบแล้วสุ่มติด = ได้เงิน 500K)",
    grantDesc: "ไอเทมถาวร เข้ากระเป๋าตลอดไป",
  },
  {
    key: "mount",
    label: "สัตว์ขี่",
    emoji: "🐎",
    grant: "permanent",
    dup: false,
    color: "#C8B478",
    items: ["RideCapybaraTool", "RideDuckTool", "RideUnicornTool", "RideBuffaloTool"],
    note: "4 ตัว — เป็ดน้อยต้องตก “ปลาราเร็ดก้าบก้าบ” · ควายต้องตก “ปลาเจ้าทุยลุยแหลก” ถึงจะปลดล็อก (หรือลุ้นจากขอพร)",
    grantDesc: "ไอเทมถาวร เข้ากระเป๋าตลอดไป",
  },
  {
    key: "doll",
    label: "ตุ๊กตา",
    emoji: "🧸",
    grant: "permanent",
    dup: false,
    color: "#E696C8",
    items: ["Bunnydoll", "Godji", "HelloKitty", "KittyLove", "Minion", "kuromi_Beta", "mymelody_Beta"],
    note: "7 ชิ้น — รวม Kuromi/My Melody ที่เป็นเรทตำนานในกาชาตุ๊กตา",
    grantDesc: "ไอเทมถาวร เข้ากระเป๋าตลอดไป",
  },
];

// ===== ปลารุ้งทั้ง 24 ตัวในหมวด fish (FishConfig.DEFAULT_FISH id 69–92) =====
// event=true → ปลากิจกรรม ปกติตกได้เฉพาะช่วงอีเวนต์เท่านั้น
export const rainbowFish = [
  { id: 69, name: "ราชานาคเรนโบว์", price: 15000, score: 480, rate: 0.03 },
  { id: 70, name: "คราเคนเจ็ดสี", price: 45000, score: 560, rate: 0.01 },
  { id: 71, name: "มังกรมหาเทพรุ้ง", price: 45000, score: 560, rate: 0.01 },
  { id: 72, name: "ปลากระป๋องหมดอายุ", price: 45000, score: 560, rate: 0.01 },
  { id: 73, name: "เขียดตะปาดขาดวิตามิน", price: 45000, score: 560, rate: 0.01 },
  { id: 74, name: "ปลาสุดหล่อมองท่อไม่มองทาง", price: 45000, score: 560, rate: 0.01 },
  { id: 75, name: "ปลาทังก้าปลาทังกี้", price: 45000, score: 560, rate: 0.01 },
  { id: 76, name: "ปลาคราฟจักรพรรดิ์เรนโบว์", price: 150000, score: 1560, rate: 0.003 },
  { id: 77, name: "ปลาSadNoob", price: 150000, score: 1560, rate: 0.003 },
  { id: 78, name: "วาฬจักรวาลสีรุ้ง", price: 200000, score: 650, rate: 0.002 },
  { id: 79, name: "เรือน้อยคอยรักสีรุ้ง", price: 200000, score: 650, rate: 0.002 },
  { id: 80, name: "ปลาTeenสีรุ้ง", price: 150000, score: 650, rate: 0.006 },
  { id: 81, name: "ปลาไก่โอ้คสีรุ้ง", price: 150000, score: 650, rate: 0.006 },
  { id: 82, name: "ปลาฮิปปี้สีรุ้ง", price: 150000, score: 650, rate: 0.006 },
  { id: 83, name: "กุ้งแช่สีรุ้ง", price: 150000, score: 650, rate: 0.006 },
  { id: 84, name: "เพนกวินจักรพรรดิ์สีรุ้ง", price: 150000, score: 650, rate: 0.009 },
  { id: 85, name: "StampSatangFish", price: 200000, score: 650, rate: 0.006 },
  { id: 86, name: "ปลารารวดอึ", price: 250000, score: 888, rate: 0.001, unlock: "🚽 ชักโครกนักตกปลา" },
  { id: 87, name: "ปลาราเร็ดก้าบก้าบ", price: 250000, score: 888, rate: 0.001, unlock: "🦆 เป็ดน้อยขี่" },
  { id: 88, name: "ปลาเจ้าทุยลุยแหลก", price: 250000, score: 900, rate: 0.0008, unlock: "🐃 ควายน่าขี่" },
  { id: 89, name: "HBD Admin Boat", price: 10000, score: 480, rate: 0.1, event: true },
  { id: 90, name: "ปลาแจ็กโอแลนเทิร์น", price: 10000, score: 480, rate: 0.1, event: true },
  { id: 91, name: "ถึงไม่ใช่ซานต้าแต่คืนวันที่25ไปหาได้นะ", price: 10000, score: 480, rate: 0.1, event: true },
  { id: 92, name: "ปลาลาลืนฉีดน้ำ", price: 10000, score: 480, rate: 0.1, event: true },
];

// ===== ขั้นตอนการเล่น =====
export const howto = [
  {
    step: 1,
    icon: "📱",
    title: "เปิดแอพขอพร",
    desc: "หยิบโทรศัพท์ออกมา → เลือกแอพ “🎫 ขอพร” หน้าต่างจะเด้งขึ้นกลางจอ (ย่อขนาดอัตโนมัติบนมือถือ)",
  },
  {
    step: 2,
    icon: "🎡",
    title: "กดหมุน 1 ครั้ง",
    desc: "เลือกจ่ายด้วย เงิน 1,000,000 หรือ บัตรอธิษฐาน 1 ใบ — ทั้งสองทางอัตราออกเท่ากันเป๊ะ ไม่มีทางไหนดีกว่า",
  },
  {
    step: 3,
    icon: "🎯",
    title: "รีลวิ่งแล้วหยุดที่รางวัล",
    desc: "รีลแนวนอนสไตล์ CS:GO วิ่ง ~3.8 วินาทีแล้วชะลอหยุดตรงลูกศร ▼ ทอง — ผลลัพธ์ถูกสุ่มโดยเซิร์ฟเวอร์ก่อนรีลจะเริ่มวิ่ง อนิเมชั่นแค่เล่นให้ดูเฉย ๆ",
  },
  {
    step: 4,
    icon: "🎁",
    title: "ถ้าได้ช่อง “เลือกได้”",
    desc: "จะได้ “สิทธิ์เลือก” 1 ครั้งในหมวดนั้น กดเลือกเลยตอนนั้น หรือเก็บไว้ก่อนก็ได้ — สิทธิ์ค้างอยู่ในแท็บ 📥 ค้างเลือก และถูกบันทึกถาวร ออกเกมไปแล้วกลับมายังอยู่",
  },
  {
    step: 5,
    icon: "🎟️",
    title: "สะสมบัตรไปแลกเกมพาส",
    desc: "บัตรขอพร (500R) + บัตร HBD (1500R) เอามารวมกันแลกเกมพาส/ลิมิเต็ด 33 ชิ้น + เพ็ท 404 เดมอน — ที่แท็บ 🎫 บัตร → แลกเกมพาส",
  },
];

// ===== กฎสำคัญ =====
export const rules = [
  {
    icon: "🎲",
    title: "เซิร์ฟเวอร์สุ่ม ไม่ใช่เครื่องคุณ",
    desc: "ทุกครั้งที่กดหมุน เซิร์ฟเวอร์หักค่าหมุน → สุ่มผล → แจกของ แล้วค่อยส่งผลกลับมาให้รีลวิ่ง จบที่ผลนั้น ปิดเกมกลางคันหรือแก้ไฟล์ฝั่งเครื่องตัวเองก็เปลี่ยนผลไม่ได้",
    tone: "emerald",
  },
  {
    icon: "🔒",
    title: "กันกดรัว/กดซ้อน",
    desc: "คำสั่งที่หักเงิน/หักบัตร (หมุน · ซื้อบัตร · ใช้บัตร · แลกพาส · เลือกของค้าง) จะล็อกทีละ 1 คำสั่งต่อคน กดรัวจะขึ้น “รอสักครู่…” แทนที่จะหักซ้ำ",
    tone: "emerald",
  },
  {
    icon: "🚫",
    title: "ของที่มีแล้ว เลือกซ้ำไม่ได้",
    desc: "ทุกหมวดยกเว้นปลารุ้ง ของที่มีอยู่แล้วจะขึ้นกรอบเขียว ✓ มีแล้ว และกดไม่ได้ — ป้องกันเสียสิทธิ์/เสียบัตรฟรี",
    tone: "amber",
  },
  {
    icon: "💵",
    title: "มีของครบหมวด → ได้เงินแทน",
    desc: "ถ้าสุ่มติดช่อง “เลือกได้” ของหมวดที่คุณมีของครบทุกชิ้นแล้ว ระบบจ่ายเงิน 500,000 ให้แทนทันที (ไม่เสียเที่ยวหมุนฟรี) — ยกเว้นหมวดปลารุ้งที่เลือกซ้ำได้จึงไม่มีเงื่อนไขนี้",
    tone: "sky",
  },
  {
    icon: "⚠️",
    title: "แลกเกมพาสไม่มีทอน",
    desc: "หักบัตรเต็มใบเสมอ มูลค่าที่เกินราคาพาสจะหายไป — แต่ระบบจะบล็อกไม่ให้ใส่บัตรเกินความจำเป็น (ถ้าเอาบัตรออก 1 ใบแล้วยังพอ = ใส่เกิน)",
    tone: "amber",
  },
  {
    icon: "✅",
    title: "แลกพาสที่มีอยู่แล้วไม่ได้",
    desc: "ถ้าคุณเป็นเจ้าของเกมพาสนั้นอยู่แล้ว ปุ่มจะขึ้น “✓ มีแล้ว” และเซิร์ฟเวอร์ก็บล็อกซ้ำอีกชั้น · ระบบให้พาสก่อน แล้วค่อยหักบัตร ถ้าให้ไม่สำเร็จบัตรจะไม่ถูกหัก",
    tone: "emerald",
  },
];

// ===== เกร็ดสั้น (การ์ดบนสุด) =====
export const facts = [
  {
    icon: "🎡",
    title: "25 ช่องรางวัล",
    desc: "ตั้งแต่เศษเงิน 20K ไปจนถึงบัตรขอพร — ยิ่งอยู่ท้ายลิสต์ยิ่งหายาก",
  },
  {
    icon: "💰",
    title: "1,000,000 / ครั้ง",
    desc: "หรือใช้บัตรอธิษฐาน 1 ใบแทน ผลเท่ากันทุกอย่าง",
  },
  {
    icon: "🎁",
    title: "8 หมวดเลือกเอง",
    desc: "สุ่มติดช่อง “เลือกได้” แล้วเลือกของที่อยากได้เองจากหมวดนั้น",
  },
  {
    icon: "🎟️",
    title: "บัตร → เกมพาส",
    desc: "สะสมบัตรแลกเกมพาส/ลิมิเต็ด + เพ็ท 404 เดมอน ได้ 34 ชิ้น โดยไม่ใช้โรบัค",
  },
];

// ===== การแลกเกมพาสด้วยบัตร =====
// กติกาจริงจาก WishServer:
//   1) total = 500×บัตรขอพร + 1500×HBD ต้อง >= ราคาพาส (Config.shopItems[].Price)
//   2) ไม่มีทอน — ส่วนเกินหายไป
//   3) ห้ามใส่เกินจำเป็น: เอาบัตรออก 1 ใบ (ชนิดใดก็ได้ที่ใช้อยู่) แล้วยังพอ = ไม่ผ่าน
//   4) 1 การแลก = 1 เกมพาส

// 🐾 นอกจากเกมพาส/ลิมิเต็ดแล้ว owner ยังเปิดให้แลก "สัตว์เลี้ยง dev-product" ด้วยบัตรได้
//    (WishServer.PET_PASSES) — grant ผ่าน PetGrantFn ไม่ใช่ PassService.GrantGift
//    404Demon เท่านั้น · Haxigator ไม่ใส่ เพราะเลือกฟรีได้อยู่แล้วในหมวดสัตว์เลี้ยง
export const petPasses = [
  {
    id: "pet-404",
    productId: 3609379061, // Developer Product id (ไม่ใช่ gamepass id)
    petKey: "404Demon",
    cat: "pet",
    name: "👹 404 เดมอน (สัตว์เลี้ยง)",
    desc: "เพ็ทตำนาน • ตีบอส + โชคปลารุ้ง + เงินตกปลา + แฮคแอร์ดรอป",
    price: 4999,
    iconId: 128134502313859,
  },
];

/** คืน combo ที่ใช้ได้ทั้งหมดของราคานี้ (เรียงจากมูลค่ารวมน้อยสุด → ใบน้อยสุด) */
export function redeemCombos(price, { wishValue = meta.wishCardValue, hbdValue = meta.hbdValue } = {}) {
  if (!price || price <= 0) return [];
  const maxH = Math.ceil(price / hbdValue) + 1;
  const maxW = Math.ceil(price / wishValue) + 1;
  const out = [];
  for (let h = 0; h <= maxH; h++) {
    for (let w = 0; w <= maxW; w++) {
      if (w === 0 && h === 0) continue;
      const total = w * wishValue + h * hbdValue;
      if (total < price) continue;
      // ต้อง "แน่น" — เอาออก 1 ใบแล้วต้องไม่พอ
      if (w > 0 && total - wishValue >= price) continue;
      if (h > 0 && total - hbdValue >= price) continue;
      out.push({ w, h, total, cards: w + h, waste: total - price });
    }
  }
  out.sort((a, b) => a.total - b.total || a.cards - b.cards);
  return out;
}

/** combo ที่คุ้มที่สุด (เสียมูลค่าทิ้งน้อยสุด) */
export function bestCombo(price) {
  return redeemCombos(price)[0] || null;
}

export function comboText(c) {
  if (!c) return "-";
  const parts = [];
  if (c.w > 0) parts.push(`🎫×${c.w}`);
  if (c.h > 0) parts.push(`🎂×${c.h}`);
  return parts.join(" + ");
}

// ===== log ระบบ (สำหรับแอดมิน) =====
export const logging = {
  adminTab: "🎫 ขอพร (แท็บที่ 10 ในแผงแอดมิน)",
  store: "WishLog_v1",
  cap: meta.logCap,
  actions: [
    { action: "หมุนขอพร", pay: "เงิน 1,000,000 หรือ บัตรอธิษฐาน 1 ใบ" },
    { action: "เลือกของ(สุ่มได้)", pay: "ช่องเลือกจากการหมุน" },
    { action: "ซื้อบัตรขอพร", pay: "เงิน 100,000,000" },
    { action: "ขอพร-เลือกของ", pay: "บัตรขอพร / บัตร Happy Birthday 1 ใบ" },
    { action: "แลกเกมพาส", pay: "ขอพร×n + HBD×m = รวม xR / พาส yR (ไม่มีทอน)" },
    { action: "แลกสัตว์เลี้ยง", pay: "เหมือนแลกเกมพาส (แยก action เพราะแจกคนละทาง)" },
  ],
};

// ===== รวม assetId ทั้งหมดที่ต้องดึงรูปจาก Roblox =====
export const iconIds = [
  ...cards.map((c) => c.iconId),
  ...rewards.filter((r) => r.iconId).map((r) => r.iconId),
  ...petPasses.map((p) => p.iconId),
];
