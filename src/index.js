import configureStore from './store/configureStore';
import { counter } from './actions/counterActions';

let store = configureStore();

document.onclick = function () {
	store.dispatch(counter());
};

let curt = store.getState();

store.subscribe(() => {

	let pre = curt;
	curt = store.getState();
	console.log(pre, curt, pre === curt);
});
