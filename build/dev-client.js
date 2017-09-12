// require('eventsource-polyfill');  // 为了兼容 IE
// https://www.npmjs.com/package/event-source-polyfill
// ?后的内容相当于为 webpack-hot-middleware 设置参数，这里 reload=true 的意思是，如果碰到不能 hot reload 的情况，就整页刷新。 
// noInfo=true 设置为 true 以禁用信息控制台日志记录。
/**
 * 在 Firefox 低版本中使用 let 会报错，建议使用 var
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_2015_support_in_Mozilla
 */
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');

// 订阅
hotClient.subscribe((event) => {
    if (event.action === 'reload') {
        window.location.reload();
    }
});
