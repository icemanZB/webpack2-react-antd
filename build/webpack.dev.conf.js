let merge = require('webpack-merge'),
    htmlWebpackPlugin = require('html-webpack-plugin'),
    friendlyErrors = require('friendly-errors-webpack-plugin'),
    webpack = require('webpack'),

    baseWebpackConfig = require('./webpack.base.conf'),
    config = require('./config');

Object.keys(baseWebpackConfig.entry).forEach((name) => {
    // ./dev-client.js 提示路径找不到 
    baseWebpackConfig.entry[name] = ['./build/dev-client.js'].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {

    // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
    // 牺牲了构建速度的 'source-map' 是最详细的。
    // cheap-module-eval-source-map 对于开发环境是速度的最快
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"development"'
            }
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin\
        new htmlWebpackPlugin({
            filename: 'index.html',
           //  template: 'index.html',
           template: config.commonPath.src + '/index_build.html',
            inject: true
        }),
        new friendlyErrors()
    ]

});