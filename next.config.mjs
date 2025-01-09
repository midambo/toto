import MDX from "@next/mdx";

const withMDX = MDX();

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: process.env.DOCKER ? "standalone" : undefined,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      { hostname: "files.stripe.com" },
      { hostname: "d1wqzb5bdbcre6.cloudfront.net" },
      { hostname: "*.blob.vercel-storage.com" },
    ],
  },
  experimental: {
    turbo: {
      rules: {
        // Configure @svgr/webpack for SVG files
        '*.svg': ['@svgr/webpack'],
      },
    },
    esmExternals: true,
    scrollRestoration: true,
    mdxRs: true,
  },
  transpilePackages: ["next-mdx-remote", "commerce-kit"],
  rewrites: () => {
    return [];
  },
};

export default withMDX(nextConfig);
