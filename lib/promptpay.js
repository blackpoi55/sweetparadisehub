// สร้าง payload มาตรฐาน PromptPay (EMVCo) จากเบอร์/เลขบัตร + ยอดเงิน
// เอา payload นี้ไปทำ QR ได้เลย (ใช้กับ lib qrcode)

function crc16(data) {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function field(id, value) {
  const v = String(value);
  return id + String(v.length).padStart(2, "0") + v;
}

function sanitizeTarget(id) {
  const digits = String(id).replace(/[^0-9]/g, "");
  if (digits.length >= 13) return { tag: "02", value: digits }; // เลขบัตรประชาชน
  // เบอร์มือถือ → 66 + เบอร์ (ตัด 0 หน้า) เติม 0 ให้ครบ 13 หลัก
  const phone = ("0000000000000" + digits.replace(/^0/, "66")).slice(-13);
  return { tag: "01", value: phone };
}

/**
 * สร้าง payload PromptPay
 * @param {string} target เบอร์มือถือ หรือ เลขบัตรประชาชน
 * @param {number} amount ยอดเงิน (บาท) — ถ้าไม่ใส่ = QR แบบไม่ระบุยอด
 */
export function promptPayPayload(target, amount) {
  const t = sanitizeTarget(target);
  const merchant = field("00", "A000000677010111") + field(t.tag, t.value);
  const hasAmount = amount != null && Number(amount) > 0;

  let payload =
    field("00", "01") + // เวอร์ชัน
    field("01", hasAmount ? "12" : "11") + // 12 = ระบุยอด, 11 = ไม่ระบุ
    field("29", merchant) +
    field("53", "764") + // สกุลเงิน THB
    (hasAmount ? field("54", Number(amount).toFixed(2)) : "") +
    field("58", "TH"); // ประเทศ

  payload += "6304"; // ตัวคั่น CRC
  return payload + crc16(payload);
}
