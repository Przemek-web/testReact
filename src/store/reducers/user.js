import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    users: [],
    error: false,
};

const fetchUsersFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_USERS : return updateObject( state, { users: action.payload });
        case actionTypes.FETCH_USERS_FAILED: return fetchUsersFailed(state, action);

    }
    return state;
};

export default reducer;