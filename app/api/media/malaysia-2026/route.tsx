import { ImageResponse } from "next/og";

export const runtime = "edge";

const cardStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
  border: "2px solid rgba(255,255,255,.2)",
  borderRadius: 24,
  padding: "24px 26px",
  background: "rgba(255,255,255,.055)",
};

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#0a0b0c",
        color: "#f6f4ef",
        padding: "42px 50px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 99, background: "#f28a16" }} />
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: 3 }}>RBA / GLOBAL NETWORK</div>
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#f28a16", letterSpacing: 2 }}>PENANG, MALAYSIA</div>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 18 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 66, lineHeight: 1, fontWeight: 900, letterSpacing: -2 }}>RBA MALAYSIA 2026</div>
          <div style={{ fontSize: 25, marginTop: 12, color: "#c8c9c9" }}>
            COACH EDUCATION + U10 / U12 / U14 / U16 DEVELOPMENT
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div style={{ fontSize: 20, color: "#c8c9c9", letterSpacing: 2 }}>OCTOBER</div>
          <div style={{ fontSize: 50, fontWeight: 900, color: "#f28a16" }}>16–18</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 18, marginTop: 28, flex: 1 }}>
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#f28a16" }}>10.16</div>
            <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: 2 }}>COACH</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 35, lineHeight: 1.05, fontWeight: 900 }}>COACH THE COACH</div>
            <div style={{ fontSize: 21, marginTop: 12, color: "#d6d6d6" }}>19:30–22:00</div>
          </div>
          <div style={{ fontSize: 16, color: "#9fa3a6" }}>Limited 30 coaches</div>
        </div>

        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#f28a16" }}>10.17</div>
            <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: 2 }}>PLAYERS</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 48, lineHeight: 1, fontWeight: 900 }}>U10 / U12</div>
            <div style={{ fontSize: 20, marginTop: 12, color: "#d6d6d6" }}>U10 14:00–16:00</div>
            <div style={{ fontSize: 20, marginTop: 4, color: "#d6d6d6" }}>U12 18:00–20:00</div>
          </div>
          <div style={{ fontSize: 16, color: "#9fa3a6" }}>Limited 30 / category</div>
        </div>

        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#f28a16" }}>10.18</div>
            <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: 2 }}>PLAYERS</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 48, lineHeight: 1, fontWeight: 900 }}>U14 / U16</div>
            <div style={{ fontSize: 20, marginTop: 12, color: "#d6d6d6" }}>U14 10:00–12:00</div>
            <div style={{ fontSize: 20, marginTop: 4, color: "#d6d6d6" }}>U16 12:00–14:00</div>
          </div>
          <div style={{ fontSize: 16, color: "#9fa3a6" }}>Limited 30 / category</div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24 }}>
        <div style={{ fontSize: 18, color: "#c8c9c9", letterSpacing: 1 }}>RIOT BASKETBALL ACADEMY × PENANG</div>
        <div style={{ fontSize: 18, fontWeight: 800 }}>DEVELOP PLAYERS. CONNECT THE WORLD.</div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=604800",
      },
    },
  );
}
