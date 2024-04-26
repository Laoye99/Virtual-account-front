

const path = require('path')

/** @type {import('next').NextConfig} */

// // Remove this if you're not using Fullcalendar features

// module.exports = {
//   trailingSlash: true,
//   reactStrictMode: false,
//   webpack: config => {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
//     }

//     return config
//   }
// }

const nextConfig = {
    trailingSlash: true,
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
      // Add CSV loader rule
      config.module.rules.push({
          test: /\.csv$/,
          use: ['csv-loader'],
      });

      return config;
  },
  module: {
      rules: [
          {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
          },
      ],
  },
};

module.exports = nextConfig;
