'use strict';
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
require('dotenv').config();

module.exports = function makeConfig(){
    const config = {};
    config.entry = './src/app/app.js';
    config.output = {
        path: __dirname + '/dist',
        filename: '[name].[hash].js',
    };
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
                  use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                      { loader: 'css-loader'},
                    ],
                  })
              },
              {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({
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
        new ExtractTextPlugin({filename: 'css/[name].css', allChunks: true}),
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
