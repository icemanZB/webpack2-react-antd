import { UPDATE_EXPORT_TIME } from '../constants/index';

export const updateExportTime = (time = new Date().valueOf()) => {
	return {
		type: UPDATE_EXPORT_TIME,
		time
	}
};
