import types from '../actions/types';
import keys from '../keys';

const github_endpoint = `https://api.github.com/search/users?access_token=${keys.github}`;

export function fetchUsersByQuery( query ){
	
	return dispatch =>{
		
		dispatch(initSearch());
		
		fetch(`${github_endpoint}&q=${query}`).then(res =>{
			
			return res.json();
			
		}).then(res => {
			
			if(res.message){
				throw new Error(`API Error: ${res.message}`); //Try changing the endpoint with a non-valid one.
			}
			
			dispatch({
				type    : types.FETCH_USERS,
				payload : res.items
			});
			
		}).catch(err =>{
			
			dispatch(showError(err.message));
			
		});
		
	};
	
}

export function initSearch(){
	
	return {
		type : types.INIT_SEARCH,
	};
	
}

export function clearSearch(){
	
	return {
		type : types.CLEAR_SEARCH,
	};
	
}

export function clearError(){
	
	return {
		type : types.CLEAR_ERROR,
	};
	
}

export function showError( error ){
	
	return {
		type    : types.SHOW_ERROR,
		payload : error
	};
	
}