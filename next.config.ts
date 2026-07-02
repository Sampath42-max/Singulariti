import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; img-src 'self' data: blob: https:; font-src 'self' data: https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; connect-src 'self' https://open.er-api.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://www.google-analytics.com https://pagead2.googlesyndication.com https://va.vercel-scripts.com; frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; worker-src 'self' blob:; child-src 'self' blob:;",
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(self), microphone=(self), display-capture=(self), geolocation=(), payment=(), usb=(), bluetooth=(), accelerometer=(), gyroscope=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'singulariti.in',
          },
        ],
        destination: 'https://www.singulariti.in/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
