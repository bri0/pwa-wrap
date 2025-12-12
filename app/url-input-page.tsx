"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "pwa-wrap:url";

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

export function UrlInputPage({
  heading = "PWA Wrap",
  subheading,
  showHomeLink = false
}: {
  heading?: string;
  subheading?: string;
  showHomeLink?: boolean;
}) {
  const [input, setInput] = useState<string>("");
  const [storedUrl, setStoredUrl] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY) ?? "";
      const normalized = normalizeAndValidateTargetUrl(raw);
      setStoredUrl(normalized);
      if (!normalized && raw) window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      setStoredUrl(null);
    } finally {
      setIsReady(true);
    }
  }, []);

  const normalizedInput = useMemo(() => normalizeAndValidateTargetUrl(input), [input]);

  if (isReady && storedUrl) {
    return (
      <main style={{ margin: 0, padding: 0 }}>
        <iframe
          title={storedUrl}
          src={storedUrl}
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
          {subheading ??
            "Paste a URL below, click Set, and it will be saved on this device. Next time the app opens it will load that URL automatically."}
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

          <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center" }}>
            <button
              type="button"
              onClick={() => {
                if (!normalizedInput) return;
                window.localStorage.setItem(STORAGE_KEY, normalizedInput);
                window.location.reload();
              }}
              disabled={!normalizedInput}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.18)",
                background: normalizedInput ? "#2b5cff" : "rgba(255,255,255,0.08)",
                color: "inherit",
                cursor: normalizedInput ? "pointer" : "not-allowed"
              }}
            >
              Set
            </button>

            {!normalizedInput ? (
              <div style={{ opacity: 0.75 }}>Enter a valid http(s) URL.</div>
            ) : (
              <div style={{ opacity: 0.85 }}>Click Set to save and load it.</div>
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

