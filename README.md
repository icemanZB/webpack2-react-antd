# webpack2-react-antd
1. 安装指定版本的 webpack `npm install webpack@2.6.1 --save-dev`
> * 对于大多数项目，建议本地安装。这可以在引入破坏式变更(breaking change)的依赖时，更容易分别升级项目。 <br>
> * 通常，webpack 通过运行一个或多个 **npm scripts**，会在本地 **node_modules** 目录中查找安装的 webpack。 <br>
> * 当在本地安装 webpack 后，能够从 **node_modules/.bin/webpack** 访问它的 bin 版本。 <br>
> * 查看 webpack 版本信息 `npm info webpack` <br>
> * 执行 webpack，会将我们的脚本作为入口起点，然后输出为 bundle.js `./node_modules/.bin/webpack src/index.js dist/bundle.js` <br>
> * 大多数项目会需要很复杂的设置，可以使用 webpack 的配置文件  **webpack.config.js**，如果 **webpack.config.js** 存在，则 webpack 命令将默认选择使用它。 <br>
> * `./node_modules/.bin/webpack --config webpack.config.js` --config 选项表明，可以传递任何名称的配置文件。这对于需要拆分成多个文件的复杂配置非常有用。 <br>
> * 考虑到用 CLI 这种方式来运行本地的 webpack 不是特别方便，可以设置一个快捷方式。在 package.json 添加一个 npm 脚本(npm script)，现在，可以使用 `npm run build` 命令，来替代之前用到的较长命令。 <br>
> * 注意，使用 npm 的 **scripts**，可以通过模块名，来引用本地安装的 npm 包，而不是写出完整路径。这是大多数基于 npm 的项目遵循的标准，允许我们直接调用 webpack，而不是去调用 node_modules/webpack/bin/webpack.js。 <br>
```
package.json >>
"scripts": {
    "start": "webpack --config webpack.config.js",
    "build": "webpack"
}
```

2. 安装 react 相关内容 `npm install react react-dom redux redux-logger redux-thunk --save` <br>
&emsp;&emsp;* **react react-dom** 之间的区别 [参考链接](https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html) <br>
&emsp;&emsp;1). react 已经和浏览器或者 DOM 没有关系了，为了构建体积更小，适应更多的环境，拆分了 react react-dom。使得在编写 web 和 react-native 之间铺平了道路，可以跨平台共享组件。 <br>
&emsp;&emsp;2). react 包括 **React.createElement**、**.createClass**、**.Component**、**.PropTypes、.Children** <br>
&emsp;&emsp;3). react-dom 包括 **ReactDOM.render**、**.unmountComponentAtNode**、**.findDOMNode** <br>
&emsp;&emsp;4). react-dom/server 中有服务端的一些渲染接口 **ReactDOMServer.renderToString**、**.renderToStaticMarkup** <br>
&emsp;&emsp;以下这种旧的写法可以支持到 **0.15** 版本 <br>
```javascript
    var React = require('react');
    var ReactDOM = require('react-dom');

    var MyComponent = React.createClass({
        render: function() {
            return <div>Hello World</div>;
        }
    });

    ReactDOM.render(<MyComponent />, node);
```
&emsp;&emsp;5). 只有引用 **react-dom** 以后才能调用 **this.refs.giraffe.getDOMNode()** 获取底层的 DOM 节点。注意，自定义（用户定义）组件的参考与以前完全一致;只有内置的 DOM 组件受此更改的影响。 <br>
&emsp;&emsp;6). 此更改也适用于将 DOM 节点作为顶层组件传递时，**ReactDOM.render** 的返回结果。 <br>
&emsp;&emsp;7). 有了这个变化，将弃用 **.getDOMNode()** 并将其替换为 **ReactDOM.findDOMNode()**。如果您的组件正在使用 **.getDOMNode()**，它们将继续使用警告，直到 **0.15** 版本。 <br>
```javascript
    var Zoo = React.createClass({
        render: function() {
            return <div>Giraffe name: <input ref="giraffe" /></div>;
        },
        showName: function() {
            // 之前写法 var input = this.refs.giraffe.getDOMNode();
            var input = this.refs.giraffe;
            alert(input.value);
        }
    });
```
&emsp;&emsp;总结：两者的区别就是 **react-dom** 是 **react** 的一部分。**react-dom** 是 **react** 和 DOM 之间的粘合剂，一般用来定义单一的组件，或者结合 **ReactDOM.findDOMNode()** 来使用。更重要的是 **react-dom** 包已经允许开发者删除 **react** 包添加的非必要的代码，并将其移动到一个更合适的存储库。从 **0.14** 版本开始，**react** 库被拆成了两个，**react.render** 在 **0.14** 版本已经不建议使用，如果你使用的话，在 **console** 里会有一个警告。并且在 **0.15** 版本中可能不再被支持。 <br>
&emsp;&emsp;* **redux-logger** 使用 **redux-logger** 中间件实现前端 log 日志打印 action 功能 <br>
&emsp;&emsp;* **redux-thunk** **redux-thunk** 中间件允许用于延迟动作的发送，或者只有在满足某个条件时才能发送（异步），内部函数接收 **store** 方法 **dispatch** 和 **getState** 作为参数。 <br>

