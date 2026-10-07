// json/fishpond.js — 🐟 สังเวียนปลา (บ่อสู้ปลาสายรุ้ง)
// mirror ของ ReplicatedStorage.FishPondConfig + ServerScriptService.FishPondServer (07/10/2026)
// พลัง/ราคาตุ๊กตาคำนวณด้วยสูตรเดียวกับในเกม: พลัง = 100 + 30 × log10(เรทสูงสุด / เรทตัวนี้)

export const meta = {
  maxFish: 16,       // ใส่ได้สูงสุดกี่ตัวในบ่อ (คนละ 1 ตัว)
  perPlayer: 1,
  nearDist: 56,      // ต้องยืนใกล้ตู้เท่านี้ถึงใส่ปลา/ป้อน/อัปเกรดได้
  injuryMin: 30,     // ตายแล้วพักฟื้นกี่นาที
  tickPerSec: 10,    // เซิร์ฟคิดผลกี่ครั้งต่อวินาที
  where: "ตู้กระจกกลางลานเกม",
  serverAuth: "เซิร์ฟเป็นคนตัดสินทุกอย่าง (เป้า · กัดโดน/หลบ · คริ · ไม้ตาย · ตาย) ทุกจอจึงเห็นผลตรงกัน",
  announceNote: "ประกาศทั้งหมดอยู่แค่ที่บ่อ ไม่ประกาศทั้งเซิร์ฟ",
};

// ⚔️ บทบาท — คูณกับเลือด/แรงกัด/ความเร็ว
export const roles = [
  { key: "tank", name: "แทงค์", icon: "🛡️", hp: 1.32, atk: 0.84, spd: 0.86, desc: "เลือดเยอะสุด แลกกับแรงกัดและความเร็วที่ต่ำลง" },
  { key: "bruiser", name: "นักสู้", icon: "🥊", hp: 1.12, atk: 1.0, spd: 0.96, desc: "สมดุล เลือดดีกว่าเฉลี่ย แรงกัดเต็ม" },
  { key: "assassin", name: "นักฆ่า", icon: "🔪", hp: 0.84, atk: 1.22, spd: 1.18, desc: "แรงและไวที่สุด แต่เลือดบางสุด" },
  { key: "control", name: "คุมเกม", icon: "🌀", hp: 0.98, atk: 0.98, spd: 1.02, desc: "ค่ากลาง ๆ ทุกด้าน เน้นท่าไม้ตายกวนศัตรู" },
  { key: "support", name: "ซัพพอร์ต", icon: "💚", hp: 1.06, atk: 0.9, spd: 1.0, desc: "อึดกว่านิดหน่อย แรงกัดน้อยกว่าเพื่อน" },
];

// 📈 พลังปลา
export const power = {
  formula: "พลัง = 100 + 30 × log10(เรทปลารุ้งที่ออกง่ายสุด ÷ เรทของตัวนั้น)",
  note: "ยิ่งปลาหายาก ยิ่งพลังสูง — ตัวที่ออกง่ายสุดได้ 100 เป็นฐาน",
  countBonus: "ตกปลาตัวนั้นได้เพิ่ม 1 ตัว = พลัง +0.001% (ไม่มีเพดาน) และตัวโตขึ้นทีละนิด สูงสุด +15%",
  hpPerPower: 18,
  bitePerPower: 0.42,
  crit: { chance: 12, mult: 1.85 },
  dodge: 7,
  enrage: "เลือดเหลือต่ำกว่า 25% = คลั่ง แรงกัด +20% ว่ายเร็วขึ้น 15%",
};

// 🎮 ปุ่มสั่งปลา
export const commands = [
  { icon: "🎯", name: "สั่งเล็งเป้า", cd: 12, detail: "แตะปลาศัตรู → ปลาเราไล่กัดตัวนั้น 8 วินาที", obey: true },
  { icon: "🛡️", name: "สั่งถอย", cd: 20, detail: "ถอยไปฝั่งปลอดภัย + เกราะ 3 วินาที (ลดดาเมจ 60%)", obey: true },
  { icon: "📣", name: "เชียร์", cd: 0, detail: "แตะรัว ๆ ครบ 30 ครั้ง = ปลาฮึด แรงกัด +15% นาน 5 วินาที", obey: false },
  { icon: "⚡", name: "ไม้ตาย", cd: 0, detail: "กัดและโดนกัดจะชาร์จเกจ เต็มแล้วกดเองได้แรงเต็ม · ไม่กดภายใน 6 วินาที ปลาปล่อยเอง แรง 70%", obey: false },
];

