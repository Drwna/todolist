const base = require('./webpack.config.base.js')

module.exports = {
  mode: 'development',
  ...base,
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  module: {
    rules: [{
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    }]
  }
};