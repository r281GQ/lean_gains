const path = require("path");
const extract = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: ["./src/index.jsx"],
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ["react-hot-loader", "babel-loader"]
      },
      {
        use: extract.extract({
          use: "css-loader"
        }),
        test: /\.css$/
      }
    ],
  },
  plugins: [
    new extract("style.css"),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ]
};

module.exports = config;
