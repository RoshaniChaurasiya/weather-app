const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    http: path.resolve(__dirname, 'node_modules/stream-http'),
    https: path.resolve(__dirname, 'node_modules/https-browserify'),
    os: path.resolve(__dirname, 'node_modules/os-browserify/browser'),
    url: path.resolve(__dirname, 'node_modules/url')
  })
);
