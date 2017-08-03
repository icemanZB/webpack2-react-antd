let merge = require('webpack-merge'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    FriendlyErrors = require('friendly-errors-webpack-plugin'),
    webpack = require('webpack'),

    baseWebpackConfig = require('./webpack.base.conf'),
    config = require('./config');

Object.keys(baseWebpackConfig.entry).forEach((name) => {
    // 一定是要这样的路径 ./build/dev-client，与后面路径统一
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

// { index: [ './build/dev-client.js', './src/index.js' ] }，数组形式，将加载数组中的所有模块，但以最后一个模块作为输出。
// console.log(baseWebpackConfig.entry);

module.exports = merge(baseWebpackConfig, {

    module: {
        rules: [{
                test: /\.css$/,
                // use: ['style-loader', 'css-loader']
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        // 使用 CSS Modules
                        options: {
                            modules: true,
                            importLoaders: 1 // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [require('autoprefixer')()];
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [{
                        loader: "style-loader" // creates style nodes from JS strings 
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS 
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')()]
                        }
                    },
                    {
                        loader: "less-loader" // compiles Less to CSS 
                    }
                ]
            }
        ]
    },
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
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            //  template: 'index.html',
            template: config.commonPath.src + '/index_build.html',
            inject: true
        }),
        new FriendlyErrors()
    ]

});