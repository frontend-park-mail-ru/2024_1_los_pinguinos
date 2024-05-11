const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: { app: './index.tsx', sw: './sw.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            { test: /\.svg$/, use: 'svg-inline-loader' },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            // Prefer `dart-sass`
                            implementation: require('sass'),
                        },
                    },
                ],
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript',
                        ],
                        plugins: [
                            [
                                '@babel/plugin-transform-react-jsx',
                                {
                                    pragma: 'createElement', // Match this with your createElement function
                                },
                            ],
                        ],
                    },
                },
            },
            { test: /\.html$/, use: ['html-loader'] },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Разрешаем импорт файлов без указания расширения
        alias: {
            reactor: path.resolve('./src/reactor/index.ts'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            favicon: './src/assets/logo.webp',
            manifest: './manifest.json',
            inject: true,
            publicPath: '/',
        }),
        new webpack.ProvidePlugin({
            createElement: ['reactor', 'createElement'],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'), // Папка для статических файлов
        },
        port: 3000, // Порт для dev сервера
        open: true, // Автоматически открывать браузер при запуске dev сервера
        historyApiFallback: true, // This is the key config to redirect all server requests to /index.html
        compress: true, // Enable gzip compression
        hot: true, // Enable webpack's Hot Module Replacement feature
    },
    mode: 'production',
    optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};
