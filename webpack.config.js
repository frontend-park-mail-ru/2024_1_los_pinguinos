const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {'app': './index.ts', 'sw': './sw.js'},
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
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
        },
            {test: /\.hbs$/,
            loader: 'handlebars-loader',
            options: {
                partialDirs: path.resolve(__dirname, 'src/'), // путь к директории с частичными шаблонами Handlebars
            },
        },
            {test: /\.html$/, use: ['html-loader']},
        ],
    },
    resolve: {
        extensions: ['.jsx', '.ts', '.js'],
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
};
