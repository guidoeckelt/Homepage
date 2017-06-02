//https://webpack.js.org
const webpack = require('webpack');
const path = require('path');

const config = {
    entry: {
        main: "./src/index.js",
        header: "./src/Controls/Header/Header.js",
        footer: "./src/Controls/Footer/Footer.js"
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/build'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js?$/,
                use: "source-map-loader"
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            }
            // {
            //     enforce: 'pre',
            //     test: /\.ts?$/,
            //     use: "source-map-loader"
            // },
            // {
            //     test: /\.tsx?$/,
            //     loader: 'ts-loader',
            //     exclude: /node_modules/
            // }
        ]
    },
    resolve: {
        extensions: ['.js', '.css']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};
module.exports = config;