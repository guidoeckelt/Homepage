//https://webpack.js.org
const webpack = require('webpack');
const path = require('path');

const config = require('./webpack.build.config');

config.devtool = false;
config.plugins = [
        new webpack.optimize.UglifyJsPlugin()
];
module.exports = config;