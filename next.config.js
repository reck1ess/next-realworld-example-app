const withPurgeCss = require("next-purgecss");

const withOffline = require("next-offline");

const nextConfig = {
  target: "serverless",
  dontAutoRegisterSw: true,
  transformManifest: (manifest) => ["/"].concat(manifest),
  generateInDevMode: true,
  workboxOpts: {
    swDest: "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /\.(?:gif|ico|jpg|jpeg|png|svg|webp)(?:\?|$)/,
        handler: "CacheFirst",
        options: {
          cacheName: "image-cache",
          expiration: {
            maxEntries: 500,
            maxAgeSeconds: 60 * 60 * 24 * 7,
          },
        },
      },
      {
        urlPattern: /api/,
        handler: "NetworkFirst",
        options: {
          cacheableResponse: {
            statuses: [0, 200],
            headers: {
              "x-test": "true",
            },
          },
        },
      },
    ],
  },
};

module.exports = withPurgeCss(withOffline(nextConfig));
