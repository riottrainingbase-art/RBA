import Image from "next/image";

const teams = {
  sendai: { name: "GREAM SENDAI", href: "/ja/gream-sendai" },
  akita: { name: "DSM GREAM", href: "/ja/gream-akita" },
} as const;

export function ShizugawaCampReport({ team }: { team: keyof typeof teams }) {
  const otherTeam = teams[team === "sendai" ? "akita" : "sendai"];

  return (
    <section
      id="shizugawa-camp-2026"
      aria-labelledby="shizugawa-camp-heading"
      style={{ background: "#f4f5f3", borderBottom: "1px solid #d8dcdd", padding: "clamp(40px,6vw,76px) max(20px,6vw)" }}
    >
      <div style={{
        maxWidth: 1120, margin: "0 auto", display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,360px),1fr))",
        alignItems: "center", gap: "24px 42px",
      }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 900, letterSpacing: 2, color: "#515b60", margin: "0 0 12px" }}>
            CAMP REPORT / GREAM SENDAI × DSM GREAM
          </p>
          <h2 id="shizugawa-camp-heading" style={{ fontSize: "clamp(28px,4vw,47px)", lineHeight: 1.22, letterSpacing: "-.04em", margin: "0 0 14px" }}>
            志津川で、思いきり<br />バスケットボールを楽しんだ。
          </h2>
          <p style={{ color: "#515b60", fontSize: 14, fontWeight: 750, margin: "0 0 17px" }}>
            <time dateTime="2026-11-07">2026年11月7日</time>〜<time dateTime="2026-11-08">8日</time> ／ 宮城県志津川自然の家
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.9, margin: "0 0 12px" }}>
            仙台のGREAM SENDAIと秋田のDSM GREAMが、南三陸・志津川の育成キャンプで同じコートに立ちました。普段は別々の場所で練習する選手たちが集まり、練習やゲームを通して、思いきりバスケットボールを楽しんだ2日間でした。
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.9, margin: "0 0 20px" }}>
            参加した選手の皆さん、送り出してくださったご家族、キャンプを支えてくださった皆さま、ありがとうございました。
          </p>
          <a href={otherTeam.href} style={{ fontWeight: 800, textDecoration: "underline", textUnderlineOffset: 4 }}>
            {otherTeam.name}のチームページへ →
          </a>
        </div>
        <figure style={{ margin: 0 }}>
          <Image
            src="/media/shizugawa-2026/team.webp"
            alt="志津川の体育館で並んだGREAM SENDAIとDSM GREAMの選手とコーチ"
            width={1280}
            height={960}
            sizes="(max-width: 880px) 88vw, 540px"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <figcaption style={{ marginTop: 9, color: "#515b60", fontSize: 13 }}>
            GREAM SENDAIとDSM GREAMの集合写真
          </figcaption>
        </figure>
      </div>
      <div style={{ maxWidth: 1120, margin: "36px auto 0", borderTop: "1px solid #d8dcdd", paddingTop: 28 }}>
        <h3 style={{ fontSize: "clamp(23px,3vw,34px)", margin: "0 0 18px" }}>コートのひとコマ</h3>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))",
          gap: 24, alignItems: "start",
        }}>
          <figure style={{ margin: 0 }}>
            <Image
              src="/media/shizugawa-2026/court.webp"
              alt="志津川の体育館で両チームが一緒にプレーする様子"
              width={720}
              height={502}
              sizes="(max-width: 780px) 88vw, 540px"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <figcaption style={{ marginTop: 9, color: "#515b60", fontSize: 13 }}>
              志津川の体育館で行われたゲーム
            </figcaption>
          </figure>
          <figure style={{ margin: 0 }}>
            <video
              controls
              playsInline
              preload="none"
              width={360}
              height={640}
              poster="/media/shizugawa-2026/highlights-poster.webp"
              aria-label="志津川育成キャンプのプレー映像"
              style={{ width: "100%", maxWidth: 270, height: "auto", aspectRatio: "9 / 16", display: "block", background: "#131619" }}
            >
              <source src="/media/shizugawa-2026/highlights.mp4" type="video/mp4" />
              <a href="/media/shizugawa-2026/highlights.mp4">ハイライト動画を開く</a>
            </video>
            <figcaption style={{ marginTop: 9, color: "#515b60", fontSize: 13 }}>
              キャンプのハイライト（21秒・音声なし）
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
