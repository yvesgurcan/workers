const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { TARGET } = process.env;
const isProduction = TARGET === 'build';
console.log({ TARGET });

const plugins = [
    new HtmlWebPackPlugin({
        template: 'src/index.html',
        // filename: isProduction ? '../index.html' : 'index.html',
    }),
];

if (isProduction) {
    plugins.unshift(new CleanWebpackPlugin());
}

module.exports = () => ({
    output: {
        filename: '[name].[hash].js',
        hashDigestLength: 4,
        publicPath: isProduction ? 'dist/' : '',
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
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[local]_[hash:base64]',
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[local]_[hash:base64]',
                            sourceMap: true,
                        },
                    },
                ],
            },
            /*
            {
                test: /\.png$/,
                use: 'url-loader?mimetype=image/png',
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/',
                    },
                }],
            },
            */
        ],
    },
    plugins,
    devtool: 'cheap-module-eval-source-map',
});
