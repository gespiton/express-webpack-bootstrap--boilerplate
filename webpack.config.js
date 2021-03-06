const webpack = require('webpack');
const path = require('path');

const publicPath = 'http://localhost:3000/';
// const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
//todo adjust entry according to env variable
const devConfig = {
    devtool: '#source-map',
    entry: [
        './client/js/entry.js',
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client'
    ],
    output: {
        filename: './js/main.js',
        path: path.resolve(__dirname, './public'),
        publicPath: publicPath
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: path.join(__dirname, './client/js/library/jquery.js'),
            jQuery: path.join(__dirname, './client/js/library/jquery.js')
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s([ac])ss$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader?source-map" // compiles Sass to CSS
                    }
                ]
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: ['file-loader']
            },
            {
                test: /\.(png|jpg)$/,
                use: ['file-loader?name=./images/[name].[ext]']
            }
        ]
    }
};

module.exports = devConfig;