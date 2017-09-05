const path = require('path');
const extract = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const webpack = require('webpack');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const ENVIRONMENT = process.env.NODE_ENV;
const DEV =
  ENVIRONMENT === 'development' ? require('./config/config.json') : null;

const config = {
  entry: {
    bundle: ['babel-polyfill', './src/index.jsx']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash].js',
    // filename: '[name]-bundle.js',
    chunkFilename: '[name].[hash]-chunk.js',
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
        // loaders: ['react-hot-loader', 'babel-loader'],
        loaders: ['babel-loader', 'eslint-loader']
      },
      {
        use: extract.extract({
          use: ['css-loader', 'sass-loader']
        }),
        test: /\.scss$/
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.(pdf)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new extract('style.css'),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
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
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'dependencies',
      filename: 'dependencies.js',
      minChunks(module, count) {
        const context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'redux-form',
      minChunks(module, count) {
        const context = module.context;
        return (
          context &&
          context.indexOf('node_modules') >= 0 &&
          ['redux-form', 'lodash'].find(item =>
            new RegExp('\\\\' + item + '\\\\', 'i').test(context)
          )
        );
      }
    })
  ]
};

if (process.env.NODE_ENV === 'production' || process.env.ANALYZE)
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({ sourceMap: false })
  );

if (process.env.NODE_ENV === 'development') config.devtool = 'source-map';

if (process.env.NODE_ENV === 'development')
  config.module.rules[0].loaders.unshift('react-hot-loader');

if (process.env.ANALYZE) config.plugins.push(new BundleAnalyzerPlugin());

module.exports = config;
