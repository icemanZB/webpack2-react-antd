### 命令行总结 <br>
> 1. `cls` 清屏 <br>
> 2. `d:` 直接进入 D 盘 <br>
> 3. `cd` 进入目录， p.s. `cd soft` <br>
> 4. `..` 进入上级目录 <br>
> 5. `ls` 查看目录结构 <br>
> 6. mkdir hello 创建 hello 文件夹 <br>
> 7. notepad hello.text 创建文件 <br>
> 8. "Tab" 键可以自动补全 <br>

# webpack2-react-antd
1. 安装指定版本的 webpack `npm install webpack@2.6.1 --save-dev`
> * 对于大多数项目，建议本地安装。这可以在引入破坏式变更(breaking change)的依赖时，更容易分别升级项目。 <br>
> * 通常，webpack 通过运行一个或多个 **npm scripts**，会在本地 **node_modules** 目录中查找安装的 webpack。 <br>
> * 当在本地安装 webpack 后，能够从 **node_modules/.bin/webpack** 访问它的 bin 版本。 <br>
> * 查看 webpack 版本信息 `npm info webpack` <br>
> * `npm uninstall 模块名` 删除某个模块 <br>
> * 在 package.json 文件中指定版本号，重新进行 `npm install` 会安装现在版本而不是 package.json 中指定的版本 <br>
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
&emsp;&emsp;安装 **react@15.6.1 react-dom@15.6.1** 是不用安装 prop-types 也能跑起 antd 和 react-router，react@15.4.2 没有吧 prop-types 提出去，需要安装对应版本的 react-router 和 antd<br>
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

