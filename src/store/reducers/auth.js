import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    user:null,
    error: null,
    loading: false,
    isRegistered: false,
    authRedirectPath: '/',
    currentRole: null,
    points: 0
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const registerSuccess = ( state, action ) => {
    return updateObject( state, { error: null, isRegistered: true } );
};

const reset = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        isRegistered: false,

    })
}

const authSuccess = (state, action) => {
    return updateObject( state, {
        token: true,
        user: action.user,
        error: null,
        loading: false
     } );
};

const firstSetRole = (state, action) => {
    return updateObject( state, {

        currentRole: action.currentRole
    } );
};

const storePoints = (state, action) => {
    return updateObject( state, {

        points: action.points
    } );
};



const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const setAccessLevel = (state, action) => {
    return updateObject( state, {
        currentRole: action.currentRole,

    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, user: null });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path,
        isRegistered: false,
        loading:false,
        error:null
    })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        case actionTypes.REGISTER_SUCCESS: return registerSuccess(state,action);
        case actionTypes.RESET: return reset(state, action);
        case actionTypes.SET_ACCESS_LEVEL: return setAccessLevel(state,action);
        case actionTypes.FIRST_SET_ROLE: return firstSetRole(state,action);
        case actionTypes.STORE_POINTS: return storePoints(state,action);
        default:
            return state;
    }
};

export default reducer;