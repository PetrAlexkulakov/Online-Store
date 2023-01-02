const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'development',
    module: {
        rules: [
            // {
            //     test: /\.css$/i,
            //     use: ['style-loader', 'css-loader']
            // },
            {
                test: /.(sa|sc|c)ss$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  {
                    loader: 'css-loader',
                  },
                  {
                    loader: 'resolve-url-loader',
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: true, // <-- !!IMPORTANT!!, need for working resolve-url-laoder
                    },
                  },
                ],
              },
              {
                test: /.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
              },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname,'src')]
            },
            // {
            //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
            //     type: 'asset/resource',
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: '[name].[ext]',
            //                 outputPath: './',
            //                 useRelativePath: true
            //             }
            //         }
            //     ]
            // }
        ],
    },
    resolve: {
        extensions: ['.ts','.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './public'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './src/components/index-cart.html'),
          filename: 'index-cart.html',
      }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './src/components/details.html'),
          filename: 'details.html',
      }),
        new CleanWebpackPlugin(),
        new EslingPlugin({ extensions: 'ts' }),
        new MiniCssExtractPlugin()
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
