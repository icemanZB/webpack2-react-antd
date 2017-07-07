# webpack2-react-antd
1. 安装指定版本的 webpack `npm install webpack@2.6.1 --save-dev`
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
3. 安装 react-router3 的版本，由于 4 版本 bug 有点多，暂时不使用 `npm install react-router@3.0.2 --save`