// 🙇 ความเชื่อฟัง
export const obedience = {
  base: 10, max: 30, maxLv: 40, step: 0.5,
  formula: "โอกาสทำตามคำสั่ง % = 10 + 0.5 × เลเวล",
  cost: "อัปด้วยเงิน 100,000 → 10 ล้าน (ไล่ขึ้นแบบทวีคูณ) + ผลึกแร่จากเหมืองแร่ขนมหวาน",
  oreNote: "ทุก 4 เลเวลเปลี่ยนชนิดแร่ จากหาง่ายไปหายากสุด (น้ำตาล → ช็อกโกแลต → … → เพชรน้ำตาลกรวด)",
  note: "มีผลเฉพาะ 🎯 สั่งเล็ง กับ 🛡️ สั่งถอย · เชียร์กับไม้ตายทำงานทุกครั้ง · ทุกคำสั่งติดคูลดาวน์เสมอ",
};

// 🍖 บำรุง + บาดเจ็บ
export const care = {
  perDay: 3, step: 0.2, max: 20, cost: 100000,
  injuryMin: 30,
  healNote: "ป้อนอาหารจากรถเข็นขายอาหารช่วยลดเวลาพักฟื้น (เรทเดียวกับคนสวน) · ระหว่างพัก เอาปลาตัวอื่นลงแทนได้",
};

// ⭐ ดาวปลา (ฟรี ตามจำนวนที่เคยตกได้)
export const stars = {
  steps: [100, 500, 1000, 3000, 10000],
  powerPer: 1, sizePer: 3,
  note: "ได้ฟรีตามจำนวนปลาตัวนั้นที่เคยตกได้ · ดาวละ +1% พลัง ตัวโตขึ้น 3% และมีวงแสงรอบตัวในตู้",
};

// 🔥 ฝึกท่าไม้ตาย
export const skill = {
  maxLv: 5, powerPer: 6, ragePer: 5,
  costs: [
    { lv: 2, pt: 150, ore: "แท่งลูกอมน้ำตาล", n: 5 },
    { lv: 3, pt: 300, ore: "แท่งสตรอว์เบอร์รี่", n: 5 },
    { lv: 4, pt: 500, ore: "แท่งมัทฉะ", n: 4 },
    { lv: 5, pt: 800, ore: "แท่งอมยิ้มสายรุ้ง", n: 3 },
  ],
  note: "ฝึกแยกรายตัว · Lv5 ไม้ตายแรงขึ้น 24% ชาร์จไวขึ้น 20% และมีฉากทองตอนปล่อยท่า",
};

// 🎟️ แต้มสู้
export const points = {
  kill: 10, assist: 4, alive: 1, king: 15, cap: 300, repeatMin: 30,
  note: "ฆ่าหรือช่วยรุมปลาของเจ้าของคนเดิมซ้ำภายใน 30 นาที จะไม่ได้แต้ม (กันปั๊มแต้มกับเพื่อน)",
};

// 🧬 นิสัยปลา
export const traits = {
  total: 30, normal: 24, gold: 6, goldChance: 4.5,
  firstFree: true,
  reroll: "สุ่มใหม่ด้วยผลึกอมยิ้มสายรุ้ง 1 ก้อน",
  samples: [
    { icon: "🔥", name: "ดุดัน", desc: "โอกาสคริติคอล +6%" },
    { icon: "🛡️", name: "หนังหนา", desc: "โดนตีเบาลง 7%" },
    { icon: "💨", name: "ว่องไว", desc: "หลบการกัด +5%" },
    { icon: "💜", name: "ดูดพลัง", desc: "ฟื้นเลือด 5% ของแรงกัดที่ทำได้" },
    { icon: "🌵", name: "หนามแหลม", desc: "สะท้อนแรงกัด 10% กลับใส่คนกัด" },
    { icon: "🗿", name: "ล้มบัลลังก์", desc: "ตีราชาบ่อแรงขึ้น 20%" },
  ],
  goldSamples: [
    { icon: "🌟", name: "อมตะ", desc: "โดนตีตายครั้งแรก = รอดเหลือ 1 เลือด + โล่ 2 วินาที" },
    { icon: "👑", name: "จักรพรรดิ", desc: "แรงขึ้น 8% และโดนตีเบาลง 6%" },
    { icon: "⚡", name: "สายฟ้าแลบ", desc: "เกจไม้ตายไว +40% ไม้ตายแรงขึ้น 10%" },
    { icon: "🐦", name: "ฟีนิกซ์", desc: "ไม่โดนตีฟื้น 1.2%/วิ · ฆ่าได้ฟื้นอีก 20%" },
    { icon: "💀", name: "เงามรณะ", desc: "คริติคอล +12% และคริแรงขึ้น +50%" },
    { icon: "🗻", name: "ไททัน", desc: "เลือด +18% โดนตีเบาลง 8% แต่ช้าลง 4%" },
  ],
};

