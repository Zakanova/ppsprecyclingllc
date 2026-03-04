/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
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
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.googleadservices.com https://*.doubleclick.net https://googleads.g.doubleclick.net https://*.google.com https://cdn.jsdelivr.net https://api.emailjs.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://*.google.com https://*.googleadservices.com https://*.doubleclick.net https://googleads.g.doubleclick.net https://tmbclpglikapugyldpzs.supabase.co https://api.emailjs.com; frame-src 'self' https://www.googletagmanager.com https://*.doubleclick.net; frame-ancestors 'none';",
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://ppsprecyclingllc.com',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
