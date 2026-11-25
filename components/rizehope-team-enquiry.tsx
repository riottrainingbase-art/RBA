export function RizehopeTeamEnquiry({ japanese = false }: { japanese?: boolean }) {
  if (Date.now() >= Date.parse("2027-03-01T00:00:00+09:00")) return null;
  return (
    <section className="calendar-notice section-pad" aria-label="RIZEHOPE JAPAN 2027">
      <div>
        <p className="section-index inverse">{japanese ? "2027年2月27日（土）・28日（日）｜宮城県・柴田町" : "27–28 February 2027 · Shibata Town Gymnasium, Miyagi"}</p>
        <h2>RIZEHOPE JAPAN 2027</h2>
        <p>{japanese ? "海外のU12チームを対象とした参加相談窓口です。参加を検討中のチームは、代表者の方から無料でご相談ください。渡航日や人数が決まっている場合は、宿泊・移動の概算費用もお問い合わせいただけます。参加費や受け入れ条件は、お申し込み前に個別にご案内します。" : "International U12 basketball exchange. Adult team managers can register interest for free. If you already have a group in mind, request a travel estimate based on your dates, roster and airport. RBA will confirm availability, entry fees and travel costs before you commit."}</p>
      </div>
      <div className="event-actions">
        <a className="button button-light" href="https://form.jotform.com/263221234159047">{japanese ? "海外チームの参加を相談する（英語）" : "Register team interest"}</a>
        <a className="button button-light" href="https://form.jotform.com/263277680404056">{japanese ? "宿泊・移動の見積もりを依頼する（英語）" : "Request a team travel estimate"}</a>
      </div>
    </section>
  );
}
