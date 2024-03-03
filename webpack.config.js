const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './index.js',
        output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {test: /\.svg$/, use: 'svg-inline-loader'},
            {test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
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
                inject: true,
                publicPath: '/'
            },
        ),
    ],
    mode: 'production',
};

