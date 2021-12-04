const defaultData = () => {
	return [];
}

const getAllData = (state = defaultData(), action) => {
	switch (action.type) {
		case "GET_ROCKET_DATA":
			let data = action.id;
			return data;
		case "SEARCH_ROCKET_DATA":
			let result = action.result;
			return result;
		case "ERROR":
			return [{'response': action.error}];
		default:
			return state;
	}
}

export default getAllData;