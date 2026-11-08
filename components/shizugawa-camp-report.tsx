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
            src="/media/shizugawa-2026/court.webp"
            alt="志津川育成キャンプで両チームの選手がコートに立つ様子"
            width={720}
            height={502}
            sizes="(max-width: 880px) 88vw, 540px"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <figcaption style={{ marginTop: 9, color: "#515b60", fontSize: 13 }}>
            志津川の体育館で行われたゲームのひとコマ
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
