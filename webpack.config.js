const path = require('path');
const extract = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const vendor = [
  'axios',
  'immutable',
  'lodash',
  'material-ui',
  'moment',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'react-router-bootstrap',
  'react-router-dom',
  'react-router-redux',
  'react-tap-event-plugin',
  'redux',
  'redux-devtools-extension',
  'redux-form',
  'redux-form-material-ui',
  'redux-immutable',
  'redux-logger',
  'redux-thunk',
  'reselect',
  'styled-components'
];

const config = {
  // entry: ['./src/index.jsx'],
  entry: {
    bundle: './src/index.jsx',
    vendor
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': {
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
        loaders: ['react-hot-loader', 'babel-loader']
        // loaders: ['react-hot-loader', 'babel-loader', 'eslint-loader']
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
    }),
    new webpack.optimize.CommonsChunkPlugin({ names: ['vendor'] })
  ]
};

module.exports = config;
