import { OKINAWA_CAMP_LOGISTICS_COPY } from "@/lib/okinawa-camp-logistics";
import { OkinawaEarlyBird } from "@/components/okinawa-early-bird";
import { CAMP_JAPAN_CONTACT } from "@/lib/okinawa-camp-pricing";
import { OkinawaCampPartnerNotice } from "./okinawa-camp-partner";
import type { Locale } from "./site-frame";
import styles from "./okinawa-december-camp-callout.module.css";

const copy = {
  en: { title: "Your next basketball adventure. Okinawa, Japan.", date: "DEC 22–24, 2026 · AGES 7–18", body: "Train, play and connect through an international youth basketball camp. Two nights at Itoman Youth Center; final arrival and departure times will follow.", price: "Published fees: USD 450 with housing and meals / USD 300 without housing. Flights excluded.", discount: "Early bird: 20% off through October 31. Two or more players: an additional 10% off. Combined: USD 324 / USD 216 per player.", note: "Accommodation secured: Itoman Youth Center. Gym slots, arrival and departure times, staff, transfers and final inclusions are being confirmed. Contact us to confirm arrangements before paying or booking travel.", link: "View the camp information", ask: "Ask about participation" },
  ja: { title: "この冬、沖縄で世界の仲間とバスケットボールを。", date: "2026年12月22〜24日 · 7〜18歳", body: "練習とゲームを通じて、国や言葉を越えてつながる国際ユースキャンプ。糸満青少年の家での宿泊を確保しました（2泊3日）。", price: "海外参加者向け料金：宿泊・食事付き450米ドル／宿泊なし300米ドル。航空券は別途。", discount: "10月31日までの早割20％引き＋2名以上でさらに10％引き。併用時は1名あたり324米ドル／216米ドル。", note: "宿泊先確保済み：糸満青少年の家。体育館の利用時間、集合・解散時刻、スタッフ、送迎、料金に含まれる内容は調整中です。お支払い・航空券購入前に、送迎・受入時間などをご確認ください。", link: "キャンプの詳細を見る", ask: "参加について問い合わせる" },
  "zh-tw": { title: "這個冬天，在沖繩與世界的球友一起成長。", date: "2026年12月22–24日 · 7–18歲", body: "透過訓練、比賽與國際交流，拓展籃球視野。三天兩夜，已安排於糸滿青少年之家住宿。", price: "網站公布費用：含住宿及餐食450美元／不含住宿300美元。機票另計。", discount: "10月31日前早鳥八折；2人以上再享九折。合併優惠每人324美元／216美元。", note: "住宿已安排：糸滿青少年之家。體育館時段、集合與解散時間、工作人員、接駁及費用包含項目仍在確認。付款或訂機票前請先聯絡。", link: "查看營隊資訊", ask: "洽詢參加事宜" },
  ko: { title: "이번 겨울, 오키나와에서 새로운 농구 친구를 만나세요.", date: "2026년 12월 22–24일 · 만 7–18세", body: "훈련과 경기를 통해 함께 배우는 국제 유소년 농구 캠프. 이토만 청소년의 집 숙소를 확보했습니다(2박 3일).", price: "게시 요금: 숙박·식사 포함 USD 450 / 숙박 제외 USD 300. 항공료 별도.", discount: "10월 31일까지 20% 할인, 2명 이상 추가 10% 할인. 중복 적용 시 1인 USD 324 / USD 216.", note: "숙소 확보 완료: 이토만 청소년의 집. 체육관 시간, 집합·해산 시각, 스태프, 교통편과 포함 항목은 조율 중입니다. 결제·항공권 구매 전에 문의해 주세요.", link: "캠프 안내 보기", ask: "참가 문의" },
} satisfies Record<Locale, { title: string; date: string; body: string; price: string; discount: string; note: string; link: string; ask: string }>;

export function OkinawaDecemberCampCallout({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const href = locale === "ja" ? "/ja/events/okinawa-international-camp-2026" : locale === "zh-tw" ? "https://okinawa.camp/?lang=zh-TW" : "https://okinawa.camp/";
  return <section className={styles.card} aria-labelledby={`okinawa-december-${locale}`}>
    <p className={styles.label}>RBA · INTERNATIONAL YOUTH BASKETBALL CAMP</p>
    <p className={styles.date}>{c.date}</p>
    <h2 id={`okinawa-december-${locale}`}>{c.title}</h2>
    <p>{c.body}</p>
    {locale === "ja" && <OkinawaEarlyBird compact/>}
    <OkinawaCampPartnerNotice locale={locale}/>
    {locale === "ja" && <p><strong>沖縄県民割引のご案内</strong><br/>通い3日間27,500円／宿泊2泊3日39,600円（税込・1名）。<a href="/ja/events/okinawa-international-camp-2026#okinawa-resident-discount">県民割引の内容・参加案内 →</a></p>}
    <p className={styles.price}>{c.price}</p>
    <p>{c.discount}</p>
    <p><strong>{OKINAWA_CAMP_LOGISTICS_COPY[locale].status}</strong></p><p className={styles.note}>{c.note} {OKINAWA_CAMP_LOGISTICS_COPY[locale].departure}</p>
    <div className={styles.actions}><a href={href} target="_blank" rel="noopener noreferrer">{c.link} ↗</a><a href={locale === "ja" ? CAMP_JAPAN_CONTACT : "mailto:hi@spartans.com.tw?cc=riot.training.base%40gmail.com&subject=Okinawa%20Camp%202026"}>{c.ask} →</a>{locale === "ja" && <a href="/ja/events/okinawa-international-camp-2026/apply">料金選択・申込・決済へ →</a>}</div>
  </section>;
}
