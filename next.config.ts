import type { NextConfig } from "next";

// redmindsec.com is an apex custom domain served from the site root, so the
// base path is empty by default. Override only to preview a project-path build.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
