/**
 * GREAM SENDAI video / music gallery.
 * User-provided photos and videos depict minors. Do not enable in production
 * until relevant guardian photo/video publication permissions are confirmed.
 * Enable NEXT_PUBLIC_GREAM_MEDIA_READY=true only after adding all 4 files
 * under public/gream-sendai-media and validating the published URLs.
 * Videos have no soundtrack; the original music track is separate.
 * Every media element is manually controlled, no autoplay.
 */
const ready = process.env.NEXT_PUBLIC_GREAM_MEDIA_READY === "true";
const path = "/gream-sendai-media/";
const clips = [
  { title: "TRAINING SESSION / WIDE", headline: "チームとして、状況を読む。", description: "実戦形式の練習。スペース、サポート、仲間との連携に注目。", file: "gream-practice-wide-muted.mp4", ratio: "16 / 9" },
  { title: "TRAINING SESSION / VERTICAL", headline: "判断を、プレーにつなげる。", description: "縦型の短い練習ハイライト。見る・選ぶ・実行する。", file: "gream-practice-vertical-muted.mp4", ratio: "9 / 16" }
] as const;

export function GreamSendaiMedia() {
  return <section aria-labelledby="gream-media-title" style={{ background: "#e9ebea", padding: "72px max(20px,6vw)", color: "#141719" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <p style={{ fontSize: 12, letterSpacing: 3, fontWeight: 900, color: "#555c60" }}>GREAM SENDAI / TRAINING IN MOTION</p>
      <h2 id="gream-media-title" style={{ fontSize: "clamp(32px,5vw,62px)", lineHeight: 1.04, margin: "12px 0 18px" }}>練習の空気を、動画で。</h2>
      <p style={{ fontSize: 17, lineHeight: 1.85, color: "#4d575c", maxWidth: 830, margin: "0 0 28px" }}>言葉だけでは伝わらない、GREAM仙台の日常。選手の判断とチームでの学びを映像から感じてください。撮影時の活動を紹介するものであり、現在の活動曜日・会場を示すものではありません。</p>
      {ready ? <>
        <figure style={{ margin: "0 0 24px", overflow: "hidden", background: "#101214", border: "1px solid #abb2b4" }}>
          <img src={path + "gream-team-original.jpg"} width="1280" height="960" loading="lazy" alt="GREAM仙台の練習後に体育館で撮影した集合写真" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} />
          <figcaption style={{ padding: "12px 18px", color: "#d2d7d9", fontSize: 12 }}>GREAM SENDAI / TEAM MOMENT — 撮影時のチーム活動の記録</figcaption>
        </figure>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", alignItems: "start", gap: 16 }}>
          {clips.map(clip => <article key={clip.title} style={{ background: "#fff", border: "1px solid #c8cfd0", padding: 17 }}>
            <video aria-label={clip.headline} playsInline muted controls preload="none" poster={path + "gream-team-original.jpg"} style={{ width: "100%", aspectRatio: clip.ratio, objectFit: "cover", background: "#101214", display: "block" }}>
              <source src={path + clip.file} type="video/mp4" />
              お使いのブラウザでは動画を再生できません。
            </video>
            <p style={{ fontSize: 11, letterSpacing: 1.7, fontWeight: 800, color: "#6a7378", margin: "16px 0 8px" }}>{clip.title}</p>
            <h3 style={{ fontSize: 23, lineHeight: 1.3, margin: "0 0 9px" }}>{clip.headline}</h3>
            <p style={{ color: "#4d575c", fontSize: 14, lineHeight: 1.75, margin: 0 }}>{clip.description}</p>
          </article>)}
        </div>
        <div style={{ marginTop: 22, padding: 22, background: "#fff", border: "1px solid #c8cfd0" }}>
          <p style={{ fontSize: 11, letterSpacing: 1.7, fontWeight: 850, color: "#5b6468" }}>ORIGINAL BACKGROUND MUSIC</p>
          <h3 style={{ fontSize: 20, margin: "9px 0 10px" }}>GREAM Original Training Beat</h3>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#4d575c", margin: "0 0 14px" }}>オリジナル制作の短いインストゥルメンタル。自動再生はしません。聴きたいときに再生ボタンを押してください。</p>
          <audio controls preload="none" aria-label="GREAMオリジナルBGM" style={{ display: "block", width: "100%", maxWidth: 520 }}>
            <source src={path + "gream-original-training-beat.mp3"} type="audio/mpeg" />
            お使いのブラウザでは音声を再生できません。
          </audio>
        </div>
      </> : <div style={{ border: "1px solid #b8c0c2", background: "#fff", padding: "28px 24px" }}>
        <p style={{ fontWeight: 900, fontSize: 21, margin: "0 0 10px" }}>練習動画・チーム写真を準備中</p>
        <p style={{ color: "#526067", margin: 0, lineHeight: 1.85, fontSize: 15 }}>映像・写真の公開同意と素材配置が整い次第、ここから再生できます。新規メンバーの参加相談はページ下部で受け付けています。</p>
      </div>}
    </div>
  </section>;
}
