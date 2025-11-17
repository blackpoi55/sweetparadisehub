export default function RulesPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden rounded-3xl border border-pink-500/30 bg-black">
      {/* BG */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-10">
        {/* Header */}
        <header className="mb-6 md:mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/50 bg-black/70 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-300">
            Sweet Paradise • Rules
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
            กฎการเล่นใน <span className="text-pink-300">Sweet Paradise</span>
          </h1>
          <p className="mt-3 text-sm text-pink-100/85 md:text-base">
            เพื่อให้ทุกคนเล่นได้อย่างสบายใจ สนุก และปลอดภัย
            โปรดอ่านกฎเหล่านี้ก่อนเล่นและปฏิบัติตามอย่างเคร่งครัด 💖
          </p>
        </header>

        {/* กฎการเล่น */}
        <section className="rounded-2xl border border-pink-500/40 bg-black/80 p-5 shadow-sm md:p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-500 text-lg">
              📜
            </div>
            <div>
              <h2 className="text-sm font-semibold text-pink-50 md:text-base">
                กฎการเล่นภายในแมพ
              </h2>
              <p className="text-[11px] text-pink-200/80 md:text-xs">
                การอยู่ร่วมกันอย่างเคารพกันและกันคือหัวใจของ Sweet Paradise
              </p>
            </div>
          </div>

          <ol className="space-y-3 text-sm text-pink-50 md:text-[15px]">
            <li className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-pink-500/30 text-[11px] font-semibold text-pink-100">
                1
              </span>
              <div>
                <span className="font-semibold text-pink-200">
                  ห้ามใช้อาวุธซีซั่นทุกชนิดเพื่อรังแกผู้อื่น
                </span>
                <p className="mt-1 text-[13px] text-pink-200/90">
                  อาวุธซีซั่นมีไว้เพื่อความสนุก และเล่นกันแบบขำ ๆ เท่านั้น
                  ห้ามใช้เพื่อกลั่นแกล้ง ทำให้คนอื่นหัวร้อน
                  หรือสร้างประสบการณ์แย่ให้ผู้เล่นคนอื่น
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-pink-500/30 text-[11px] font-semibold text-pink-100">
                2
              </span>
              <div>
                <span className="font-semibold text-pink-200">
                  ห้ามก่อความวุ่นวายภายในแมพ และนอกแมพที่ส่งผลกระทบต่อแมพ
                </span>
                <p className="mt-1 text-[13px] text-pink-200/90">
                  ห้ามสร้างดราม่า ปั่นให้คนตีกัน
                  หรือทำกิจกรรมใด ๆ ที่ทำให้ชื่อเสียงหรือบรรยากาศของ
                  Sweet Paradise แย่ลง ทั้งในเกมและชุมชนภายนอก
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-pink-500/30 text-[11px] font-semibold text-pink-100">
                3
              </span>
              <div>
                <span className="font-semibold text-pink-200">
                  ห้าม Toxic หรือ Sexual ใส่ผู้เล่นที่ไม่ยินยอม
                </span>
                <p className="mt-1 text-[13px] text-pink-200/90">
                  ห้ามด่า เหยียด แซะแรง ๆ ปั่นให้คนรู้สึกแย่
                  รวมถึงมุกลามก/เชิงเพศที่อีกฝ่ายไม่โอเค
                  หากอีกฝ่ายบอกไม่ชอบ ให้หยุดทันที
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-pink-500/30 text-[11px] font-semibold text-pink-100">
                4
              </span>
              <div>
                <span className="font-semibold text-pink-200">
                  ห้ามใช้บัคเพื่อผลประโยชน์
                </span>
                <p className="mt-1 text-[13px] text-pink-200/90">
                  ห้ามใช้บัคเพื่อฟาร์มเงิน ฟาร์มปลา ฟาร์มไอเท็ม
                  หรือเอาเปรียบระบบในทางที่เสียหาย
                  <br />
                  บางบัคที่ใช้เล่นสนุกกับเพื่อน ๆ
                  โดยไม่กระทบเศรษฐกิจเกมหรือผู้เล่นคนอื่น
                  แอดมินอาจอนุญาตเป็นกรณี ๆ ไป
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-pink-500/30 text-[11px] font-semibold text-pink-100">
                5
              </span>
              <div>
                <span className="font-semibold text-pink-200">
                  การตัดสินใจของแอดมินถือเป็นที่สุด
                </span>
                <p className="mt-1 text-[13px] text-pink-200/90">
                  เมื่อแอดมินตรวจสอบเหตุการณ์และสรุปผลแล้ว
                  ให้ถือว่าคำตัดสินนั้นเป็นข้อยุติ
                  เพื่อความเป็นระเบียบและความยุติธรรมของทุกคน
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-pink-500/30 text-[11px] font-semibold text-pink-100">
                6
              </span>
              <div>
                <span className="font-semibold text-pink-200">
                  แอดมินสามารถตัดสินโทษได้ตามเหตุการณ์ แม้จะไม่มีในกฎ
                </span>
                <p className="mt-1 text-[13px] text-pink-200/90">
                  บางสถานการณ์อาจไม่ถูกเขียนไว้ชัดเจนในกฎ
                  แต่ถ้าเป็นการกระทำที่ส่งผลเสียต่อแมพหรือชุมชน
                  แอดมินมีสิทธิ์ประเมินและลงโทษตามความเหมาะสม
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* บทลงโทษ */}
        <section className="mt-8 rounded-2xl border border-pink-500/40 bg-black/80 p-5 shadow-sm md:mt-9 md:p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-pink-500 text-lg">
              ⚖️
            </div>
            <div>
              <h2 className="text-sm font-semibold text-pink-50 md:text-base">
                บทลงโทษ
              </h2>
              <p className="text-[11px] text-pink-200/80 md:text-xs">
                ระดับโทษขึ้นอยู่กับความรุนแรงของการกระทำ
                และประวัติการกระทำผิดในอดีต
              </p>
            </div>
          </div>

          <ul className="space-y-3 text-sm text-pink-50 md:text-[15px]">
            <li className="flex gap-3">
              <span className="mt-1 text-base">•</span>
              <div>
                <span className="font-semibold text-pink-200">
                  ตักเตือน
                </span>
                <p className="mt-1 text-[13px] text-pink-200/90">
                  สำหรับการทำผิดเล็กน้อยหรือครั้งแรก
                  แอดมินจะเตือนให้ปรับพฤติกรรมก่อน
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="mt-1 text-base">•</span>
              <div>
                <span className="font-semibold text-pink-200">
                  ยึดไอเท็ม
                </span>
                <p className="mt-1 text-[13px] text-pink-200/90">
                  ในกรณีใช้ไอเท็มผิดวัตถุประสงค์
                  หรือได้ไอเท็มมาจากการใช้บัค / เอาเปรียบระบบ
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="mt-1 text-base">•</span>
              <div>
                <span className="font-semibold text-amber-300">
                  โทษเล็กน้อย: แบน 7 วัน
                </span>
                <p className="mt-1 text-[13px] text-pink-200/90">
                  สำหรับพฤติกรรมที่กระทบผู้เล่นคนอื่นพอสมควร
                  แต่ยังมีโอกาสกลับตัวได้ เช่น Toxic ซ้ำ ๆ
                  หรือใช้บัคในระดับไม่รุนแรง
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="mt-1 text-base">•</span>
              <div>
                <span className="font-semibold text-red-300">
                  แบนถาวร
                </span>
                <p className="mt-1 text-[13px] text-pink-200/90">
                  สำหรับเคสหนัก เช่น รังแกคนอื่นรุนแรงมาก,
                  สร้างดราม่าทำลายแมพ, ใช้โปรแกรมโกง,
                  หรือฝ่าฝืนกฎเดิมซ้ำ ๆ แม้ถูกเตือนแล้ว
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-5 rounded-2xl border border-pink-500/40 bg-pink-500/10 px-4 py-3 text-[12px] text-pink-100 md:text-[13px]">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-lg">📩</span>
              <div>
                <p className="font-semibold text-pink-200">
                  การอุทธรณ์ / ชี้แจงกับแอดมิน
                </p>
                <p className="mt-1 text-pink-100/90">
                  หลังจากถูกลงโทษ สามารถติดต่อแอดมินเพื่อชี้แจงเหตุการณ์ได้
                  แต่อย่างไรก็ตาม เคสที่เกิดขึ้นจะถูก{" "}
                  <span className="font-semibold text-pink-200">
                    คาดโทษไว้ในประวัติ
                  </span>{" "}
                  และอาจมีผลต่อการพิจารณาโทษครั้งถัดไป
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ปิดท้าย */}
        <div className="mt-6 text-center text-[12px] text-pink-200/80 md:text-sm">
          การอยู่ร่วมกันใน Sweet Paradise คือการช่วยกันทำให้แมพนี้
          เป็นพื้นที่ปลอดภัย สนุก และสบายใจสำหรับทุกคน 💗
        </div>
      </div>
    </div>
  );
}
