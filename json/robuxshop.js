// สินค้าที่ขายด้วย Robux (จาก Config.shopItems / shopMoney + Developer Products พิเศษ)
// price = ราคา Robux (ราคาเต็ม) • pid = gamepass id (ใช้ดึงรูปพาสจริง) • iconId = rbxassetid ไอคอน
// เรทแปลงเป็นบาท: THB = ceil( รวม Robux ทั้งหมด / RATE )
export const RATE = 6;

export const shopCategories = [
  { key: "gamepass", label: "เกมพาส", emoji: "🎟️" },
  { key: "limited", label: "ลิมิเต็ด", emoji: "💎" },
  { key: "currency", label: "เติมเงินในเกม", emoji: "💰" },
  { key: "special", label: "พิเศษ (เพ็ท/ตั๋ว)", emoji: "✨" },
];

export const robuxItems = [
  // ===== gamepass ===== (pid = gamepass id → รูปพาสจริง)
  { id: "gp-vip", cat: "gamepass", pid: 1373421368, name: "VIP", desc: "มงกุฎ • เลเวล ×2 • เบ็ดลิมิเต็ด • โชค ×3 • เงิน&คะแนน ×2", price: 199, iconId: 98214942625909 },
  { id: "gp-autofish", cat: "gamepass", pid: 1613785479, name: "Auto Fishing", desc: "ตกปลาออโต้ (AFK ได้ไม่เกิน 20 นาที)", price: 222, iconId: 109883680838444 },
  { id: "gp-boombox", cat: "gamepass", pid: 1380714316, name: "Boombox", desc: "เปิดเพลง/แชร์เพลงในเกม", price: 129, iconId: 122485801028133 },
  { id: "gp-body", cat: "gamepass", pid: 1380168483, name: "Custom Body", desc: "ปรับขนาดตัวได้", price: 99, iconId: 76389870188513 },
  { id: "gp-tags", cat: "gamepass", pid: 1380882236, name: "Special Tags", desc: "ชื่อสีรุ้ง + สีพิเศษเพิ่ม", price: 89, iconId: 118256809810152 },
  { id: "gp-scissors", cat: "gamepass", pid: 1417958249, name: "Scissors", desc: "สกิลตัดผม AOE + FX", price: 219, iconId: 95577967778214 },
  { id: "gp-cambo", cat: "gamepass", pid: 1638407275, name: "Change Skin Cambo", desc: "เปลี่ยนสกินคนอื่นเป็นสไตล์กัมพูชา", price: 299, iconId: 81060982407465 },
  { id: "gp-banana", cat: "gamepass", pid: 1510751188, name: "Banana Peel", desc: "วางเปลือกกล้วยให้คนลื่น 🍌", price: 499, iconId: 123087290261249 },

  // ===== limited ===== (pid = gamepass id → รูปพาสจริง)
  { id: "lm-wing", cat: "limited", pid: 1447030821, name: "Wing Fly", desc: "บินได้ + ชื่อ Rich", price: 4900, iconId: 124858614324199 },
  { id: "lm-cloud", cat: "limited", pid: 1438076864, name: "Cloud Fly", desc: "บินได้ + ชื่อ Rich", price: 4900, iconId: 121434264300181 },
  { id: "lm-broom", cat: "limited", pid: 1446760866, name: "Broom Fly", desc: "บินได้ + ชื่อ Rich", price: 4900, iconId: 138181002324866 },
  { id: "lm-ice", cat: "limited", pid: 1896216550, name: "Ice Wings", desc: "บินได้ + ชื่อ Rich", price: 4900, iconId: 74455059183224 },
  { id: "lm-hwballoon", cat: "limited", pid: 1508966602, name: "Halloween Balloon Fly", desc: "บินได้ + ชื่อ Rich", price: 4900, iconId: 108399408848013 },
  { id: "lm-luckyhwrod", cat: "limited", pid: 1489316966, name: "เบ็ดฮัลโลวีนพรีเมี่ยม", desc: "ตกปลาเร็วมาก + โชค (ของซีซั่นฮัลโลวีน)", price: 399, iconId: 87565868981920 },
  { id: "lm-hwmotor", cat: "limited", pid: 1529625904, name: "อัญเชิญมอไซค์ฮัลโลวีน", desc: "มอเตอร์ไซค์ฮัลโลวีน (ของซีซั่น)", price: 289, iconId: 102648485950828 },
  { id: "lm-kratong", cat: "limited", pid: 1488597106, name: "กระทงหลงเธอ (Kratong Pass)", desc: "กระทงลอยน้ำ (ของซีซั่นลอยกระทง)", price: 149, iconId: 110361376903079 },
  { id: "lm-torchlim", cat: "limited", pid: 1410732658, name: "Torch Limited", desc: "สปีด 200 กระโดด 150 มี 3 โหมด", price: 2499, iconId: 116976362590999 },
  { id: "lm-motorhorse", cat: "limited", pid: 1630003660, name: "Motor Horse", desc: "ขี่ม้า", price: 1599, iconId: 108287418267309 },
  { id: "lm-fishtankM", cat: "limited", pid: 1581257954, name: "Fish Tank กลาง (Pass)", desc: "ตู้ปลา+tag Super", price: 7499, iconId: 82048517693322 },
  { id: "lm-fishtankS", cat: "limited", pid: 1581468020, name: "Fish Tank เล็ก (Pass)", desc: "ตู้ปลา 2 คน", price: 899, iconId: 113687496116160 },
  { id: "lm-glowstick", cat: "limited", pid: 1634875252, name: "Glow Stick", desc: "สปีด 90 + เปลี่ยนสีเทรลได้", price: 699, iconId: 81474986161148 },
  { id: "lm-torch", cat: "limited", pid: 1411076551, name: "Torch", desc: "สปีด 80", price: 599, iconId: 125052848831860 },
  { id: "lm-guitar", cat: "limited", pid: 1542376831, name: "Guitar", desc: "เล่นกีตาร์ Fingerstyle", price: 550, iconId: 1521187259 },
  { id: "lm-ball", cat: "limited", pid: 1542326998, name: "Ball Tool", desc: "ลูกบอลขี่ได้", price: 490, iconId: 71209117076212 },
  { id: "lm-warp", cat: "limited", pid: 1898929856, name: "📱 ขอวาร์ป (โทรศัพท์)", desc: "วาร์ปไปหาเพื่อนผ่านโทรศัพท์", price: 399, iconId: 104743700737309 },
  { id: "lm-candyrod", cat: "limited", pid: 1600898934, name: "Candy Rod", desc: "ตกปลาเร็วมาก + เงิน", price: 399, iconId: 138661100973723 },
  { id: "lm-snowrod", cat: "limited", pid: 1602840663, name: "Snow Rod", desc: "ตกปลาเร็วมาก + โชค", price: 399, iconId: 72299355108686 },
  { id: "lm-slipper", cat: "limited", pid: 1605086164, name: "Slipper Slap", desc: "ตบรองเท้าแตะ เร็วและไกล", price: 399, iconId: 90114476000868 },
  { id: "lm-spin", cat: "limited", pid: 1396879665, name: "Slap Spin", desc: "สกิลจอหมุน", price: 349, iconId: 93346024361483 },
  { id: "lm-slowmo", cat: "limited", pid: 1573912696, name: "Slap Slowmo", desc: "สกิลจอเบลอ", price: 349, iconId: 129600872196816 },
  { id: "lm-blind", cat: "limited", pid: 1394008391, name: "Slap Blind", desc: "สกิลจอดำ", price: 249, iconId: 81150924795556 },
  { id: "lm-chairdevil", cat: "limited", pid: 1530403520, name: "Chair Devil (Premium)", desc: "เก้าอี้ปีศาจลิมิเต็ด", price: 189, iconId: 112895200729221 },
  { id: "lm-video", cat: "limited", pid: 1900069805, name: "📱 วิดีโอคอล (โทรศัพท์)", desc: "วิดีโอคอลผ่านโทรศัพท์", price: 99, iconId: 104799590111664 },

  // ===== currency (Developer Product — ใช้ iconId ดึงรูป) =====
  { id: "cur-10k", cat: "currency", name: "เงิน 10,000", desc: "เติมเงินในเกม 10K", price: 49, iconId: 135877309593299 },
  { id: "cur-100k", cat: "currency", name: "เงิน 100,000 + โบนัส 5,000", desc: "รวม 105,000", price: 499, iconId: 105450751643004 },
  { id: "cur-500k", cat: "currency", name: "เงิน 500,000 + โบนัส 50,000", desc: "รวม 550,000", price: 2499, iconId: 94384303293747 },
  { id: "cur-1m", cat: "currency", name: "เงิน 1,000,000 + โบนัส 200,000", desc: "รวม 1,200,000", price: 4999, iconId: 71576969720066 },

  // ===== special (Developer Products: เพ็ท + ตั๋วครอบครัว — ใช้ iconId ดึงรูป) =====
  { id: "sp-hax", cat: "special", name: "👾 แฮคเกอร์ (Haxigator)", desc: "เพ็ทอีเวนต์ • โชคปลา+เงินตกปลา+แฮคแอร์ดรอป", price: 799, iconId: 97263485065784 },
  { id: "sp-404", cat: "special", name: "👹 404 เดมอน", desc: "เพ็ทตำนาน • ตีบอส+โชคปลา+เงิน+แฮคแอร์ดรอป", price: 4999, iconId: 128134502313859 },
  { id: "sp-famcreate", cat: "special", name: "🏠 ตั๋วสร้างครอบครัว", desc: "สร้างครอบครัวของคุณเอง", price: 999, iconId: 103823514654103 },
  { id: "sp-famexpand", cat: "special", name: "➕ ตั๋วขยายครอบครัว", desc: "เพิ่มจำนวนสมาชิก", price: 599, iconId: 83662337440888 },
  { id: "sp-marry", cat: "special", name: "💍 ตั๋วขอแต่งงาน", desc: "ขอแต่งงานกับคนที่ใช่", price: 599, iconId: 118885569257669 },
];
