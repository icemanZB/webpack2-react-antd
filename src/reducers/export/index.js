import { UPDATE_EXPORT_TIME } from '../../constants/index';

let initState = {
	exportQtyLimit : 1000, // 导出数量限制
	exportTimeLimit: 10000, // 导出频率限制(毫秒)
	lastExportTime : 0 // 最近一次导出时间(毫秒)
};

export const exportReducer = (state = initState, action) => {
	switch (action.type) {
		case UPDATE_EXPORT_TIME:
			return Object.assign({}, state, {
				lastExportTime: action.time
			});
		default:
			return state;
	}
};
