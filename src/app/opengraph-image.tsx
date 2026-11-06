import { ImageResponse } from "next/og";

// The preview card shown when the site is shared on LinkedIn, WhatsApp, Slack, etc.
// Next.js turns this into a 1200x630 PNG at build time.
export const alt =
  "Lilia Martínez | Engineer in Technical Support & Security Operations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#221821",
        color: "#f4e2ce",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 30,
          fontFamily: "monospace",
          color: "#ab9cac",
        }}
      >
        <span style={{ color: "#c98f87", marginRight: 16 }}>
          lili@soc-lab:~$
        </span>{" "}
        whoami
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 112,
            fontWeight: 700,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          Lilia Martínez
        </div>
        <div style={{ fontSize: 40, marginTop: 28, color: "#c98f87" }}>
          Engineer in technical support and security operations
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 28, color: "#ab9cac" }}>
        lili-martinez.vercel.app
      </div>
    </div>,
    size,
  );
}
