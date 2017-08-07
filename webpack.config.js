const path = require('path');
const extract = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: ['./src/index.jsx'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    // proxy: {
    //   '/api/auth/google': {
    //     target: 'http://localhost:3050'
    //   },
    //   '/api/auth/logout': {
    //     target: 'http://localhost:3050'
    //   }
    // }
    proxy: {
      '/api' :{
        target: 'http://localhost:3050'
      }
    }
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot-loader',
          // 'babel-loader?plugins[]=transform-class-properties',
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        use: extract.extract({
          use: 'css-loader'
        }),
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new extract('style.css'),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};

module.exports = config;
