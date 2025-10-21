export default {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        pathname: "/api/character/avatar/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react", "@apollo/client"],
  },
};
