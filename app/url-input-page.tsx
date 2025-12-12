"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function normalizeAndValidateTargetUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    // If user typed example.com, assume https
    try {
      url = new URL(`https://${trimmed}`);
    } catch {
      return null;
    }
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  return url.toString();
}

function encodeUrlToBase64Url(input: string): string {
  // UTF-8 -> base64 -> base64url
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  const b64 = btoa(binary);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function UrlInputPage({
  heading = "PWA Wrap",
  subheading,
  showHomeLink = false
}: {
  heading?: string;
  subheading?: string;
  showHomeLink?: boolean;
}) {
  const [origin, setOrigin] = useState<string>("");
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const normalized = useMemo(() => normalizeAndValidateTargetUrl(input), [input]);

  const wrapperUrl = useMemo(() => {
    if (!origin || !normalized) return "";
    const encoded = encodeUrlToBase64Url(normalized);
    return `${origin}/w/${encoded}`;
  }, [origin, normalized]);

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
        <h1 style={{ margin: 0, fontSize: 28 }}>{heading}</h1>
        <p style={{ opacity: 0.85, lineHeight: 1.5 }}>
          {subheading ?? (
            <>
              Paste a URL below and this site will generate a wrapper link in the form{" "}
              <code>/w/base64url(url)</code>.
            </>
          )}
        </p>

        <div
          style={{
            marginTop: 16,
            padding: 16,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 12
          }}
        >
          <label style={{ display: "block", opacity: 0.9, marginBottom: 8 }} htmlFor="target-url">
            Target URL
          </label>
          <input
            id="target-url"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://example.com"
            inputMode="url"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(0,0,0,0.15)",
              color: "inherit",
              outline: "none"
            }}
          />

          <div style={{ marginTop: 12, opacity: 0.9 }}>
            <div style={{ fontSize: 13, opacity: 0.8 }}>Generated wrapper link</div>
            {!origin ? (
              <div style={{ marginTop: 6, opacity: 0.75 }}>Detecting current domain...</div>
            ) : !normalized ? (
              <div style={{ marginTop: 6, opacity: 0.75 }}>Enter a valid http(s) URL.</div>
            ) : (
              <div style={{ marginTop: 6, wordBreak: "break-word" }}>
                <code style={{ display: "block", whiteSpace: "pre-wrap" }}>{wrapperUrl}</code>
                <div style={{ marginTop: 10 }}>
                  <Link href={wrapperUrl} style={{ color: "#8ab4ff" }}>
                    Open wrapper
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {showHomeLink ? (
          <div style={{ marginTop: 16 }}>
            <Link href="/" style={{ color: "#8ab4ff" }}>
              Back to home
            </Link>
          </div>
        ) : null}
      </div>
    </main>
  );
}

