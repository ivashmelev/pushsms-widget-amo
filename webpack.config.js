const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = env => {
    return {
        entry: {
            card: './src/card/index.jsx',
            settings: './src/settings/index.jsx'
        },
        output: {
            path: path.join(__dirname, '/widget/build'),
            filename: '[name]/bundle.js',
            publicPath: '/'
        },
        optimization: {
            minimize: false,
            minimizer: [new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            })],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: './fonts'
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.less$/,
                    use: [
                        { loader: "style-loader" },
                        { loader: "css-loader" },
                        {
                            loader: "less-loader",
                            options: {
                                lessOptions: {
                                    modifyVars: {
                                        'primary-color': '#4ad3d1'
                                    },
                                    javascriptEnabled: true
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    exclude: /\.module\.s(a|c)ss$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    mode: 'local',
                                    localIdentName: '[local]',
                                    context: path.resolve(__dirname, 'src'),
                                },
                            },
                        },
                        'sass-loader'
                    ],
                },
                {
                    test: /\.module\.s(a|c)ss$/,
                    loader: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    mode: 'local',
                                    localIdentName: '[name]__[local]--[hash:base64:5]',
                                    context: path.resolve(__dirname, 'src'),
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', 'otf', '.json'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: path.join(__dirname, '/widget/build/card/index.html'),
                chunks: ['card'],
                inlineSource: '.(js|css)$'
            }),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                filename: path.join(__dirname, '/widget/build/settings/index.html'),
                chunks: ['settings'],
                inlineSource: '.(js|css)$'
            }),
            new HtmlWebpackInlineSourcePlugin(),
        ],
        devServer: {
            contentBase: path.join(__dirname, '/widget/build'),
            compress: {
                drop_console: true
            },
            port: 5000,
            hot: true,
            https: true,
        },
    }
};