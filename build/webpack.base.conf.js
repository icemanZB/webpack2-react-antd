let config = require('./config'),
    fs = require('fs');

module.exports = {
    entry: {
        'index': './src/index.js'
    },
    output: {
        path: config.build.assetsPublicPath,
        publicPath: config.dev.assetsPublicPath,
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'src': config.commonPath.src
        }
    }
};