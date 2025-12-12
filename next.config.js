/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Allow the app itself to be framed if you ever need it (optional)
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // PWA best-practice: allow service worker scope.
          { key: "Service-Worker-Allowed", value: "/" }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
