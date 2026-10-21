import Link from "next/link";
export const mvpInterestUrl="https://form.jotform.com/262932455548062";
export function MvpUnitedRecruitment({compact=false}:{compact?:boolean}) {
 return <section className="section-pad" id="malaysia-2026" style={{background:"#f3f3ef",color:"#171717"}}>
  <div style={{maxWidth:960,margin:"0 auto"}}>
  <p className="section-index">RBA UNITED / MALAYSIA 2026</p>
  <h2 style={{fontSize:"clamp(28px,5vw,54px)",lineHeight:1.3}}>クリニックで出会った仲間と、<br/>今度は海外のコートへ。</h2>
  <p style={{fontSize:18,lineHeight:1.9}}>2026年12月、マレーシアの国際大会へ。全国から集まる個人参加型チーム「RBA UNITED」の参加意向を募集します。男子・女子、U11・U13・U15・U17の全カテゴリーが対象です。</p>
  <p><strong>「費用と日程次第」「まず説明を聞きたい」でも大丈夫です。</strong>無料の意向回答で、参加確定や支払いは発生しません。</p>
  <div style={{display:"flex",flexWrap:"wrap",gap:12,margin:"24px 0"}}><a className="button button-dark" href={mvpInterestUrl} target="_blank" rel="noopener noreferrer">参加意向を伝える（無料） ↗</a>{compact?<Link className="button button-light" href="/ja/united/malaysia-2026">日程・対象・費用について見る →</Link>:null}</div>
  <p><strong>回答目安：10月25日（日）23:59〈日本時間〉</strong><br/>大会側の記載締切は11月1日。RBAでは編成検討のため、先に参加意向を伺います。</p>
  {!compact?<>
  <h3>募集カテゴリーと競技日程</h3>
  <p>MILO MVP International Basketball Championship 2026（第2シリーズ）<br/>会場：Han Ming Basketball Arena / SJKC Han Ming, Puchong, Selangor, Malaysia</p>
  <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",minWidth:310}}><caption style={{textAlign:"left",padding:"12px 0"}}>5人制｜すべて男子・女子を募集</caption><thead><tr>{["カテゴリー","出生年の基準","大会日程"].map(t=><th key={t} scope="col" style={{textAlign:"left",padding:12,borderBottom:"2px solid #222"}}>{t}</th>)}</tr></thead><tbody>{[["U17 男女","2009年生まれ以降","12月5日〜8日"],["U15 男女","2011年生まれ以降","12月5日〜8日"],["U13 男女","2013年生まれ以降","12月10日〜13日"],["U11 男女","2015年生まれ以降","12月10日〜13日"]].map(row=><tr key={row[0]}>{row.map((s,i)=>i===0?<th scope="row" key={s} style={{padding:12,textAlign:"left",borderBottom:"1px solid #ccc"}}>{s}</th>:<td key={s} style={{padding:12,borderBottom:"1px solid #ccc"}}>{s}</td>)}</tr>)}</tbody></table></div>
  <p>12月9日の3x3も、U11・U13・U15・U17の男女で参加希望を伺います。人数と主催者条件を確認して調整します。</p>
  <p>上記はハンドブックの競技日程です。渡航・帰国日は別途ご案内します。全期間滞在が必須という意味ではありません。カテゴリーは学年ではなく出生年が基準となり、最終的な参加資格は個別に確認します。</p>
  <h3>挑戦しやすい費用にするために</h3>
  <p>参加人数に応じて共通経費を分担し、1人あたりの負担をできるだけ抑える予定です。<strong>現在、参加費・渡航費を含む総額は未確定です。</strong></p>
  <p>大会参加費、航空券、宿泊、食事、現地移動、保険、ユニフォーム、引率費などを整理し、含まれる費用・別途必要な費用・キャンセル条件を明示してから、正式参加をご判断いただきます。人数が増えた場合の費用低減も、条件を確認してご案内します。</p>
  <h3>一人で申し込んで、同じチームに。</h3>
  <p>RBA UNITEDは、企画ごとに集まる期間限定チームです。今の所属先での活動を続けながら、ご家庭・所属先の予定を踏まえて参加をご検討いただけます。海外経験の有無にかかわらず、まずはご関心をお知らせください。</p>
  <h3>回答から正式参加まで</h3>
  <ol style={{lineHeight:2}}><li>保護者の方が、年代・参加希望・同行予定・相談事項をフォームで回答</li><li>RBAが男女・年代別の人数、チーム編成、参加資格と主催者の受入条件を確認</li><li>総費用、日程、引率・安全管理、手配と取消条件などをご案内</li><li>条件を確認したうえで正式参加を判断</li></ol>
  <p>意向回答は大会出場や募集枠の確保を保証しません。人数や主催者条件等により、希望カテゴリーの編成・参加ができない場合があります。保護者同行なしをご希望の場合も、引率体制の確認が必要です。</p>
  <details><summary>主催者への確認事項について</summary><p>ハンドブックには、参加前の国内競技連盟の正式同意や、年少カテゴリーの選手起用等に関する規定があります。保証金や一部資格記載にも不整合があるため、RBAが主催者に確認し、正式申込の前に条件を整理します。</p></details>
  <p style={{marginTop:28}}><a className="button button-dark" href={mvpInterestUrl} target="_blank" rel="noopener noreferrer">参加したい・説明を聞きたい（無料） ↗</a></p>
  <p>ご質問は <a href="mailto:riot.training.base@gmail.com?subject=RBA%20UNITED%20Malaysia%202026">riot.training.base@gmail.com</a> へ。<br/>Riot Basketball Academy 代表 西尾優人</p>
  <p style={{fontSize:13}}>募集情報更新：2026年10月21日｜出典：主催者提供の2026年大会ハンドブック日本語参考訳。最新条件は主催者確認を優先します。<br/><Link href="/ja/policies">プライバシー・参加規約</Link></p>
  </>:null}
 </div></section>;
}
