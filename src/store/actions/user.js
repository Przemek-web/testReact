import * as actionTypes from './actionTypes';
import axios from 'axios';
import {registerSuccess} from "./auth";


export const initUsers = () => {
    return dispatch => {
        axios.get( '/api/users' )
            .then( response => {
                console.log('Response ' + JSON.stringify(response.data));
                dispatch(storeUsers(response.data));
                //dispatch(registerSuccess())
            } )
            .catch( err => {
                console.log('Blad ' + JSON.stringify(err))
                dispatch(fetchUsersFailed());
            } );

    };
};


export const storeUsers = ( payload ) => {
    return {
        type: actionTypes.SET_USERS,
        payload: payload
    };
};

export const fetchUsersFailed = () => {
    return {
        type: actionTypes.FETCH_USERS_FAILED
    };
};