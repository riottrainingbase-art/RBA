export function SendaiSponsorFilm() {
  return <section id="sponsor-film" aria-labelledby="sendai-film-title" style={{ background: "#121714", color: "#f6f6f0", padding: "56px max(20px,6vw)" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "32px 56px", alignItems: "center" }}>
      <div style={{ flex: "1 1 300px" }}>
        <p style={{ color: "#a4e0b2", letterSpacing: 2, fontSize: 12, fontWeight: 800 }}>GREAM SENDAI / LOCAL PARTNERS</p>
        <h2 id="sendai-film-title" style={{ fontSize: "clamp(30px,4.5vw,54px)", lineHeight: 1.25, margin: "18px 0" }}>このまちで、<br />ともに育てる。</h2>
        <p style={{ lineHeight: 1.9, color: "#d1dad4", maxWidth: 580 }}>仙台市太白区を拠点に活動するGREAM仙台。子どもたちの挑戦を、地域のお店や企業と一緒に支えていきたいと考えています。活動への思いと協賛のご案内を、30秒の動画にまとめました。</p>
        <p style={{ lineHeight: 1.85, color: "#d1dad4" }}>広告協賛は月3,300円（税込）から、12か月契約です。公式サイト・SNSでの企業紹介など、掲載内容と実施報告を明確にしてご案内します。</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
          <a href="/ja/gream-sendai/partners#plans" data-growth-id="sendai-film-partner-plans" style={{ display: "inline-flex", padding: "15px 20px", background: "#a4e0b2", color: "#121714", textDecoration: "none", fontWeight: 800 }}>協賛プラン・お問い合わせ →</a>
          <a href="/downloads/gream-sendai/partnership-proposal.pdf" style={{ display: "inline-flex", padding: "15px 20px", border: "1px solid #748279", color: "#fff", textDecoration: "none" }}>提案書PDFを見る</a>
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.8, color: "#abb9b0", marginTop: 22 }}>動画のユニフォームは2026年3月保存の過去デザインです。現行仕様は確認中です。ユニフォーム広告は基本協賛と別契約で、規程・製作仕様の確認と大会ごとの事前承認後に掲載します。</p>
      </div>
      <figure style={{ margin: 0, flex: "0 1 300px", width: "100%", maxWidth: 360 }}>
        <video controls playsInline preload="none" poster="/media/gream-sendai/sponsor-film-poster.jpg" aria-label="GREAM仙台 地域スポンサー募集動画、30秒、音声は音楽のみ" aria-describedby="sendai-film-transcript" style={{ display: "block", width: "100%", aspectRatio: "9 / 16", background: "#080b09", border: "1px solid #35443a" }}>
          <source src="/media/gream-sendai/sponsor-film.mp4" type="video/mp4" />
          動画を再生できない場合は、下の文字版をご覧ください。
        </video>
        <figcaption style={{ fontSize: 12, color: "#abb9b0", marginTop: 10 }}>30秒・音楽あり。再生ボタンで視聴できます。</figcaption>
      </figure>
    </div>
    <details id="sendai-film-transcript" style={{ maxWidth: 1100, margin: "24px auto 0", color: "#d1dad4", lineHeight: 1.85 }}>
      <summary style={{ cursor: "pointer" }}>動画の内容を文字で読む</summary>
      <p>このまちの名前を、背負って。宮城県仙台市・太白区。地域とともに育つ、U15バスケットボール。子どもたちの挑戦に、まちの力を。公式サイト・SNS・ユニフォーム広告枠で、応援が見えるように。太白区の企業・お店の皆さまへ、地域スポンサーを募集しています。</p>
      <p>月3,300円から（税込）、12か月契約・年額39,600円から。掲載内容・回数はプランによって異なります。ユニフォームは過去デザインで、広告は別契約・大会承認後です。</p>
    </details>
  </section>;
}