3. 安装 **react-router3** 的版本，由于 4 版本 bug 有点多，暂时不使用 `npm install react-router@3.0.5 --save` [参考网址](https://github.com/ReactTraining/react-router) api 文档 [参考网址](https://github.com/ReactTraining/react-router/blob/v3/docs/API.md)<br>
> * react-router3 在使用 **hashHistory** 的时候会重复渲染2次组件的 bug，只能使用 **shouldComponentUpdate** 方式避免，不过react-router@3.0.5 修复了 react@15.5.x 的 waring <br>
> * 考虑使用 react-router2.8.1 的稳定版本，没有什么问题，但只能安装react版本在v15.5.0以下的，避免**prop-types**报错，一般安装react@15.4.2、react-dom@15.4.2 `npm install react-router@2.8.1 --save` <br>
> * 安装 **connect-history-api-fallback** `npm install connect-history-api-fallback --save-dev` 处理刷新页面后 router 404 的问题 [参考网址](https://www.npmjs.com/package/connect-history-api-fallback) <br>

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

6. 安装 **html-webpack-plugin** `npm install html-webpack-plugin --save-dev` 自动创建 html 文件。又可以自定义参数进行配置，在 html 中可以直接使用<%= htmlWebpackPlugin.options.date%>。还可以遍历htmlWebpackPlugin，<% for(var key in htmlWebpackPlugin){ %> <%= key %> <% } %> [参考网址](https://github.com/ampedandwired/html-webpack-plugin) <br>

7. 安装 **friendly-errors-webpack-plugin** `npm install friendly-errors-webpack-plugin --save-dev` 友好的错误提示 [参考网址](https://www.npmjs.com/package/friendly-errors-webpack-plugin)<br>

8. 安装 **css-loader** `npm install css-loader --save-dev` **css-loader** 使你能够使用类似 `@import` 和 `url(...)` 的方法实现 `import/require()` 的功能，处理 css 文件。 [参考网址](https://www.npmjs.com/package/css-loader)<br>

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

13. 安装 **transfer-webpack-plugin** `npm install transfer-webpack-plugin --save-dev` 打包构建的时候复制静态资源 [参考网址](https://www.npmjs.com/package/transfer-webpack-plugin) <br>

14. 安装 **extract-text-webpack-plugin** `npm install extract-text-webpack-plugin@2.1.2 --save-dev` 打包构建的时候，提取 html 中的 css 样式，并生成相应的 css 模块文件 <br>

15. 安装 **optimize-css-assets-webpack-plugin** `npm install optimize-css-assets-webpack-plugin --save-dev` 优化\最小化 **extract-text-webpack-plugin** 生成的 CSS 文件，处理解决 **extract-text-webpack-plugin** CSS重复问题(压缩提取出的css，并解决 **extract-text-webpack-plugin** 分离出的js重复问题，多个文件引入同一css文件) [参考网址](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin) <br>

16. 安装 **rimraf** `npm install rimraf --save-dev` UNIX命令rm -rf，删除目标文件夹，打包构建前，先删除之前构建的内容。 [参考网址](https://www.npmjs.com/package/rimraf) <br>

17. 安装 **chalk** `npm install chalk --save-dev` 终端输出颜色高亮 [参考网址](https://www.npmjs.com/package/chalk) <br>

18. 安装 **ora** `npm install ora --save-dev` 终端 loading [参考地址](https://www.npmjs.com/package/ora) <br>

19. 安装 **babel-core** `npm install babel-core --save-dev` 当你想在代码中运行es6代码的话，需要安装 babel-core [参考地址](https://www.npmjs.com/package/babel-core) <br>
> * babel-core 的作用是把 js 代码分析成 ast，方便各个插件分析语法进行相应的处理。有些新语法在低版本 js 中是不存在的，如箭头函数、rest 参数、函数默认值等，这种语言层面的不兼容只能通过将代码转为 ast，分析其语法后再转为低版本 js。 <br>

20. 安装 **babel-preset-env** `npm install babel-preset-env --save-dev` **babel-preset-env** 可以根据配置的目标运行环境自动启用需要的 babel 插件。[参考网址](https://www.npmjs.com/package/babel-preset-env) <br>
> * [配置的目标运行环境](https://segmentfault.com/p/1210000008466178)
> * stage-0 它包含 stage-1, stage-2 以 及stage-3 的所有功能，同时还包括两个插件：transform-do-expressions(编译do表达式)、transform-function-bind(编译bind运算符，也就是::) <br>
> * stage-1 除了包含 stage-2 和 stage-3，还包括两个插件，transform-class-constructor-call(编译 class 中的 constructor，在 Babel7 中会被移除)、transform-export-extensions(编译额外的exprt语法，如export * as ns from "mod") <br>
> * stage-2 除了包含 stage-3 的内容，还包括个插件 transform-class-properties( 编译静态属性(es2015)和属性初始化语法声明的属性(es2016) ) <br>
> * stage-3 除了包含 stage-4 的内容，还包括两个插件 transform-object-rest-spread(编译对象的解构赋值和不定参数)、transform-async-generator-functions(将 async generator function 和 for await 编译为 es2015 的 generator ) <br>
> * [stage-x](http://babeljs.io/docs/plugins/)

21. 安装 **babel-plugin-transform-runtime** `npm install babel-plugin-transform-runtime --save-dev` 解决编译后的代码函数 _defineProperty 可能会重复出现在一些模块里。[参考网址](https://www.npmjs.com/package/babel-plugin-transform-runtime) <br>
> * [babel的polyfill和runtime的区别](https://segmentfault.com/q/1010000005596587?from=singlemessage&isappinstalled=1)

22. 安装 **babel-preset-stage-2** `npm install babel-preset-stage-2 --save-dev` ES7不同阶段语法提案的转码规则 [参考网址](https://www.npmjs.com/package/babel-preset-stage-2) <br>

23. 安装 **babel-preset-react** `npm install --save-dev babel-preset-react` 使用 babel 编译 react [参考网址](https://www.npmjs.com/package/babel-preset-react) <br>

24. 安装 **babel-loader** `npm install babel-loader --save-dev` babel 和 webpack 进行 js 文件的转换 [参考网址](https://www.npmjs.com/package/babel-loader) <br>

25. 安装 **babel-plugin-import** `npm install babel-plugin-import --save-dev` 支持 antd 按需加载 js 和 css。 [参考网址](https://github.com/ant-design/babel-plugin-import) <br>

26. 安装 **antd** `npm install antd --save` UI组件库，如果项目中使用的是react@15.4.2 ，必须安装**prop-types**  [参考地址](https://ant.design/docs/react/introduce-cn) <br>


https://www.npmjs.com/package/prop-types

optimize-css-assets-webpack-plugin 测试次插件，多个文件引入同一个css

异步加载 webpack2

提取第三方库 webpack dll http://www.jianshu.com/p/a5b3c2284bb6
webpack 编译css 样式去重 https://www.zhihu.com/question/54418211

全局安装 npm install -g eslint

使用babel6的一些简单分享 https://cnodejs.org/topic/56460e0d89b4b49902e7fbd3

export default 和 export?  http://www.jianshu.com/p/edaf43e9384f

exports 和 export

Happypack

//Enhance.js
import { Component } from "React";

export var Enhance = ComposedComponent => class extends Component {
    constructor() {
        this.state = { data: null };
    }
    componentDidMount() {
        this.setState({ data: 'Hello' });
    }
    render() {
        return <ComposedComponent {...this.props} data={this.state.data} />;
    }
};
//HigherOrderComponent.js
import { Enhance } from "./Enhance";

class MyComponent {
    render() {
        if (!this.data) return <div>Waiting...</div>;
        return <div>{this.data}</div>;
    }
}

export default Enhance(MyComponent); // Enhanced component

用一个“增强函数”，来为某个类增加一些方法，并且返回一个新类，这无疑能实现mixin所实现的大部分需求。


webstorm 配置
1、拼音检查 Editor -> Inspections -> Profile(选择 Default) -> typo(输入) -> 勾去掉

2、静态方法 Editor -> Inspections -> Profile(选择 Default) -> Method can be static(输入) -> 勾去掉

3、Editor -> Inspections -> XML -> Unbound XML namespace prefix

4、去掉自动保存 File -> Settings -> Appearance & Behavior -> System Settings 中的只留第一个勾
   在 File -> Settings -> Editor -> General -> Editor Tabs 中把 Mark modified tabs width asterisk 打上勾
   Synchronize files on frame or editor tab activation ( 激活当前窗口时保存 )
   Save files on frame deactivation 切换到其他窗口的时候( 当前窗口没有被激活 ) 保存
   Use safe write ( save changes to a temporary file first ) 安全写入，只要能重命名成功就会覆盖掉源文件来达到安全自动保存的目的
   所以这个安全会不停的保存源文件。关掉这个选项就只会在很少的情况下自动保存。

5、配置 git
   git config --global user.name "zhoubing"、git config --global user.email "254784109@qq.com"
   查看全局的邮箱或名字：git config --global user.email
   webstorm 中 Version Control -> GitHub -> Auth Type(选择 Password) -> 输入账号密码

6、CSS颜色显示在代码上面
   Editor -> General -> Appearance -> Show CSS color preview as background(打勾)，去掉 Show CSS color preview icon in gutter

7、Code Style 把用到的语言统一设置 -> Tabs and Indents -> Use tab character(打勾) -> Smart tabs(打勾) -> 设置 Indent 为 4

8、设置js对齐方式
   Code Style -> JavaScript -> other -> Align object properties(选择 On colon) -> Align ‘var’ statements and assignments(选择 Align multiline ‘var’ statements)

9、设置一些其他的 Code Style
  JavaScript -> Wrapping and Braces -> Simple methods in one line(打勾)、Comment at first column(去掉打勾)、ES6 import/export(Do not wrap)
  HTML -> Wrap text(去掉打勾)、Wrap attributes ( Do not wrap )
  JSON -> Wrapping and Braces -> Arrays(Do not wrap)

10、添加 vue 模板
    Editor -> File and Code Templates 添加 Vue Component
    代码片段：
    <template>
        <div></div>
    </template>

    <script type="text/ecmascript-6">
        export default{
            data(){
                return {
                }
            },
            components:{
            },
            mounted(){
            }
        }
    </script>
    <!--
        这里很重要
        type="text/scss" 兼容 2017 版本
        rel="stylesheet/scss"  兼容 2016版本
        lang="scss" 兼容 vscode
        在打包编译的时候需要注意
        vue: {
            loaders: {
                scss: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!sass-loader!postcss-loader'),
                sass: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!sass-loader!postcss-loader'),
                css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!sass-loader!postcss-loader')
            }
        }
     -->
    <style scoped type="text/scss" lang="scss" rel="stylesheet/scss"></style>

11、项目编码设置：Editor -> File Encodings -> 全部设置为 UTF-8
12、设置 Live Templates
    Editor -> Live Templates -> JavaScript 添加一个 Live Template
    Abbreviation:rcc、Description: create react class component
    Template text 是：
    import React,{ Component } from 'react';

    class $VAR$ extends Component{

        render(){

            return (

                <div>

                    $VAR$

                </div>

            )

        }

    }

    export default $VAR$

    点击 No applicable contexts yet. Define. 选择 JavaScript
13. nginx 配置
    Mac brew search nginx、brew install nginx
    安装完以后，可以在终端输出的信息里看到一些配置路径：
    /usr/local/etc/nginx/nginx.conf （配置文件路径），注意 windows 拷贝过来的空格和linux中的空格不同
    在 conf 中第一行写入 user root owner;
    listen       8091;
    location / {
        #root html;
        root    /users/zhjb/Desktop/code/h5-cmb/dist;
        index  index.html index.htm;
        autoindex   on;
    }

    location /api {
        rewrite ^/api/(.*) / break;
        proxy_pass  http://172.30.11.10;
    }

    配置好后，启动相关服务 sudo nginx
    重载配置文件：sudo nginx -s reload
    停止 nginx 服务器：sudo nginx -s stop

### nginx 配置 <br>
> 1. mac 安装 nginx，`Mac brew search nginx、brew install nginx`，安装完以后，可以在终端输出的信息里看到一些配置路径：`/usr/local/etc/nginx/nginx.conf`（配置文件路径），注意 windows 拷贝过来的空格和linux中的空格不同 <br>
> > * mac 下，在 conf 中第一行写入 user root owner; 才可以使用 <br>
> > * 配置好后，启动相关服务 sudo nginx <br>
> > * 重载配置文件：sudo nginx -s reload <br>
> > * 停止 nginx 服务器：sudo nginx -s stop <br>
```
 listen       8091;
    location / {
        #root html;
        root    /users/zhjb/Desktop/code/h5-cmb/dist;
        index  index.html index.htm;
        autoindex   on;
    }

    location /api {
        rewrite ^/api/(.*) / break;
        proxy_pass  http://172.30.11.10;
    }
```



### Tips <br>
> 1. 在 wiondws 系统下删除 node_modules <br>
> > * `npm install rimraf -g` <br>
> > * 进入要删除的项目目录，执行 `rimraf node_modules` <br>
> 2. 安装 npm-check npm 模块升级工具 `npm install -g npm-check` <br>
> > * [参考网址](http://www.tuicool.com/articles/YrUnMrv) <br>
> > * npm模块升级工具npm-check，提供命令行下的图形界面，可以手动选择升级哪些模块。 <br>
> > * 命令选项介绍 <br>
```
Usage
  npm-check <path> <options>

Path
  Where to check. Defaults to current directory. Use -g for checking global modules.

Options
  -u, --update          Interactive update.
  -g, --global          Look at global modules.
  -s, --skip-unused     Skip check for unused packages.
  -p, --production      Skip devDependencies.
  -E, --save-exact      Save exact version (x.y.z) instead of caret (^x.y.z) in package.json.
  --no-color            Force or disable color output.
  --no-emoji            Remove emoji support. No emoji in default in CI environments.
  --debug               Debug output. Throw in a gist when creating issues on github.

Examples
  $ npm-check           # See what can be updated, what isn't being used.
  $ npm-check ../foo    # Check another path.
  $ npm-check -gu       # Update globally installed modules by picking which ones to upgrade. 
```
> 3. npm list -g --depth=0 查看 npm 全局安装列表


### vscode 使用技巧 <br>
> 1. vscode 快捷键 [参考网址](http://www.cnblogs.com/bindong/p/6045957.html) <br>
> > * 侧边栏显/隐：wiindows 下 Ctrl+B / mac 下 ⌘ + B <br>
> > * 多行编辑(列编辑)：windows 下 Alt+Shift+鼠标左键，Ctrl+Alt+Down/Up / mac 下 ⇧（shift）+ ⌥（option）+ 鼠标左键 <br>
> > * 打开侧边预览：windows 下 Ctrl + K V / mac 下 ⌘ + K V <br>
> > * 打开终端 ⌃（control）+ `
> > * ⌥（option） + ⇧（shift）+ F 格式化代码 (beautify)
> 2. vscode git 使用 <br>
> > * 配置 git，设置全局配置 <br>
```
git config --global user.name "icemanZB"
git config --global user.email "254784109@qq.com"
查看全局的邮箱或名字：git config --global user.email
```
> > * 之后就可以正常操作了，提交到暂存区，把暂存区放到版本库，添加注释，最后推送即可 <br>
> 4. 使用 eslint [参考网址](https://segmentfault.com/a/1190000009077086) <br>
> > * `npm install -g eslint` 全局安装 eslint 和 `npm install -g eslint-plugin-html` 支持类 html 文件（如 vue）的内联脚本检测，还需要安装 eslint-plugin-html 插件 <br>
> > * mac 中使用快捷方式 `⇧⌘P` 输入 `eslint` 即可创建 .eslintrc.json 配置文件 <br>
> > * 在 首选项中进行一些配置 <br>
```
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    "vue"
],
"eslint.options": {
    "plugins": ["html"]
}

 // 配置说明
 "no-alert": 0,//禁止使用alert confirm prompt
 "no-array-constructor": 2,//禁止使用数组构造器
 "no-bitwise": 0,//禁止使用按位运算符
 "no-caller": 1,//禁止使用arguments.caller或arguments.callee
 "no-catch-shadow": 2,//禁止catch子句参数与外部作用域变量同名
 "no-class-assign": 2,//禁止给类赋值
 "no-cond-assign": 2,//禁止在条件表达式中使用赋值语句
 "no-console": 2,//禁止使用console
 "no-const-assign": 2,//禁止修改const声明的变量
 "no-constant-condition": 2,//禁止在条件中使用常量表达式 if(true) if(1)
 "no-continue": 0,//禁止使用continue
 "no-control-regex": 2,//禁止在正则表达式中使用控制字符
 "no-debugger": 2,//禁止使用debugger
 "no-delete-var": 2,//不能对var声明的变量使用delete操作符
 "no-div-regex": 1,//不能使用看起来像除法的正则表达式/=foo/
 "no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
 "no-dupe-args": 2,//函数参数不能重复
 "no-duplicate-case": 2,//switch中的case标签不能重复
 "no-else-return": 2,//如果if语句里面有return,后面不能跟else语句
 "no-empty": 2,//块语句中的内容不能为空
 "no-empty-character-class": 2,//正则表达式中的[]内容不能为空
 "no-empty-label": 2,//禁止使用空label
 "no-eq-null": 2,//禁止对null使用==或!=运算符
 "no-eval": 1,//禁止使用eval
 "no-ex-assign": 2,//禁止给catch语句中的异常参数赋值
 "no-extend-native": 2,//禁止扩展native对象
 "no-extra-bind": 2,//禁止不必要的函数绑定
 "no-extra-boolean-cast": 2,//禁止不必要的bool转换
 "no-extra-parens": 2,//禁止非必要的括号
 "no-extra-semi": 2,//禁止多余的冒号
 "no-fallthrough": 1,//禁止switch穿透
 "no-floating-decimal": 2,//禁止省略浮点数中的0 .5 3.
 "no-func-assign": 2,//禁止重复的函数声明
 "no-implicit-coercion": 1,//禁止隐式转换
 "no-implied-eval": 2,//禁止使用隐式eval
 "no-inline-comments": 0,//禁止行内备注
 "no-inner-declarations": [2, "functions"],//禁止在块语句中使用声明（变量或函数）
 "no-invalid-regexp": 2,//禁止无效的正则表达式
 "no-invalid-this": 2,//禁止无效的this，只能用在构造器，类，对象字面量
 "no-irregular-whitespace": 2,//不能有不规则的空格
 "no-iterator": 2,//禁止使用__iterator__ 属性
 "no-label-var": 2,//label名不能与var声明的变量名相同
 "no-labels": 2,//禁止标签声明
 "no-lone-blocks": 2,//禁止不必要的嵌套块
 "no-lonely-if": 2,//禁止else语句内只有if语句
 "no-loop-func": 1,//禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）
 "no-mixed-requires": [0, false],//声明时不能混用声明类型
 "no-mixed-spaces-and-tabs": [2, false],//禁止混用tab和空格
 "linebreak-style": [0, "windows"],//换行风格
 "no-multi-spaces": 1,//不能用多余的空格
 "no-multi-str": 2,//字符串不能用\换行
 "no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
 "no-native-reassign": 2,//不能重写native对象
 "no-negated-in-lhs": 2,//in 操作符的左边不能有!
 "no-nested-ternary": 0,//禁止使用嵌套的三目运算
 "no-new": 1,//禁止在使用new构造一个实例后不赋值
 "no-new-func": 1,//禁止使用new Function
 "no-new-object": 2,//禁止使用new Object()
 "no-new-require": 2,//禁止使用new require
 "no-new-wrappers": 2,//禁止使用new创建包装实例，new String new Boolean new Number
 "no-obj-calls": 2,//不能调用内置的全局对象，比如Math() JSON()
 "no-octal": 2,//禁止使用八进制数字
 "no-octal-escape": 2,//禁止使用八进制转义序列
 "no-param-reassign": 2,//禁止给参数重新赋值
 "no-path-concat": 0,//node中不能使用__dirname或__filename做路径拼接
 "no-plusplus": 0,//禁止使用++，--
 "no-process-env": 0,//禁止使用process.env
 "no-process-exit": 0,//禁止使用process.exit()
 "no-proto": 2,//禁止使用__proto__属性
 "no-redeclare": 2,//禁止重复声明变量
 "no-regex-spaces": 2,//禁止在正则表达式字面量中使用多个空格 /foo bar/
 "no-restricted-modules": 0,//如果禁用了指定模块，使用就会报错
 "no-return-assign": 1,//return 语句中不能有赋值表达式
 "no-script-url": 0,//禁止使用javascript:void(0)
 "no-self-compare": 2,//不能比较自身
 "no-sequences": 0,//禁止使用逗号运算符
 "no-shadow": 2,//外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
 "no-shadow-restricted-names": 2,//严格模式中规定的限制标识符不能作为声明时的变量名使用
 "no-spaced-func": 2,//函数调用时 函数名与()之间不能有空格
 "no-sparse-arrays": 2,//禁止稀疏数组， [1,,2]
 "no-sync": 0,//nodejs 禁止同步方法
 "no-ternary": 0,//禁止使用三目运算符
 "no-trailing-spaces": 1,//一行结束后面不要有空格
 "no-this-before-super": 0,//在调用super()之前不能使用this或super
 "no-throw-literal": 2,//禁止抛出字面量错误 throw "error";
 "no-undef": 1,//不能有未定义的变量
 "no-undef-init": 2,//变量初始化时不能直接给它赋值为undefined
 "no-undefined": 2,//不能使用undefined
 "no-unexpected-multiline": 2,//避免多行表达式
 "no-underscore-dangle": 1,//标识符不能以_开头或结尾
 "no-unneeded-ternary": 2,//禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
 "no-unreachable": 2,//不能有无法执行的代码
 "no-unused-expressions": 2,//禁止无用的表达式
 "no-unused-vars": [2, {"vars": "all", "args": "after-used"}],//不能有声明后未被使用的变量或参数
 "no-use-before-define": 2,//未定义前不能使用
 "no-useless-call": 2,//禁止不必要的call和apply
 "no-void": 2,//禁用void操作符
 "no-var": 0,//禁用var，用let和const代替
 "no-warning-comments": [1, { "terms": ["todo", "fixme", "xxx"], "location": "start" }],//不能有警告备注
 "no-with": 2,//禁用with
 "array-bracket-spacing": [2, "never"],//是否允许非空数组里面有多余的空格
 "arrow-parens": 0,//箭头函数用小括号括起来
 "arrow-spacing": 0,//=>的前/后括号
 "accessor-pairs": 0,//在对象中使用getter/setter
 "block-scoped-var": 0,//块语句中使用var
 "brace-style": [1, "1tbs"],//大括号风格
 "callback-return": 1,//避免多次调用回调什么的
 "camelcase": 2,//强制驼峰法命名
 "comma-dangle": [2, "never"],//对象字面量项尾不能有逗号
 "comma-spacing": 0,//逗号前后的空格
 "comma-style": [2, "last"],//逗号风格，换行时在行首还是行尾
 "complexity": [0, 11],//循环复杂度
 "computed-property-spacing": [0, "never"],//是否允许计算后的键名什么的
 "consistent-return": 0,//return 后面是否允许省略
 "consistent-this": [2, "that"],//this别名
 "constructor-super": 0,//非派生类不能调用super，派生类必须调用super
 "curly": [2, "all"],//必须使用 if(){} 中的{}
 "default-case": 2,//switch语句最后必须有default
 "dot-location": 0,//对象访问符的位置，换行的时候在行首还是行尾
 "dot-notation": [0, { "allowKeywords": true }],//避免不必要的方括号
 "eol-last": 0,//文件以单一的换行符结束
 "eqeqeq": 2,//必须使用全等
 "func-names": 0,//函数表达式必须有名字
 "func-style": [0, "declaration"],//函数风格，规定只能使用函数声明/函数表达式
 "generator-star-spacing": 0,//生成器函数*的前后空格
 "guard-for-in": 0,//for in循环要用if语句过滤
 "handle-callback-err": 0,//nodejs 处理错误
 "id-length": 0,//变量名长度
 "indent": [2, 4],//缩进风格
 "init-declarations": 0,//声明时必须赋初值
 "key-spacing": [0, { "beforeColon": false, "afterColon": true }],//对象字面量中冒号的前后空格
 "lines-around-comment": 0,//行前/行后备注
 "max-depth": [0, 4],//嵌套块深度
 "max-len": [0, 80, 4],//字符串最大长度
 "max-nested-callbacks": [0, 2],//回调嵌套深度
 "max-params": [0, 3],//函数最多只能有3个参数
 "max-statements": [0, 10],//函数内最多有几个声明
 "new-cap": 2,//函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
 "new-parens": 2,//new时必须加小括号
 "newline-after-var": 2,//变量声明后是否需要空一行
 "object-curly-spacing": [0, "never"],//大括号内是否允许不必要的空格
 "object-shorthand": 0,//强制对象字面量缩写语法
 "one-var": 1,//连续声明
 "operator-assignment": [0, "always"],//赋值运算符 += -=什么的
 "operator-linebreak": [2, "after"],//换行时运算符在行尾还是行首
 "padded-blocks": 0,//块语句内行首行尾是否要空行
 "prefer-const": 0,//首选const
 "prefer-spread": 0,//首选展开运算
 "prefer-reflect": 0,//首选Reflect的方法
 "quotes": [1, "single"],//引号类型 `` "" ''
 "quote-props":[2, "always"],//对象字面量中的属性名是否强制双引号
 "radix": 2,//parseInt必须指定第二个参数
 "id-match": 0,//命名检测
 "require-yield": 0,//生成器函数必须有yield
 "semi": [2, "always"],//语句强制分号结尾
 "semi-spacing": [0, {"before": false, "after": true}],//分号前后空格
 "sort-vars": 0,//变量声明时排序
 "space-after-keywords": [0, "always"],//关键字后面是否要空一格
 "space-before-blocks": [0, "always"],//不以新行开始的块{前面要不要有空格
 "space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
 "space-in-parens": [0, "never"],//小括号里面要不要有空格
 "space-infix-ops": 0,//中缀操作符周围要不要有空格
 "space-return-throw-case": 2,//return throw case后面要不要加空格
 "space-unary-ops": [0, { "words": true, "nonwords": false }],//一元运算符的前/后要不要加空格
 "spaced-comment": 0,//注释风格要不要有空格什么的
 "strict": 2,//使用严格模式
 "use-isnan": 2,//禁止比较时使用NaN，只能用isNaN()
 "valid-jsdoc": 0,//jsdoc规则
 "valid-typeof": 2,//必须使用合法的typeof的值
 "vars-on-top": 2,//var必须放在作用域顶部
 "wrap-iife": [2, "inside"],//立即执行函数表达式的小括号风格
 "wrap-regex": 0,//正则表达式字面量用小括号包起来
 "yoda": [2, "never"]//禁止尤达条件
```

// webpack 支持各种模块化，require 是 commonjs
webpack 中 require 和 export

function world(){ return {} };

node.js的模块系统，就是参照CommonJS规范实现的。在CommonJS中，有一个全局性方法require()，用于加载模块。
浏览器不兼容CommonJS的根本原因，在于缺少四个Node.js环境的变量。module、exports、require、global

require('./world.js');
require('style-loader!css-loader!./style.css');

// 摸你 commonjs
var module = {
  exports: {}
};

(function(module, exports) {
  exports.multiply = function (n) { return n * 1000 };
}(module, module.exports))

var f = module.exports.multiply;
f(5) // 5000 


package.json 如何正确安装指定的版本  ^与当前版本兼容


webpack hello.js hello.bundle.js --moudle-bind 'css=style-loader!css-loader' --progress

官方的增强插件html-webpack-inline-source-plugin，来完成内联自动化生成，非常简单方便

webpack 2.x版本中include值如果是字符串的话用相对路径'./src'会报错，必须用path.resolve(__dirname, 'src')。但我们可以用正则：/\.src\//这样就能提升一半速度了？？？

我本来写的相对路径 './src' 速度447ms，换成path.resolve(__dirname,'src') 速度暴涨到1220ms？？？