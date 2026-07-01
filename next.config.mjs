const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/download/:slug',
        destination: '/api/download/:slug',
      },
    ];
  },
};

export default nextConfig;
