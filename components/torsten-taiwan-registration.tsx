import { ArrowUpRight } from "lucide-react";
import { GrowthClickTracking } from "@/components/growth-click-tracking";
import { TaiwanShareActions } from "@/components/taiwan-share-actions";
import { torstenUsdOptions } from "@/components/torsten-usd-data";

const formats = [
  { title: "Zoom 線上直播", details: "11 月 25 日（三）19:00–20:30（台灣時間）。直播票僅含當天課程。", event: "torsten-taiwan-live-checkout" },
  { title: "30 天錄影觀看", details: "直播結束後上架，自上架日起可觀看 30 天。錄影票僅含錄影。", event: "torsten-taiwan-recording-checkout" },
] as const;

export function TorstenTaiwanRegistration() {
  return (
    <section className="torsten-conversion section-pad" id="taiwan-registration" aria-labelledby="taiwan-registration-title">
      <GrowthClickTracking />
      <div className="torsten-conversion-head">
        <h2 id="taiwan-registration-title">台灣教練報名｜直播或錄影</h2>
        <p>英語授課，搭配日語逐步口譯。每人依觀看方式單次付費，兩種票券分開購買。</p>
      </div>
      <div className="torsten-problem-grid">
        {formats.map((format, index) => {
          const option = torstenUsdOptions[index];
          return (
            <article key={format.event}>
              <h3>{format.title}</h3>
              <p>{format.details}</p>
              <a className="button button-dark" href={option.url} data-growth-id={format.event}>
                購買{format.title} · US${option.amount} <ArrowUpRight size={17} />
              </a>
            </article>
          );
        })}
      </div>
      <div className="torsten-conversion-head">
        <p>進入 Stripe 英文結帳頁後，請填寫可收信的電子郵件並以美元付款。完成付款後，RBA 會寄送直播或錄影的觀看資訊。發卡銀行可能另收換匯或跨境交易費用。</p>
        <p>購買前可查看<a href="/events/torsten-loibl-online-clinic#terms">國際票券及取消條款（英文）</a>。已付款但未收到通知，請聯絡 <a href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a>。</p>
        <TaiwanShareActions
          path="/zh-tw/events/torsten-loibl-online-clinic#taiwan-registration"
          message="RBA 線上教練講座｜Torsten Loibl 談射手培養、空間運用與比賽決策。11 月 25 日台灣時間 19:00–20:30，直播與 30 天錄影各 US$29。英語授課，搭配日語逐步口譯。"
          trackingId="torsten-taiwan-line-share"
        />
      </div>
    </section>
  );
}
