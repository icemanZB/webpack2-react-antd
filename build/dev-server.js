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

let compiler = webpack(webpackConfig);

let devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
});

let hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
});

// 使用了 html-webpack-plugin 插件，强制刷新页面
compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
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