// 🌈 ออร่า
export const auras = { total: 30, priceMin: 400, priceMax: 2500, note: "ของตกแต่งล้วน ไม่เพิ่มพลัง · แลกด้วยแต้มสู้ครั้งเดียว ใส่ให้ปลาตัวไหนก็ได้ ทุกคนเห็นตอนปลาสู้" };

// 🎁 ของตกในตู้ระหว่างสู้
export const drops = {
  everySec: [45, 80], lifeSec: 25, max: 2,
  need: "เฉพาะตอนมีปลาในบ่อ 2 ตัวขึ้นไป",
  list: [
    { icon: "❤️", name: "ยาฟื้นเลือด" },
    { icon: "⚡", name: "เกจไม้ตาย" },
    { icon: "🛡️", name: "โล่ฟองน้ำ" },
    { icon: "🔥", name: "ฮึดสุดตัว" },
    { icon: "💨", name: "ครีบไว" },
    { icon: "💥", name: "ระเบิดฟอง" },
    { icon: "🎟️", name: "แต้มสู้ +3" },
  ],
  note: "ปลาตัวแรกที่ว่ายไปชนได้ของ · เจ้าของกด 🎯 แล้วแตะของ สั่งให้ปลาไปเก็บได้",
};

// 👑 ราชาบ่อ / ฆ่าตัวท้าย / คู่แต่งงาน
export const rules = [
  { icon: "👑", title: "ราชาบ่อ", desc: "ปลาที่ฆ่าได้เยอะสุดในบ่อคือราชา · ใครล้มได้ขึ้นประกาศใหญ่ที่ป้ายเหนือตู้ และได้แต้มสู้ +15" },
  { icon: "💀", title: "ฆ่าตัวท้ายได้เปรียบ", desc: "คนที่กัดทีสุดท้ายได้ยอดฆ่า + ฟื้นเลือด 15% + ดูดวิญญาณ (แรงกัด +4% ซ้อนได้ 3 ชั้น)" },
  { icon: "💍", title: "คู่แต่งงานช่วยกัน", desc: "ถ้ามีปลาคนอื่นอยู่ในบ่อ ปลาของคู่แต่งงานมีโอกาส 70% ที่จะเลือกไปรุมคนอื่นด้วยกัน — แต่ก็ยังกัดกันเองได้" },
  { icon: "🩹", title: "แพ้แล้วพักฟื้น 30 นาที", desc: "ปลาที่ตายเด้งออกจากบ่อและพัก 30 นาที · ป้อนอาหารรถเข็นช่วยร่นเวลาได้ · ระหว่างนั้นเอาตัวอื่นลงแทนได้" },
];

// 🧸 ตุ๊กตาปลารุ้ง — ร้านแลกด้วยแต้มสู้ (ต้องเคยตกปลาตัวนั้นได้ · ตัวละ 1 ครั้ง)
export const dollShop = {
  need: "ต้องเคยตกปลาตัวนั้นได้ก่อน",
  once: "แลกได้ตัวละ 1 ครั้ง",
  priceNote: "ราคาไล่ตามความหายาก 300 → 1,500 แต้มสู้",
};

