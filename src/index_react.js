import React, { Component } from 'react';
import { render } from 'react-dom';

class MyComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			msg  : 'hello world',
			value: ''
		};
	}

	handleClick() {
		console.log(this);
	}

	handleChange = (ev) => {
		// 表单的问题：value/checked 一旦赋值就不可修改，因为是 this.props 限制，导致渲染出来的 input 是只读的
		// 1.用 value，改成 defaultValue    2.用 checked，改成 defaultChecked
		console.log(this);
		console.log(ev.target.value);
		this.setState({
			value: ev.target.value
		})
	};

	render() {

		let { msg, value } = this.state;

		return (
			<div>
				<h3 onClick={this.handleClick.bind(this)}>{ msg }{value}</h3>
				<input type="text" defaultValue="2" onChange={this.handleChange}/>
			</div>

		);
	}

}


render(
	<MyComponent/>,
	document.getElementById('root')
);
