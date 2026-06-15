import { ImageResponse } from "next/og";

// IndexNode CRM favicon — violet rounded square + white lightning bolt.
// Matches the sidebar logo in `src/components/layout/sidebar.tsx`.
// Next.js renders this at build time and auto-injects <link rel="icon"> into <head>.

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#7c3aed",
          borderRadius: 6,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#ffffff"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Lightning bolt */}
          <path d="M13 2L4.5 13.5H11L10 22L19.5 10H13L13 2Z" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