export const dolls = [
  { id: "FPDoll_wokfire", fish: "ปลารุ้งเชฟรถเข็น", role: "bruiser", special: "🍳 ผัดไฟแลบ", power: 133.3, price: 1500 },
  { id: "FPDoll_geyser", fish: "ปลาวาฬน้อยลอยลม", role: "tank", special: "🐳 น้ำพุยักษ์", power: 133.3, price: 1500 },
  { id: "FPDoll_charge", fish: "ปลาเจ้าทุยลุยแหลก", role: "tank", special: "🐃 เขาควายพุ่งชน", power: 131.5, price: 1450 },
  { id: "FPDoll_heartbomb", fish: "ปลาบอลลูนหวานใจ", role: "control", special: "🎈 ระเบิดหวานใจ", power: 130, price: 1400 },
  { id: "FPDoll_swap", fish: "ปลาถังขยะจอมแกล้ง", role: "control", special: "🗑️ สลับที่แกล้ง", power: 128.6, price: 1350 },
  { id: "FPDoll_totem", fish: "ปลาโทเทมเรียกทรัพย์", role: "tank", special: "🗿 ปักโทเทม", power: 128.6, price: 1350 },
  { id: "FPDoll_web", fish: "ปลาใยแมงมุมโหนลม", role: "assassin", special: "🕸️ ใยตรึง", power: 128.6, price: 1350 },
  { id: "FPDoll_flush", fish: "ปลารารวดอึ", role: "control", special: "🚽 ชักโครก", power: 128.6, price: 1350 },
  { id: "FPDoll_duckmissile", fish: "ปลาราเร็ดก้าบก้าบ", role: "control", special: "🦆 ขีปนาวุธเป็ด", power: 128.6, price: 1350 },
  { id: "FPDoll_flash", fish: "ปลารุ้งกรอบรูปวิบวับ", role: "control", special: "📸 แฟลชหยุดภาพ", power: 128.6, price: 1350 },
  { id: "FPDoll_pinball", fish: "ปลารุ้งกีวีเลือด", role: "assassin", special: "🥝 ลูกกีวีหนามเด้ง", power: 128.6, price: 1350 },
  { id: "FPDoll_ducklings", fish: "ปลารุ้งกุ๊กเป็ด", role: "support", special: "🐥 กองทัพลูกเป็ด", power: 128.6, price: 1350 },
  { id: "FPDoll_uwu", fish: "ปลารุ้งคิ้วท์ยูวู", role: "support", special: "🥺 uwu ระเบิดความน่ารัก", power: 128.6, price: 1350 },
  { id: "FPDoll_swarm", fish: "ปลารุ้งผึ้งน้อย", role: "control", special: "🐝 ฝูงผึ้ง", power: 128.6, price: 1350 },
  { id: "FPDoll_paint", fish: "ปลารุ้งพ่อค้าภาพวาด", role: "control", special: "🎨 สาดสี", power: 128.6, price: 1350 },
  { id: "FPDoll_ninelives", fish: "ปลารุ้งแมวเหมียว", role: "assassin", special: "🐱 เก้าชีวิต", power: 128.6, price: 1350 },
  { id: "FPDoll_steal", fish: "ปลารุ้งแรคคูนซน", role: "assassin", special: "🦝 ขโมยพลัง", power: 128.6, price: 1350 },
  { id: "FPDoll_seedshot", fish: "ปลารุ้งสตรอว์เบอร์รี่โอวโอ", role: "assassin", special: "🍓 ยิงเมล็ดกระจาย", power: 128.6, price: 1350 },
  { id: "FPDoll_howl", fish: "ปลารุ้งหมาโฮ่งโฮ่ง", role: "bruiser", special: "🐶 หอนขู่", power: 128.6, price: 1350 },
  { id: "FPDoll_honeyhug", fish: "ปลารุ้งหมีน้ำผึ้ง", role: "tank", special: "🍯 กอดหมีน้ำผึ้ง", power: 128.6, price: 1350 },
  { id: "FPDoll_groundpound", fish: "ปลารุ้งหมูอู๊ดอู๊ด", role: "tank", special: "🐷 หมูเด้งทุบพื้น", power: 128.6, price: 1350 },
  { id: "FPDoll_snowball", fish: "ปลารุ้งหิมะจอมปา", role: "control", special: "☃️ ปาหิมะชุด", power: 128.6, price: 1350 },
  { id: "FPDoll_ricochet", fish: "ปลาลูกหนังจอมพลัง", role: "bruiser", special: "⚽ ยิงลูกเด้ง", power: 128.6, price: 1350 },
  { id: "FPDoll_mimic", fish: "ปลาหีบทองเรียกน้ำใจ", role: "tank", special: "💰 หีบมิมิค", power: 128.6, price: 1350 },
  { id: "FPDoll_rockets", fish: "ปลาเหล็กน้อยลอยเจ็ต", role: "assassin", special: "🚀 จรวดชุด", power: 128.6, price: 1350 },
  { id: "FPDoll_bubble", fish: "ปลาฟองสบู่ฟรุ้งฟริ้ง", role: "control", special: "🔮 กักฟอง", power: 126.3, price: 1250 },
  { id: "FPDoll_heartcannon", fish: "เรือน้อยคอยรักสีรุ้ง", role: "control", special: "💘 ปืนใหญ่หัวใจ", power: 119.6, price: 1000 },
  { id: "FPDoll_blackhole", fish: "วาฬจักรวาลสีรุ้ง", role: "tank", special: "🌌 หลุมดำ", power: 119.6, price: 1000 },
  { id: "FPDoll_spirits", fish: "ปลาคราฟจักรพรรดิ์เรนโบว์", role: "bruiser", special: "👑 ราชโองการ", power: 114.3, price: 800 },
  { id: "FPDoll_cry", fish: "ปลาSadNoob", role: "bruiser", special: "😭 โนบฮึด", power: 114.3, price: 800 },
  { id: "FPDoll_gift", fish: "ถึงไม่ใช่ซานต้าแต่คืนวันที่25ไปหาได้นะ", role: "support", special: "🎁 ของขวัญสุ่ม", power: 107.7, price: 600 },
  { id: "FPDoll_pumpkin", fish: "ปลาแจ็กโอแลนเทิร์น", role: "control", special: "🎃 ฟักทองผี", power: 107.7, price: 600 },
  { id: "FPDoll_watergun", fish: "ปลาลาลืนฉีดน้ำ", role: "control", special: "🔫 ฉีดน้ำแรงดันสูง", power: 107.7, price: 600 },
  { id: "FPDoll_cake", fish: "HBD Admin Boat", role: "bruiser", special: "🎂 เค้กระเบิด", power: 107.7, price: 600 },
  { id: "FPDoll_freeze", fish: "กุ้งแช่สีรุ้ง", role: "assassin", special: "❄️ แช่แข็ง", power: 105.3, price: 500 },
  { id: "FPDoll_tongue", fish: "เขียดตะปาดขาดวิตามิน", role: "assassin", special: "🐸 ลิ้นดึง", power: 105.3, price: 500 },
  { id: "FPDoll_tentacle", fish: "คราเคนเจ็ดสี", role: "tank", special: "🐙 หนวดรัด", power: 105.3, price: 500 },
  { id: "FPDoll_gas", fish: "ปลากระป๋องหมดอายุ", role: "control", special: "🥫 แก๊สบูด", power: 105.3, price: 500 },
  { id: "FPDoll_crow", fish: "ปลาไก่โอ้คสีรุ้ง", role: "bruiser", special: "🐓 เอ้กอี้เอ้กเอ้ก", power: 105.3, price: 500 },
  { id: "FPDoll_clone", fish: "ปลาทังก้าปลาทังกี้", role: "control", special: "👯 แยกร่าง", power: 105.3, price: 500 },
  { id: "FPDoll_dazzle", fish: "ปลาสุดหล่อมองท่อไม่มองทาง", role: "assassin", special: "✨ หล่อจนแสบตา", power: 105.3, price: 500 },
  { id: "FPDoll_peace", fish: "ปลาฮิปปี้สีรุ้ง", role: "support", special: "☮️ พีซแอนด์เลิฟ", power: 105.3, price: 500 },
  { id: "FPDoll_dance", fish: "ปลาTeenสีรุ้ง", role: "control", special: "💃 สเต็ปแดนซ์", power: 105.3, price: 500 },
  { id: "FPDoll_breath", fish: "มังกรมหาเทพรุ้ง", role: "bruiser", special: "🐉 พ่นไฟรุ้ง", power: 105.3, price: 500 },
  { id: "FPDoll_venom", fish: "ราชานาคเรนโบว์", role: "bruiser", special: "🐍 พ่นพิษนาค", power: 105.3, price: 500 },
  { id: "FPDoll_mark", fish: "StampSatangFish", role: "control", special: "📮 ประทับตรา", power: 105.3, price: 500 },
  { id: "FPDoll_slide", fish: "เพนกวินจักรพรรดิ์สีรุ้ง", role: "bruiser", special: "🐧 สไลด์ท้อง", power: 100, price: 300 },
];

export const dollByRole = (role) => dolls.filter((d) => d.role === role);
export const dollCount = dolls.length;
