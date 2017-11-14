//https://webpack.js.org
const webpack = require('webpack');
const path = require('path');

const config = {
    entry: {
        GameLauncher: "./GameLauncher/Main.js",
        Asteroids: "./Asteroids/Main.js",
        Tetris: './Tetris/Main.js',
        Snake: './Snake/Main.js'        
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, '../static', 'dist/games')
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
        modules: [
            "node_modules"
        ],
        extensions: ['.js', '.css']
    },
    devtool: 'inline-source-map'
};
module.exports = config;
