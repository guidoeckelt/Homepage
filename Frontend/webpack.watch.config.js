//https://webpack.js.org
const webpack = require('webpack');
const path = require('path');

const config = require('./webpack.build.config');

config.watch = true;


module.exports = config;