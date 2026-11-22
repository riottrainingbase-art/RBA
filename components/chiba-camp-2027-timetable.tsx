type Lang = "ja" | "en";
type Row = readonly [string,string,string,string,string];

const dayOne: Row[] = [
["09:15–09:40","受付・体調チェック","初めての選手も安心して始められるよう学年と経験を確認","Arrival & wellbeing check","Welcome players and check age, experience and readiness"],
["09:40–10:00","動きづくり","走る・止まる・向きを変える。短いゲームで身体を起こす","Movement warm-up","Run, stop and turn through short games"],
["10:00–10:25","まず3対3でプレー","最初から試合に近い場面へ。「どこが空いていた？」","Start with 3v3","Play first, then ask: Where was the space?"],
["10:25–10:35","水分・休息","無理に続けず、呼吸と様子を確認","Water & recovery","Short recovery and readiness check"],
["10:35–11:15","1対1：相手を見て選ぶ","仕掛ける・止まる・パスを探す判断。経験別に調整","1v1: Read the defender","Recognise options and adapt to experience"],
["11:15–11:25","水分・休息","短い振り返りを挟む","Water & recovery","Pause and reflect briefly"],
["11:25–12:00","2対2：味方とつながる","守備の位置を見て、パス後の動き直しを考える","2v2: Connect with a teammate","See the defender and move after passing"],
["12:00–13:00","昼食・休憩","昼食は各自で準備。午後に備えてしっかり休む","Lunch & rest","Bring your own lunch and take a full break"],
["13:00–13:15","再ウォームアップ","遊びの要素を入れた動きづくり","Re-warm-up","Playful movement preparation"],
["13:15–14:00","3対3：スペースをつくる","ボールのない選手にも役割が生まれるゲーム","3v3: Create space","Meaningful choices for off-ball players"],
["14:00–14:15","水分・休息","集中と負荷を調整","Water & recovery","Adjust physical and attention load"],
["14:15–15:05","ルールを工夫したゲーム","人数・コート・得点条件を変えてプレーの選択肢を増やす","Games with changing constraints","Change players, space and scoring to explore choices"],
["15:05–15:20","水分・休息","個別確認","Water & recovery","Individual check-ins"],
["15:20–15:55","ショートゲーム＋振り返り","学んだことを試す。勝敗だけでは評価しない","Short games & reflection","Try new decisions without reducing learning to results"],
["15:55–16:15","まとめ・解散","「今日見つけたこと」を言葉にし、次の日につなげる","Debrief & departure","Name one discovery to carry into day two"]
];

const dayTwo: Row[] = [
["09:15–09:40","受付・体調チェック","1日のみ参加する選手にも今日のテーマを共有","Arrival & wellbeing check","Introduce today's theme to all, including day-only players"],
["09:40–10:00","動きづくり","状況判断を含む軽い対人ゲーム","Movement warm-up","Light decision-making games"],
["10:00–10:25","前日の学びを試す3対3","初参加者も参加できるようルールを調整","3v3: Test your learning","Adapt rules so new and returning players can join"],
["10:25–10:35","水分・休息","ゲーム後に短い問いかけ","Water & recovery","Brief questions about what players noticed"],
["10:35–11:15","2対2／3対3：助け合う","守備のずれを見つける、受け手が動く、次につなぐ","2v2 / 3v3: Help each other","Recognise defensive gaps and off-ball movement"],
["11:15–11:25","水分・休息","負荷を調整","Water & recovery","Adjust intensity as needed"],
["11:25–12:00","攻守の切り替え","ボールを失った・奪った直後に何を見るか","Transition moments","What do you see immediately after possession changes?"],
["12:00–13:00","昼食・休憩","運動を続けず、しっかり休む","Lunch & rest","Bring your own lunch and take a full break"],
["13:00–13:15","再ウォームアップ","ステップ・止まる動き・対人の準備","Re-warm-up","Footwork, stopping and readiness"],
["13:15–14:00","3対3／4対4：判断を広げる","人数が増えたときに見える場所と役割の変化","3v3 / 4v4: More choices","Notice how roles and spaces change"],
["14:00–14:15","水分・休息","疲労に応じて内容を調整","Water & recovery","Adjust for fatigue"],
["14:15–15:05","ゲームで試す","U12は少人数中心、U15は4対4・5対5も取り入れる","Apply in games","Smaller-sided games for U12; 4v4/5v5 as appropriate for U15"],
["15:05–15:20","水分・休息","集中と動作の質を確認","Water & recovery","Check movement quality and concentration"],
["15:20–15:55","ラーニングゲーム","勝点より「判断した回数・次の改善」を見る","Learning games","Focus on decisions and next steps rather than standings"],
["15:55–16:15","個別の振り返り・解散","普段の練習に持ち帰る課題を一つ言葉にする","Individual reflection & departure","Identify one thing to take back to regular training"]
];

