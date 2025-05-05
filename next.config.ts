import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['cdn.dummyjson.com', 'i.dummyjson.com', 'dummyjson.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/list',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
