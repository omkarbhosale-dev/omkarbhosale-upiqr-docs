/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/example', destination: '/docs/guides/nextjs', permanent: false },
      { source: '/example/javascript', destination: '/docs/guides/javascript', permanent: false },
      { source: '/example/nextjs', destination: '/docs/guides/nextjs', permanent: false },
      { source: '/example/clone-Repo', destination: '/docs/guides/clone-repo', permanent: false },
      { source: '/example/cloneRepo', destination: '/docs/guides/clone-repo', permanent: false },
    ];
  },
};

export default nextConfig;
