const path = require('path');

module.exports = {
  entry: './src/index.js',  // Entry point of your application
  output: {
    filename: 'bundle.js',  // Output bundle name
    path: path.resolve(__dirname, 'dist'),  // Output directory
  },
  resolve: {  // Add the "resolve" configuration within the main object
    fallback: {
      util: require.resolve('util/'),
      assert: require.resolve('assert/'),
      stream: require.resolve('stream-browserify'),
      http: require.resolve('stream-http'),
      zlib: require.resolve('browserify-zlib'),
      url: require.resolve('url/'),
      crypto: require.resolve('crypto-browserify'),
    },
  },
  // Other Webpack configuration options go here
};
