import { ImageResponse } from "next/og";

// Browser tab icon: a little terminal prompt in Lonestar and Ancient Scroll.
// Next.js turns this into a 32x32 PNG at build time.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#52242f",
        borderRadius: 7,
        color: "#f4e2ce",
        fontSize: 19,
        fontWeight: 700,
        fontFamily: "monospace",
        letterSpacing: -1,
        paddingBottom: 2,
      }}
    >
      &gt;_
    </div>,
    size,
  );
}
