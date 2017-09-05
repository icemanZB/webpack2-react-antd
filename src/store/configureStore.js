import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// redux-logger3.0 可以直接这样写
import logger from 'redux-logger';
import rootReducer from '../reducers';


export default function configureStore(preloadedState) {
	// 有的中间件有次序要求，logger 一定要放在最后
	// applyMiddlewares，它是 Redux 的原生方法，作用是将所有中间件组成一个数组，依次执行
	return createStore(
		rootReducer,
		preloadedState,
		applyMiddleware(
			thunkMiddleware,
			logger
		)
	)
};