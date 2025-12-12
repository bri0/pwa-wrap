import type { Metadata, Viewport } from "next";
import { ServiceWorkerRegister } from "./sw-register";

export const metadata: Metadata = {
  title: "PWA Wrap",
  description: "Full-screen iframe wrapper as an installable PWA",
  applicationName: "PWA Wrap",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "PWA Wrap",
    statusBarStyle: "black-translucent"
  },
  formatDetection: {
    telephone: false
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  userScalable: false
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="PWA Wrap" />
        <meta name="theme-color" content="#0b0f19" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body style={{ margin: 0, background: "#0b0f19", color: "#e6e6e6" }}>
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