3. 安装 **react-router3** 的版本，由于 4 版本 bug 有点多，暂时不使用 `npm install react-router@3.0.2 --save` <br>

4. 安装 webpack 相关的一些辅助插件 `npm install express webpack-merge webpack-dev-middleware webpack-hot-middleware http-proxy-middleware --save-dev` <br>
> * 基于 Node.js 平台，快速、开放、极简的 web 开发框架。 [参考网址](http://expressjs.com/zh-cn/) <br>
> > Express　本质是一系列　middleware　的集合，middleware 的用途，就是在輸入到輸出的過程中加工的一種手段。因此，适合　Express　的　webpack　开发工具是 webpack-dev-middleware　和　webpack-hot-middleware <br>

> * **webpack-merge** 提供了一个合并函数 [参考网址](https://www.npmjs.com/package/webpack-merge) <br>

> * **webpack-dev-middleware** 就是一个运行于内存中的文件系统，也是 express 的中间件。[参考网址](https://github.com/webpack/webpack-dev-middleware/) <br>
> > webpack-dev-middleware 是 webpack 的一个中间件。它用于在 Express 中分发需要通过 webpack 编译的文件。 <br>
> > 特性：1) 不会在硬盘中写入文件，完全基于内存实现。2) 如果在请求某个静态资源的时候，webpack编译还没有运行完毕，webpack-dev-server不会让这个请求失败，而是会一直阻塞它，直到webpack编译完毕。这个对应的效果是，如果你在不恰当的时候刷新了页面，不会看到错误，而是会在等待一段时间后重新看到正常的页面，就好像“网速很慢”。 <br>

> * **webpack-hot-middleware** 热替换，配合 webpack-dev-middleware 使用 [参考网址](https://www.npmjs.com/package/webpack-hot-middleware) <br>
> > webpack-hot-middleware 是一个结合 webpack-dev-middleware 使用的 middleware ，它可以实现浏览器的无刷新更新(hot reload)。<br>
> > webpack-hot-middleware 它通过订阅 webpack 的编译更新，之后通过执行 webpack 的 HMR api 将这些代码模块的更新推送给浏览器端。 <br>
> > **HMR** ( Hot Module Replacement ) 的实现原理是在我们的开发中的应用代码中加入了 HMR Runtime，它是 HMR 的客户端 ( 浏览器端 client ) 用于和开发服务器通信，接收更新的模块。服务端工作就是 webpack-hot-middleware 的，它会在代码更新编译完成之后通过以 json 格式输出给 HMR Runtime，然后根据 json 中描述来动态更新相应的代码。( f12 XHR 中可以看到 `_webpack_hmr` 的一个文件，查看 EventStream 中的 json) 

> * **http-proxy-middleware** nodejs 代理，转发所有请求代理到真实的后端真实 API 地址，可避免跨域。[参考网址](https://www.npmjs.com/package/http-proxy-middleware) <br>

5. 安装 **opn** `npm install opn --save-dev` 打开默认浏览器 [参考网址](https://www.npmjs.com/package/opn)<br>

6. 安装 **html-webpack-plugin** `npm install html-webpack-plugin --save-dev` 自动创建 html 文件。[参考网址](https://github.com/ampedandwired/html-webpack-plugin) <br>

7. 安装 **friendly-errors-webpack-plugin** `npm install friendly-errors-webpack-plugin --save-dev` 友好的错误提示 [参考网址](https://www.npmjs.com/package/friendly-errors-webpack-plugin)<br>

8. 安装 **css-loader** `npm install css-loader --save-dev` **css-loader** 使你能够使用类似 `@import` 和 `url(...)` 的方法实现 `import/require()` 的功能。 [参考网址](https://www.npmjs.com/package/css-loader)<br>

9. 安装 **style-loader** `npm install style-loader --save-dev` **style-loader** 将所有的计算后的样式加入页面中，与 **css-loader** 组合在一起使你能够把样式表嵌入 webpack 打包后的 JS 文件中。[参考网址](https://www.npmjs.com/package/style-loader)<br>
```
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
                    modules: true
                }
            }
        ]
    }]
}
```

10. 安装 **postcss-loader** 和 **autoprefixer** `npm install postcss-loader autoprefixer --save-dev` **postcss-loader** 它的作用是提供一个 CSS 解析器和创建可以分析，测试，处理资源，优化，创建回调，和传输给其它解析CSS框架的插件的框架。  **postcss-loader**、**autoprefixer** 来为 CSS 代码自动添加适应不同浏览器的 CSS 前缀。[参考网址](https://www.npmjs.com/package/postcss-loader)<br>
```
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
    }]
}
```

11. 安装 **file-loader** `npm install file-loader --save-dev` 图像处理、加载字体 [参考网址](https://www.npmjs.com/package/file-loader)<br>
> * 当 import Img from './my-image.png'，该图像将被处理并添加到 output 目录，并且 Img 变量将包含该图像在处理后的最终 url。 <br>
> * 当使用 css-loader 时，CSS 中的 url('./my-image.png') 会使用类似的过程去处理。 <br>
> * loader 会识别这是一个本地文件，并将 './my-image.png' 路径，替换为输出目录中图像的最终路径。html-loader 以相同的方式处理 `<img src="./my-image.png" />`。 <br>

12. 安装 **less** 和 **less-loader** `npm install less less-loader --save-dev` less 编辑环境和 less 加载器 [参考网址](https://www.npmjs.com/package/less-loader)<br> 

13. 安装 **clean-webpack-plugin** `npm install clean-webpack-plugin --save-dev` 打包构建前，先删除之前构建的内容。 [参考网址](https://www.npmjs.com/package/clean-webpack-plugin) <br>

14. 安装 **transfer-webpack-plugin** `npm install transfer-webpack-plugin --save-dev` 打包构建的时候复制静态资源 [参考网址](https://www.npmjs.com/package/transfer-webpack-plugin) <br>

15. 安装 **extract-text-webpack-plugin** `npm install extract-text-webpack-plugin@2.1.2 --save-dev` 打包构建的时候，提取 html 中的 css 样式，并生成相应的 css 模块文件 <br>

16. 安装 **optimize-css-assets-webpack-plugin** `npm install optimize-css-assets-webpack-plugin --save-dev` 优化\最小化 **extract-text-webpack-plugin** 生成的 CSS 文件，处理解决 **extract-text-webpack-plugin** CSS重复问题(压缩提取出的css，并解决 **extract-text-webpack-plugin** 分离出的js重复问题，多个文件引入同一css文件) [参考网址](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin) <br>

17. 安装 **rimraf** `npm install rimraf --save-dev` UNIX命令rm -rf [参考网址](https://www.npmjs.com/package/rimraf) <br>

18. 安装 **chalk** `npm install chalk --save-dev` 终端输出颜色高亮 [参考网址](https://www.npmjs.com/package/chalk) <br>

19. 安装 **ora** `npm install ora --save-dev` 终端 loading [参考地址](https://www.npmjs.com/package/ora) <br>

20. 安装 **babel-preset-env** `npm install babel-preset-env --save-dev` **babel-preset-env** 可以根据配置的目标运行环境自动启用需要的 babel 插件。[参考网址](https://www.npmjs.com/package/babel-preset-env) <br>

21. 安装 **babel-plugin-transform-runtime** `npm install babel-plugin-transform-runtime --save-dev` 解决编译后的代码函数 _defineProperty 可能会重复出现在一些模块里。[参考网址](https://www.npmjs.com/package/babel-plugin-transform-runtime) <br>

22. 安装 **babel-preset-stage-2** `npm install babel-preset-stage-2 --save-dev` ES7不同阶段语法提案的转码规则（共有4个阶段） [参考网址](https://www.npmjs.com/package/babel-preset-stage-2) <br>

23. 安装 **babel-loader** `npm install babel-loader --save-dev` Babel 和 Webpack 进行 js 文件的转换 [参考网址](https://www.npmjs.com/package/babel-loader) <br>

全局安装 npm install -g eslint


使用babel6的一些简单分享 https://cnodejs.org/topic/56460e0d89b4b49902e7fbd3

babel-preset-env  https://segmentfault.com/p/1210000008466178 

babel-plugin-transform-runtime   https://segmentfault.com/q/1010000005596587?from=singlemessage&isappinstalled=1

babel-core 应该要安装? https://segmentfault.com/a/1190000008159877

export default 和 export?  http://www.jianshu.com/p/edaf43e9384f

exports 和 export




