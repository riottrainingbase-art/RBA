import { ArrowRight, ArrowUpRight } from "lucide-react";
import { localePath, type Locale } from "./site-frame";

const season = [
  { id:"kansai", month:"JAN", day:"06–08", date:"2027-01-06", title:"UNITED KANSAI", description:"日本 × グアム × オーストラリア", area:"関西・会場調整中", audience:"U11・U13・男子U14", href:"https://form.jotform.com/263188088558069" },
  { id:"incheon", month:"JAN", day:"29–31", date:"2027-01-29", title:"UNITED INCHEON", description:"韓国・仁川 国際大会", area:"韓国・参加条件調整中", audience:"U15中心・参加資格確認中", href:"https://form.jotform.com/263207310187047" },
  { id:"kanto", month:"FEB", day:"11–16", date:"2027-02-11", title:"UNITED KANTO", description:"日本 × 中国・深圳", area:"関東・交流日調整中", audience:"U12年代・参加条件確認中", href:"https://form.jotform.com/263263903074052", teamHref:"https://form.jotform.com/263217708013047" },
  { id:"miyagi", month:"FEB", day:"27–28", date:"2027-02-27", title:"RIZEHOPE JAPAN", description:"国際大会への個人参加を検討", area:"宮城・受入条件調整中", audience:"U12・出場資格確認中", href:"https://form.jotform.com/263243952545057" },
] as const;

// All rows are planning references, not confirmed events or paid entries.
export function UnitedSeason({ locale, fromUnited=false }: { locale:Locale; fromUnited?:boolean }) {
  if(locale!=="ja") return null;
  return <section className="united-season section-pad" aria-label="RBA UNITED 2027 交流計画">
    <div className="united-season-inner">
      <div className="united-season-head">
        <div><p className="section-index united-season-kicker">RBA UNITED / SEASON 2027</p>
          <h2>次の挑戦を、<br/>自分で選ぼう。</h2>
        </div>
        <p>今のチームのまま、新しい仲間と、新しいコートへ。開催に向けて調整している企画をご紹介します。</p>
      </div>
      <div className="united-season-list">
        {season.map(event=><article className="united-season-row" key={event.id}>
          <time dateTime={event.date} className="united-season-date"><span>{event.month} / 2027</span><strong>{event.day}</strong></time>
          <div className="united-season-info"><p className="united-season-status">開催調整中 · 無料事前登録</p><h3>{event.title}</h3><p className="united-season-description">{event.description}</p><p className="united-season-meta">{event.area} ｜ {event.audience}</p></div>
          <div className="united-season-actions"><a href={event.href} target="_blank" rel="noopener noreferrer" aria-label={event.title+"の無料事前登録"}>事前登録 <ArrowUpRight size={17}/></a>{"teamHref" in event?<a href={event.teamHref} target="_blank" rel="noopener noreferrer">チーム・指導者 <ArrowUpRight size={17}/></a>:null}</div>
        </article>)}
      </div>
      <div className="united-season-foot"><div><p>事前登録は無料です。開催日・会場・参加資格・費用・必要な許可は正式案内でご確認ください。登録だけで参加や支払いが確定することはありません。</p><p>すでに登録済みの方は再登録不要です。</p></div>
        <div className="united-season-ctas"><a className="button button-rba-primary" href="https://form.jotform.com/263263903074052" target="_blank" rel="noopener noreferrer">全国共通・無料エントリー <ArrowRight size={18}/></a>{!fromUnited?<a className="text-link" href={localePath(locale,"united")}>RBA UNITEDについて <ArrowRight size={16}/></a>:<a className="text-link" href={localePath(locale,"schedule")}>RBAの開催日程 <ArrowRight size={16}/></a>}</div>
      </div>
    </div>
  </section>;
}
