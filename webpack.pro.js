const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const productionConfig = [{
    entry: {
        main: './client/js/entry.js',
        // css: './client/css/main.sass'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                use: 'file-loader?name=/images/[name].[ext]'
            },
            {
                test: /\.s(c|a)ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader?sourceMap']
                })
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: ['file-loader?name=css/font-files/[name].[ext]']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin({
            filename: 'css/main.css',
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            $: path.join(__dirname, './client/js/library/jquery.js'),
            jQuery: path.join(__dirname, './client/js/library/jquery.js')
        }),
    ]
}];

module.exports = productionConfig;
