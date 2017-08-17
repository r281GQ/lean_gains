const path = require('path');
const extract = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const ENVIRONMENT = process.env.NODE_ENV;
const DEV =
  ENVIRONMENT === 'development' ? require('./config/config.json') : null;

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
];

const config = {
  entry: {
    vendor,
    bundle: './src/index.jsx',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3050',
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // loaders: ['react-hot-loader', 'babel-loader'],
        loaders: ['react-hot-loader', 'babel-loader', 'eslint-loader'],
      },
      {
        use: extract.extract({
          use: ['css-loader', 'sass-loader'],
        }),
        test: /\.scss$/,
      },
    ],
  },
  plugins: [
    new extract('style.css'),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_NUTRITIONIX_APP_KEY: JSON.stringify(
          ENVIRONMENT === 'production'
            ? process.env.NUTRITIONIX_APP_KEY
            : DEV.dev.NUTRITIONIX.APP_KEY
        ),
        REACT_APP_NUTRITIONIX_REF_KEY: JSON.stringify(
          ENVIRONMENT === 'production'
            ? process.env.NUTRITIONIX_REF_KEY
            : DEV.dev.NUTRITIONIX.REF_KEY
        ),
        REACT_APP_NUTRITIONIX_APP_ID: JSON.stringify(
          ENVIRONMENT === 'production'
            ? process.env.NUTRITIONIX_APP_ID
            : DEV.dev.NUTRITIONIX.APP_ID
        ),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({ names: ['vendor'] }),
  ],
};

module.exports = config;
