//https://webpack.js.org
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');

const config = {
    entry: {
        main: "./src/index.js",
        header: "./src/Controls/Header/Header.js",
        footer: "./src/Controls/Footer/Footer.js"
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist'
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
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin(),
        new WebpackDevServer()
    ],
    devServer: { //https://webpack.js.org/configuration/dev-server/
        contentBase: __dirname + "/",
        publicPath: "/build/",
        port: 9000,
        compress: true,
        watchContentBase: true,
        watchOptions: {
            poll: false //set to true if files are on NFS(NetworkFiileSystems) or similar
        },
        noInfo: false,
        quiet: false
    }
};
module.exports = config;