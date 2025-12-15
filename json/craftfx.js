export const LEVELS = [
  { lv: 1, name: 'Trail Feet White', desc: 'เส้นลมวิ่ง ซ้ายขวา สีขาว', baseChance: 0.60, reqLevel: 20, costMoney: 50000, costFishing: 50, effectType: 'TRAIL_FEET_White' },
  { lv: 2, name: 'Trail Feet Green', desc: 'เส้นลมวิ่ง ซ้ายขวา เขียว', baseChance: 0.58, reqLevel: 20, costMoney: 50000, costFishing: 50, effectType: 'TRAIL_FEET_Green' },
  { lv: 3, name: 'Trail Feet Blue', desc: 'เส้นลมวิ่ง ซ้ายขวา ฟ้า', baseChance: 0.56, reqLevel: 20, costMoney: 50000, costFishing: 50, effectType: 'TRAIL_FEET_Blue' },
  { lv: 4, name: 'Trail Feet Pink', desc: 'เส้นลมวิ่ง ซ้ายขวา ชมพู', baseChance: 0.54, reqLevel: 20, costMoney: 50000, costFishing: 50, effectType: 'TRAIL_FEET_Pink' },

  { lv: 5, name: 'Spark Steps White', desc: 'ประกายสปาร์คตอนก้าวเท้า สีขาว', baseChance: 0.50, reqLevel: 50, costMoney: 100000, costFishing: 100, effectType: 'SPARK_STEPS_White' },
  { lv: 6, name: 'Spark Steps Green', desc: 'ประกายสปาร์คตอนก้าวเท้า เขียว', baseChance: 0.48, reqLevel: 50, costMoney: 100000, costFishing: 100, effectType: 'SPARK_STEPS_Green' },
  { lv: 7, name: 'Spark Steps Blue', desc: 'ประกายสปาร์คตอนก้าวเท้า ฟ้า', baseChance: 0.46, reqLevel: 50, costMoney: 100000, costFishing: 100, effectType: 'SPARK_STEPS_Blue' },
  { lv: 8, name: 'Spark Steps Pink', desc: 'ประกายสปาร์คตอนก้าวเท้า ชมพู', baseChance: 0.44, reqLevel: 50, costMoney: 100000, costFishing: 100, effectType: 'SPARK_STEPS_Pink' },

  { lv: 9, name: 'Wind Ring White', desc: 'วงลมใต้ตัว สีขาว', baseChance: 0.40, reqLevel: 100, costMoney: 200000, costFishing: 150, effectType: 'WIND_RING_White' },
  { lv: 10, name: 'Wind Ring Green', desc: 'วงลมใต้ตัว เขียว', baseChance: 0.38, reqLevel: 100, costMoney: 200000, costFishing: 150, effectType: 'WIND_RING_Green' },
  { lv: 11, name: 'Wind Ring Blue', desc: 'วงลมใต้ตัว ฟ้า', baseChance: 0.36, reqLevel: 100, costMoney: 200000, costFishing: 150, effectType: 'WIND_RING_Blue' },
  { lv: 12, name: 'Wind Ring Pink', desc: 'วงลมใต้ตัว ชมพู', baseChance: 0.34, reqLevel: 100, costMoney: 200000, costFishing: 150, effectType: 'WIND_RING_Pink' },

  { lv: 13, name: 'Dust Burst White', desc: 'ฝุ่นปะทุเป็นจังหวะ สีขาว', baseChance: 0.30, reqLevel: 500, costMoney: 300000, costFishing: 200, effectType: 'DUST_BURST_White' },
  { lv: 14, name: 'Dust Burst Green', desc: 'ฝุ่นปะทุเป็นจังหวะ เขียว', baseChance: 0.28, reqLevel: 500, costMoney: 300000, costFishing: 200, effectType: 'DUST_BURST_Green' },
  { lv: 15, name: 'Dust Burst Blue', desc: 'ฝุ่นปะทุเป็นจังหวะ ฟ้า', baseChance: 0.26, reqLevel: 500, costMoney: 300000, costFishing: 200, effectType: 'DUST_BURST_Blue' },
  { lv: 16, name: 'Dust Burst Pink', desc: 'ฝุ่นปะทุเป็นจังหวะ ชมพู', baseChance: 0.24, reqLevel: 500, costMoney: 300000, costFishing: 200, effectType: 'DUST_BURST_Pink' },

  { lv: 17, name: 'Heart Runner White', desc: 'รอยเท้ารูปหัวใจ สีขาว', baseChance: 0.20, reqLevel: 1000, costMoney: 400000, costFishing: 250, effectType: 'HEART_White' },
  { lv: 18, name: 'Heart Runner Green', desc: 'รอยเท้ารูปหัวใจ เขียว', baseChance: 0.18, reqLevel: 1000, costMoney: 400000, costFishing: 250, effectType: 'HEART_Green' },
  { lv: 19, name: 'Heart Runner Blue', desc: 'รอยเท้ารูปหัวใจ ฟ้า', baseChance: 0.16, reqLevel: 1000, costMoney: 400000, costFishing: 250, effectType: 'HEART_Blue' },
  { lv: 20, name: 'Heart Runner Pink', desc: 'รอยเท้ารูปหัวใจ ชมพู', baseChance: 0.14, reqLevel: 1000, costMoney: 400000, costFishing: 250, effectType: 'HEART_Pink' },

  { lv: 21, name: 'Aura Runner White', desc: 'ออร่าหมอกรอบตัว สีขาว', baseChance: 0.10, reqLevel: 1500, costMoney: 500000, costFishing: 300, effectType: 'AURA_White' },
  { lv: 22, name: 'Aura Runner Green', desc: 'ออร่าหมอกรอบตัว เขียว', baseChance: 0.08, reqLevel: 1500, costMoney: 500000, costFishing: 300, effectType: 'AURA_Green' },
  { lv: 23, name: 'Aura Runner Blue', desc: 'ออร่าหมอกรอบตัว ฟ้า', baseChance: 0.06, reqLevel: 1500, costMoney: 500000, costFishing: 300, effectType: 'AURA_Blue' },
  { lv: 24, name: 'Aura Runner Pink', desc: 'ออร่าหมอกรอบตัว ชมพู', baseChance: 0.04, reqLevel: 1500, costMoney: 500000, costFishing: 300, effectType: 'AURA_Pink' },
]

export const craftgiveitem = [
    { craftlevel: "10", itemname: "โคมไฟเหลืองพกพา", itemimage: "/images/items/LanternyellowTool.png" },
    { craftlevel: "15", itemname: "ป้ายปักพื้น", itemimage: "/images/items/CustomSignTextTool.png" },
    { craftlevel: "20", itemname: "ตบแสงสี", itemimage: "/images/items/Slapcolorflash.png" }, 
] 