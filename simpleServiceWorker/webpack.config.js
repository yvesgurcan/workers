const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { TARGET } = process.env;
const isProduction = TARGET === 'build';
console.log({ TARGET });

const plugins = [
    new HtmlWebPackPlugin({
        template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    }),
];

if (isProduction) {
    plugins.unshift(new CleanWebpackPlugin());
}

module.exports = () => ({
    output: {
        filename: '[name].js',
        publicPath: isProduction ? 'dist/' : '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                ]
            },
        ],
    },
    plugins,
    devtool: 'cheap-module-eval-source-map',
});
