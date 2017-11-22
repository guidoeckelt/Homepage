//https://webpack.js.org
const webpack = require('webpack');
const path = require('path');

const config = {
    entry: {
        ge: './aalib/Main.ts',
        geAsteroids: './Asteroids/Main.ts',
        GameLauncher: './GameLauncher/Main.js',
        Asteroids: './Asteroids/Main.js',
        Tetris: './Tetris/Main.js',
        Snake: './Snake/Main.js',
        BattleArena: './BattleArena/Main.js'
    },
    output: {
        filename: '[name]/[name].bundle.js',
        path: path.join(__dirname, '../static', 'dist/build/games/')
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js?$/,
                use: 'source-map-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                enforce: 'pre',
                test: /\.ts?$/,
                use: 'source-map-loader'
            }
            
        ]
    },
    resolve: {
        modules: [
            'node_modules'
        ],
        extensions: ['.js', '.ts', '.css']
    },
    devtool: 'inline-source-map'
};
module.exports = config;
