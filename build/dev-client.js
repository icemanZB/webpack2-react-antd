// require('eventsource-polyfill');  // 为了兼容 IE
// https://www.npmjs.com/package/event-source-polyfill
// ?后的内容相当于为 webpack-hot-middleware 设置参数，这里 reload=true 的意思是，如果碰到不能 hot reload 的情况，就整页刷新。 
// noInfo=true 设置为 true 以禁用信息控制台日志记录。
/**
 * 这里不能使用 let 不知道为什么，只能用 var，保证 Firefox 不报错。
 */
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');

// 订阅
hotClient.subscribe((event) => {
    if (event.action === 'reload') {
        window.location.reload();
    }
});
