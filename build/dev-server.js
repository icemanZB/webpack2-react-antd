let path = require('path'),
    fs = require('fs'),

    opn = require('opn'),
    proxyMiddleware = require('http-proxy-middleware'),
    express = require('express'),
    app = express(),

    config = require('./config'),
    proxyTable = config.dev.proxyTable,
    port = config.dev.port,
    webpack = require('webpack'),
    webpackConfig = require('./webpack.dev.conf');

let compiler = webpack(webpackConfig); // 让 webpack 先进行编译

let devMiddleware = require('webpack-dev-middleware')(compiler, {
    // 最好配置 http://localhost:8088/ 这样的绝对地址，这是因为在使用 ?sourceMap 的时候，style-loader 会把 css 的引入做成这样 { test: /\.scss$/,loader: 'style!css?sourceMap') }
    // <link rel="stylesheet" href="blob:http://localhost:8088/"> 这种 blob 的形式可能会使得 css 里的 url() 引用的图片失效，因此建议用带 http 的绝对地址（这也只有开发环境会用到）。
    // 有关这个问题的详情，你可以查看 https://github.com/webpack-contrib/style-loader/issues/55
    publicPath: webpackConfig.output.publicPath, // 大部分情况下和 output.publicPath 相同
    noInfo: true, // 显示任何信息到控制台
    quiet: true, // 什么都不显示控制台
    stats: {
        colors: true
    }
});

let hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
});

// 使用了 html-webpack-plugin 插件，强制刷新页面 (非同步)
// Make(任务开始) => compilation(编译任务) => after-compilation(编译完成) => emit(即将准备生成文件) => after-emit(生成文件后)
compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
        // 发布一个事件，在 dev-client.js 订阅
        hotMiddleware.publish({
            action: 'reload'
        });
        cb();
    })
});

// api 转发
Object.keys(proxyTable).forEach((context) => {
    let options = proxyTable[context];
    if (typeof options === 'string') {
        options = {
            target: options
        }
    }

    if (options.target.indexOf('localhost') >= 0) {
        options.pathRewrite = (path) => {
            if (path.indexOf('?' >= 0)) {
                return path.replace('/api/', '/static/json/').replace('?', '.json?');
            }
            return path.replace('/api/', '/static/json/') + '.json';
        };
    }

    // app.use(proxyMiddleware(options.filter || context, options))

    app.use(proxyMiddleware(context, options));

});

// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')())


// webpack 编译输出
app.use(devMiddleware);

// 使用热加载和保存状态，并且编译错误显示
app.use(hotMiddleware);

// 服务端的静态资源
app.use(config.commonPath.staticPath, express.static('./static'));

let uri = 'http://localhost:' + port;

let _resolve;
let readyPromise = new Promise(resolve => {
    _resolve = resolve;
});

console.log('> Starting dev server...');

devMiddleware.waitUntilValid(() => {
    console.log('> listening at ' + uri + '\n');

    // opn(uri);

    _resolve();

});

let server = app.listen(port);

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close();
    }
};