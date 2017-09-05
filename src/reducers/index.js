import { combineReducers } from 'redux';

import { exportReducer } from './export/index';
import { counterReducer } from './counter/index'


const rootReducer = combineReducers({
	export : exportReducer,
	counter: counterReducer
});


export default rootReducer;