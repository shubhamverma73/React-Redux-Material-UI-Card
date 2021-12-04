export const getDataFromAPI = () => {
	return async (dispatch) => {
		try {
			let result = await fetch(`https://api.spacexdata.com/v3/launches`, {
				method: "GET",
				headers: {'Content-Type' : 'application/json'},
			});
			result = await result.json();
			dispatch({ type: 'GET_ROCKET_DATA', id: result });
		} catch (error) {
			dispatch({ type: 'ERROR', error: error });
		}
	};
};

export const searechDataFromAPI = (data) => {
	return async (dispatch) => {
		try {
			let searchData = data.keyword;
			let result = await fetch(`https://api.spacexdata.com/v3/launches?rocket_name=${searchData}`, {
				method: "GET",
				headers: {'Content-Type' : 'application/json'},
			});
			result = await result.json();
			dispatch({ type: 'SEARCH_ROCKET_DATA', result: result });
		} catch (error) {
			dispatch({ type: 'ERROR', error: error });
		}
	};
};