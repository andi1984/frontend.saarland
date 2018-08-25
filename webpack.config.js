const path = require('path');
const ASSETS_PATH = path.join(__dirname, 'static');
const JS_PATH = path.resolve('js');
const CSS_PATH = path.resolve('postcss');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const Webpack = require('webpack');
const extractCSS = new ExtractTextPlugin({
    filename: '[name].css',
    disable: false
});

const config = {
    mode: 'production',
    entry: {
        main: path.join(JS_PATH, 'main.js')
    },
    output: {
        path: path.resolve(__dirname, ASSETS_PATH),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    use: [
                        {
                            loader: 'css-loader' // translates CSS into CommonJS
                        },
                        {
                            loader: 'postcss-loader' // compiles Sass to CSS
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(png|jpg|gif|woff(2)?|eot|ttf|svg)$/,
                use: [
                    {
                        loader: 'file-loader' // creates style nodes from JS strings
                    }
                ]
            }
        ]
    },
    plugins: [
        extractCSS,
        new DashboardPlugin()
    ],
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, JS_PATH),
            path.resolve(__dirname, CSS_PATH)
        ]
    }
};

module.exports = config;
