const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: {'app': './index.js', 'sw': './sw.js'},
        output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {test: /\.svg$/, use: 'svg-inline-loader'},
            {test: /\.css$/, use: [ 'style-loader', 'css-loader',
            {
                loader: 'sass-loader',
                options: {
                  // Prefer `dart-sass`
                  implementation: require('sass'),
                },
              },
        ] },
            {test: /\.js$/, exclude: /node_modules/, use: ['babel-loader']},
            {test: /\.hbs$/,
            loader: 'handlebars-loader',
            options: {
                partialDirs: path.resolve(__dirname, 'src/'), // путь к директории с частичными шаблонами Handlebars
            },
        },
            {test: /\.html$/, use: ['html-loader']},
        ],
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './index.html',
                filename: 'index.html',
                favicon: './src/assets/logo.webp',
                manifest: './manifest.json',
                inject: true,
                publicPath: '/',
            },
        ),
    ],
    mode: 'production',
    optimization: { 
        usedExports: true,
        minimize: true,
        minimizer: [new TerserPlugin()], 
    }, 
};