function Day({n,title,lead,rows,ja}:{n:string;title:string;lead:string;rows:Row[];ja:boolean}){
 return <details open={n==="01"} className="group overflow-hidden rounded-xl border-2 border-[#d4c7af] bg-white shadow-sm">
   <summary className="cursor-pointer list-none bg-[#27534c] px-5 py-6 text-white marker:hidden sm:px-8 sm:py-7">
     <p className="text-xs font-black uppercase tracking-[.18em] text-[#e6d2a9]">{n==="01"?"DAY 01 / SATURDAY / 2027.03.27":"DAY 02 / SUNDAY / 2027.03.28"}</p>
     <h3 className="mt-3 flex items-center justify-between gap-4 text-2xl font-black leading-tight sm:text-3xl"><span>{title}</span><span aria-hidden="true" className="text-lg font-medium text-[#e6d2a9] transition-transform group-open:rotate-45">＋</span></h3>
     <p className="mt-3 max-w-3xl text-sm leading-7 text-white/85 sm:text-base">{lead}</p>
   </summary>
   <div className="divide-y divide-[#e6ded1] px-3 py-2 sm:px-7 sm:py-3">
     {rows.map((r,i)=>{
       const rest=r[1].includes("休息")||r[1].includes("昼食");
       return <div key={n+"-"+i} className={"grid gap-1 px-3 py-3.5 sm:grid-cols-[118px_210px_1fr] sm:gap-4 sm:py-3 "+(rest?"bg-[#f3eee5]":"")}>
         <p className="text-sm font-black tabular-nums text-[#315f57]">{r[0]}</p>
         <h4 className="text-sm font-black leading-6">{ja?r[1]:r[3]}</h4>
         <p className="text-sm leading-6 text-[#3a3a3a]">{ja?r[2]:r[4]}</p>
       </div>
     })}
   </div>
 </details>
}

