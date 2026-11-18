import { DAY_PASS_LABELS } from "@/lib/okinawa-day-pass-payment";

export const OKINAWA_DAY_PASS_REQUEST_URL = "https://form.jotform.com/263217090103041";

const options = [
  {
    title: "1日参加",
    subtitle: "希望する日だけ参加",
    items: [
      ["12/22（火）", "午後 14:00〜18:00 頃"],
      ["12/23（水）", "9:00〜17:00 頃"],
      ["12/24（木）", "9:00〜15:00 頃"],
    ],
  },
  {
    title: "2日間参加",
    subtitle: "ご家庭の予定に合わせて選択",
    items: [
      ["12/22＋23", "初日午後＋翌日"],
      ["12/23＋24", "2日連続"],
      ["12/22＋24", "離れた2日も希望可能"],
    ],
  },
  {
    title: "放課後ショート",
    subtitle: "学校が終わってから参加",
    items: [
      ["12/22（火）", "16:30〜17:45 頃"],
      ["12/23（水）", "受入時間は調整中"],
    ],
  },
] as const;

/** Non-binding public interest only. Payment is intentionally not linked from this component. */
export function OkinawaDayPassOptions({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-labelledby="rba-okinawa-day-pass-title" style={{ maxWidth: 960, margin: "0 auto", padding: compact ? "18px 20px 32px" : "32px 0 45px" }}>
      <p style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".11em" }}>DAY TRIP / TWO DAYS / AFTER SCHOOL</p>
      <h2 id="rba-okinawa-day-pass-title" style={{ fontWeight: 900, lineHeight: 1.4, fontSize: "clamp(24px,4vw,35px)", margin: "10px 0" }}>
        宿泊しなくても、世界の仲間と。
      </h2>
      <p style={{ lineHeight: 1.9, marginBottom: 20 }}>
        沖縄県内の7〜18歳を対象に、1日・2日間・放課後の参加希望を受け付けています。
        参加日・実際の開始終了時刻・料金・受入人数は、施設と安全体制の最終照合後にご案内します。
        下記の時刻は<strong>確定した集合時間ではありません</strong>。
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,225px),1fr))", gap: 14 }}>
        {options.map(option => (
          <article key={option.title} style={{ background: "#fff", border: "1px solid #ddd8ce", borderRadius: 12, padding: 20, color: "#1a1a1a" }}>
            <p style={{ fontSize: 12, letterSpacing: ".08em", fontWeight: 700, color: "#6b6259", marginBottom: 5 }}>希望受付・条件調整中</p>
            <h3 style={{ fontSize: 22, fontWeight: 850, margin: "0 0 5px" }}>{option.title}</h3>
            <p style={{ fontSize: 13, marginBottom: 12 }}>{option.subtitle}</p>
            <dl style={{ margin: 0 }}>{option.items.map(([day, schedule]) => (
              <div key={day} style={{ padding: "9px 0", borderTop: "1px solid #eee6de" }}>
                <dt style={{ fontWeight: 750, marginBottom: 3 }}>{day}</dt>
                <dd style={{ margin: 0, fontSize: 13 }}>{schedule}（候補）</dd>
              </div>
            ))}</dl>
            <p style={{ fontWeight: 800, marginTop: 12, marginBottom: 0 }}>料金：個別照合後にご案内</p>
          </article>
        ))}
      </div>
      <p style={{ marginTop: 24 }}>
        <a href={OKINAWA_DAY_PASS_REQUEST_URL} style={{ display: "inline-block", background: "#171717", color: "#fff", borderRadius: 8, padding: "15px 20px", textDecoration: "none", fontWeight: 800 }}>
          日帰り・2日間・放課後の参加希望を登録（無料） →
        </a>
      </p>
      <p style={{ marginTop: 14, lineHeight: 1.85, fontSize: 14 }}>
        <strong>お申込みの流れ：</strong>
        ① 無料で希望日と保護者・選手情報を登録 → ② RBAが体育館の利用時間、年齢、定員、スタッフ、送迎・緊急連絡体制を個別に照合 →
        ③ 受入可能な方に日時・税込料金・<a href="/ja/cancellation" style={{ textDecoration: "underline" }}>取消・返金条件</a>を送付 →
        ④ 同意後、RBA専用Stripe画面で参加費全額を事前決済 → ⑤ 入金照合後、集合・解散案内を送ります。
      </p>
      <p style={{ borderLeft: "3px solid #8c7660", paddingLeft: 13, lineHeight: 1.8, fontSize: 13 }}>
        施設側は宿泊しない選手の参加を認めていますが、体育館の具体的な時間と受入可能人数は調整中です。
        日帰り枠に宿泊・食事・空港送迎は含みません。現地現金払いは受け付けません。
        <strong>フォーム送信だけで参加予約・料金・決済は確定しません。</strong>
        3日通い・宿泊プランを既にお支払い済みの場合は、二重決済せずRBAへご相談ください。
      </p>
      <p style={{ fontSize: 12, color: "#514b44" }}>
        問い合わせ：<a href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a>
        <span style={{ display: "none" }}>{Object.keys(DAY_PASS_LABELS).length}</span>
      </p>
    </section>
  );
}
