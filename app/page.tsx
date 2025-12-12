import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: 24
      }}
    >
      <div style={{ maxWidth: 760, width: "100%" }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>PWA Wrap</h1>
        <p style={{ opacity: 0.85, lineHeight: 1.5 }}>
          Open a URL inside a full-screen iframe. For the path form, the URL is base64url-encoded.
        </p>

        <div
          style={{
            marginTop: 16,
            padding: 16,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 12
          }}
        >
          <p style={{ marginTop: 0, opacity: 0.9 }}>
            Example:
          </p>
          <code style={{ display: "block", whiteSpace: "pre-wrap" }}>
            /w/aHR0cHM6Ly9leGFtcGxlLmNvbQ
          </code>
          <p style={{ marginBottom: 0, opacity: 0.8 }}>
            Tip: many sites block being framed using headers. If that happens, it will not load in the iframe.
          </p>
        </div>

        <div style={{ marginTop: 16 }}>
          <Link href="/w/aHR0cHM6Ly9leGFtcGxlLmNvbQ" style={{ color: "#8ab4ff" }}>
            Open example.com
          </Link>
        </div>
      </div>
    </main>
  );
}
