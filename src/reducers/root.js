import types from '../actions/types';

const initialState = {
	users   : [],
	loading : false,
	error   : false,
};

export default function( state = initialState, action ){
	
	switch ( action.type ) {
		
		case types.INIT_SEARCH:
			return {
				...state,
				loading : true
			};
		
		case types.CLEAR_SEARCH:
			return {
				...state,
				users : []
			};
		
		case types.FETCH_USERS:
			return {
				...state,
				users   : action.payload,
				loading : false
			};
		
		case types.CLEAR_ERROR:
			return {
				...state,
				error : false
			};
		
		case types.SHOW_ERROR:
			return {
				...state,
				error : action.payload,
			};
		
		default:
			return state;
		
	}
	
}