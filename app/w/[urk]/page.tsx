import { decodeBase64UrlToUrl, normalizeAndValidateTargetUrl } from "../../lib/codec";

export default function WrapPage({
  params
}: {
  params: { urk: string };
}) {
  const decoded = (() => {
    try {
      return decodeBase64UrlToUrl(params.urk);
    } catch {
      return "";
    }
  })();

  const target = normalizeAndValidateTargetUrl(decoded);

  if (!target) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto" }}>
        <h1 style={{ marginTop: 0 }}>Invalid URL</h1>
        <p style={{ opacity: 0.85 }}>
          The route is <code>/w/:urk</code> where <code>:urk</code> is the base64url encoding of an http(s) URL.
        </p>
        <p style={{ opacity: 0.85 }}>
          Example: <code>/w/aHR0cHM6Ly9leGFtcGxlLmNvbQ</code>
        </p>
      </main>
    );
  }

  return (
    <main style={{ margin: 0, padding: 0 }}>
      <iframe
        title={target}
        src={target}
        allow="fullscreen"
        allowFullScreen
        referrerPolicy="no-referrer"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100dvh",
          border: "0",
          background: "#0b0f19"
        }}
      />
    </main>
  );
}
