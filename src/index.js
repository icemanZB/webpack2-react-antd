import React, { Component } from 'react';
import { render } from 'react-dom';
import { hashHistory, Router, Route, IndexRoute, Link } from 'react-router';

class App extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return this.props.router.location.action === 'PUSH';
	}

	render() {
		const { children, location } = this.props;
		return (
			<div>
				<ul>
					<li>
						<Link to="/page1">Page 1</Link>
					</li>
					<li>
						<Link to="/page2">Page 2</Link>
					</li>
				</ul>
				{children}
			</div>
		);
	}
}

// const App = ({ children, location }) => (
// 	<div>
// 		<ul>
// 			<li>
// 				<Link to="/page1">Page 1</Link>
// 			</li>
// 			<li>
// 				<Link to="/page2">Page 2</Link>
// 			</li>
// 		</ul>
// 		{children}
// 	</div>
// );

const Index = () => (
	<h1>Index</h1>
);

class Page1 extends Component {
	render() {
		// 在 this.props.location.action 的值，第一次位PUSH,第二次为POP
		// 在点击 Link 时为 PUSH，浏览器前进后退时为 POP，调用 replaceState 方法时为 REPLACE
		console.log(this.props);

		return (
			<h1>Page1</h1>
		);
	}
}


// const Page1 = () => {
// 	// react-router3.x hashHistory render两次的bug,及解决方案
// 	// 会发现render page1 被打印了两次
// 	console.log('render page1');
// 	console.log(this.props);
// 	return (
// 		<h1>Page 1</h1>
// 	);
// };

const Page2 = () => {
	console.log('render page2');
	return (
		<h1>Page 2</h1>
	);
};


render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Index}/>
			<Route path="page1" component={Page1}/>
			<Route path="page2" component={Page2}/>
		</Route>
	</Router>
), document.getElementById('root'));