export function ChibaCamp2027Timetable({locale}:{locale:Lang}){
 const ja=locale==="ja";
 return <section id="timetable" className="scroll-mt-20 border-t border-[#d4c7af] bg-[#f1eadc] px-5 py-14 text-[#1b2925] sm:py-20" aria-labelledby="timetable-heading">
   <div className="mx-auto max-w-6xl">
     <p className="text-xs font-black uppercase tracking-[.22em] text-[#815b36]">ON-COURT PROGRAM / 2027.03.27–28</p>
     <h2 id="timetable-heading" className="mt-3 text-[clamp(2rem,5vw,4.1rem)] font-black leading-tight">{ja?"2日間、何を学ぶのか。":"What we'll learn over two days."}</h2>
     <p className="mt-4 max-w-3xl text-base leading-8">{ja?"最初にプレーし、課題を見つけ、人数や条件を変えてもう一度試す。1日目は「見る・選ぶ」、2日目は「仲間とつながる・ゲームで試す」。1日だけの参加でも、その日から理解できる導入を設けます。":"Play first, discover the challenge, change the conditions and try again. Day one is about noticing and choosing. Day two brings teammates into the decision and applies the learning in games. Each day works as a standalone session."}</p>
     <p className="mt-3 text-sm font-bold text-[#2d5b52]">{ja?"日付をタップすると、時間ごとの内容を開閉できます。":"Tap each day to expand or collapse its detailed timetable."}</p>
     <div className="mt-7 border-l-4 border-[#a58049] bg-white px-5 py-4">
       <p className="font-black">{ja?"各日 9:15受付 ／ 9:40開始 ／ 16:15頃解散【予定】":"Daily plan: check-in 09:15 / start 09:40 / finish around 16:15 [provisional]"}</p>
       <p className="mt-2 text-sm leading-7">{ja?"体育館の正式な利用時間、参加人数、選手の疲労に応じて調整します。確定した集合・解散時刻は参加者へ個別に連絡します。":"Timing may change after venue-hours confirmation and in response to attendance and player wellbeing. Final arrival/departure instructions will be sent directly to registered guardians."}</p>
     </div>
     <div className="mt-8 grid gap-4">
       <Day n="01" ja={ja} rows={dayOne} title={ja?"まず、見て、選ぶ。":"See first. Then choose."} lead={ja?"技術を「使う場面」から考える。午前は1対1・2対2、午後は3対3。まずプレーして、問い直し、もう一度試す。":"Explore when skills matter: begin in real game situations, move through 1v1 and 2v2, then use 3v3 and reflection."}/>
       <Day n="02" ja={ja} rows={dayTwo} title={ja?"仲間とつながり、ゲームで試す。":"Connect. Apply. Reflect."} lead={ja?"攻守の切り替え・オフボール・3対3／4対4。昨日の学びを次の判断につなげ、普段の練習へ持ち帰る。":"Build on transition moments, off-ball movement and 3v3/4v4. Bring one clear learning point back to regular practice."}/>
     </div>
     <div className="mt-8 grid gap-4 md:grid-cols-2">
       <article className="border-t-4 border-[#a58049] bg-white p-6">
         <p className="text-xs font-black text-[#bf5100]">U12 / MINI BASKET</p>
         <h3 className="mt-3 text-2xl font-black">{ja?"関わる機会を増やす。":"More involvement."}</h3>
         <p className="mt-3 text-sm leading-7">{ja?"3対3・4対4を中心に、ボールを持つ・持たない両方の判断を経験します。役割の固定や複雑な戦術の詰め込みを避け、楽しく試せる状況を工夫します。":"Mostly 3v3 and 4v4 so players can make on-ball and off-ball decisions. Avoid fixed roles and excessive tactical instruction."}</p>
       </article>
       <article className="border-t-4 border-[#27534c] bg-white p-6">
         <p className="text-xs font-black text-[#bf5100]">U15 / YOUTH</p>
         <h3 className="mt-3 text-2xl font-black">{ja?"判断の条件を増やす。":"Broaden the decisions."}</h3>
         <p className="mt-3 text-sm leading-7">{ja?"スペース・オフボール・攻守の切り替えの条件を少し複雑にし、4対4・5対5へつなげます。経験差と当日の様子に合わせます。":"Increase complexity through space, off-ball actions and transitions; progress to 4v4 and 5v5 where appropriate."}</p>
       </article>
     </div>
     <div className="mt-8 border-t border-black/25 pt-5">
       <p className="text-sm leading-7">{ja?"各セッションの途中にも水分休憩・交代を設けます。勝敗や順位を目的とする長時間の大会形式ではありません。昼食・飲料・室内シューズ・動きやすい服装・タオルは各自でご準備ください。":"Water and recovery breaks are included within activities as well as between blocks. This is not a long, win-at-all-costs tournament. Please bring lunch, water, indoor shoes, comfortable sportswear and a towel."}</p>
       <p className="mt-3 text-xs leading-6 text-[#444]">{ja?"育成設計の参考：WABC Mini-Basketball Coaches Manual（Making it Fun / Using Game-Based Teaching / Small Sided Games）。RBAが独自に設計したプログラムであり、WABC/FIBAの主催・公認ではありません。":"Educational reference: WABC Mini-Basketball Coaches Manual (Making it Fun / Using Game-Based Teaching / Small Sided Games). This programme is designed by RBA and is not organised or endorsed by WABC/FIBA."} <a href="https://about.fiba.basketball/en/wabc-documents" target="_blank" rel="noopener noreferrer" className="font-bold underline">{ja?"WABC原典を見る ↗":"WABC resources ↗"}</a></p>
     </div>
   </div>
 </section>;
}
