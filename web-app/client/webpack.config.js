const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'build');
const publicPath = '/';

const cssFileName = '[name].css';
const mainExtractPlugin = new ExtractTextPlugin({filename: cssFileName, allChunks: true});
const mainExtractPluginOptions = {
    use: [{loader: 'css-loader'}]
};

const webpackConfig = {
    entry: {
        app: path.join(srcPath, 'index.js')
    },
    output: {
        filename: '[name].js',
        path: distPath,
        publicPath: publicPath
    },
    resolve: {
        extensions: ['.js'],
        modules: ['node_modules']
    },
    devtool: isDev ? 'cheap-module-eval-source-map' : false,
    module: {
        rules: [
            {
                test: /\.js$/,
                include: srcPath,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                include: srcPath,
                loader: mainExtractPlugin.extract(mainExtractPluginOptions)
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        }),
        new CleanWebpackPlugin([distPath], {root: __dirname}),
        mainExtractPlugin
    ]
};

if (isDev) {
    webpackConfig.devServer = {
        proxy: {
            "/api": "http://localhost:4000"
        },
        historyApiFallback: true,
        stats: 'minimal',
        port: 3000,
        publicPath
    }
}

// if (!isDev) {
//     webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
//         compress: {
//             warnings: false,
//             drop_console: true
//         },
//         output: {
//             comments: false
//         }
//     }));
// }

module.exports = webpackConfig;
