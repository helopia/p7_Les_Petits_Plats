const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
module.exports = {
    plugins: [
        new MiniCssExtractPlugin(),
        new LodashModuleReplacementPlugin,
        // new webpack.optimize.UglifyJsPlugin
    ],
    //watch: true,
    devtool: false,
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                loader: "babel-loader",
                options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['lodash'],
                        presets: [['env', { 'modules': false, 'targets': { 'node': 4 } }]]
                    }
                },
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
                test: /.s?css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            `...`,
            new CssMinimizerPlugin(),
            new UglifyJsPlugin()

        ],
    },
    mode: 'development',
};
