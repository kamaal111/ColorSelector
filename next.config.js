/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  exportPathMap,
  assetPrefix: "",
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")],
  },
};

async function exportPathMap(_defaultPathMap) {
  return {
    "/": { page: "/" },
    "/edit": { page: "/edit" },
  };
}

module.exports = nextConfig;
