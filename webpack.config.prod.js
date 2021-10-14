const base = require('./webpack.config.base.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  ...base,
  mode: 'production', // production

  plugins: [
    ...base.plugins,
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      ...base.module.rules,
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      }
    ]
  }
};