import { ImageResponse } from "next/og";

// Icon used when someone saves the site to their iPhone home screen (180x180).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#52242f",
        color: "#f4e2ce",
        fontSize: 100,
        fontWeight: 700,
        fontFamily: "monospace",
        letterSpacing: -6,
        paddingBottom: 12,
      }}
    >
      &gt;_
    </div>,
    size,
  );
}
