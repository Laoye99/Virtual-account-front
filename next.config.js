

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

    // Add rule for handling zip files with file-loader
    config.module.rules.push({
      test: /\.(zip)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
