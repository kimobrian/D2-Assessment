'use strict';
var webpack = require('webpack');
// var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var CopyWebpackPlugin = require('copy-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

function setDevTool() {
    if (isTest) {
      return 'inline-source-map';
    } else if (isProd) {
      return 'source-map';
    } else {
      return 'eval-source-map';
    }
}

module.exports = function makeConfig(){
    const config = {};
    config.entry = './src/app/app.js';
    config.output = {
        path: __dirname + '/dist',
        filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
    };
    config.devtool = setDevTool();
    config.module = {
      rules: [
              {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [
                  /node_modules/,
                  /\.spec\.js$/
                ]
              },
              {
                test: /\.html$/,
                use: 'raw-loader'
              },
              {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                use: 'file-loader'
              },
              {
                  test: /\.css$/,
                  use: isTest ? 'null-loader' : ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                      { loader: 'css-loader'},
                    ],
                  })
              },
              {
                test: /\.(sass|scss)$/,
                use: isTest ? 'null-loader' : ExtractTextPlugin.extract({
                    use: [
                        { loader:"css-loader" },
                        { loader:"sass-loader" },
                    ],
                    fallback: 'style-loader'
                })
              }
          ]
    };

    config.plugins = [
        new HtmlWebpackPlugin({
          template: './src/public/index.html',
          inject: 'body'
        }),
        new ExtractTextPlugin({filename: 'css/[name].css', disable: !isProd, allChunks: true}),
        new ngAnnotatePlugin({
            add: true
        }),
        new webpack.DefinePlugin({
            FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
            FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
            FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
            FIREBASE_USER_EMAIL: JSON.stringify(process.env.FIREBASE_USER_EMAIL),
            FIREBASE_USER_PASSWORD: JSON.stringify(process.env.FIREBASE_USER_PASSWORD)
        })
    ];

    config.devServer = {
      contentBase: './src/public',
      stats: 'minimal'
    };
    return config;
}();
