"use client";

import { useState } from "react";

/**
 * รูปไอเทม: ลองโหลดรูป local ก่อน ถ้าโหลดไม่ได้ค่อย fallback เป็น emoji
 * props: img (path หรือ undefined), emoji (fallback), alt, className
 */
export default function AssetIcon({ img, emoji = "🎁", alt = "", className = "" }) {
  const [failed, setFailed] = useState(false);
  const showImg = img && !failed;

  return (
    <div
      className={
        "relative flex flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-pink-500/30 via-fuchsia-500/20 to-slate-900 " +
        className
      }
    >
      {showImg ? (
        <img
          src={img}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-2xl leading-none">{emoji}</span>
      )}
    </div>
  );
}
