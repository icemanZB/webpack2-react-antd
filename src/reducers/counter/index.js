import { INCREMENT } from '../../constants/index';

export const counterReducer = (state = 0, action) => {
	let { type } = action;

	switch (type) {
		case 'INCREMENT':
			return ++state;
		default:
			return state;
	}
};