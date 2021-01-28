import axios from 'axios';
import jwt_decode from "jwt-decode";

import * as actionTypes from './actionTypes';
import setJWTToken from "../../securityUtils/setJWTToken";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {fetchUsersFailed, storeUsers} from "./user";
toast.configure()

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const reset = () => {
    return {
        type: actionTypes.RESET
    }
}

export const registerSuccess = () => {
    return {
        type: actionTypes.REGISTER_SUCCESS
    };
};

export const authSuccess = (decoded) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        user: decoded
    };
};

export const firstSetRole = (decoded) => {
    return {
        type: actionTypes.FIRST_SET_ROLE,
        currentRole: decoded.roles[0]
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    console.log("check timeout")
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};



export const register = (login, email, password, firstName, lastName, phoneNumber, locale) => {
    return dispatch => {
        dispatch(authStart());
        const registerData = {
            email:email,
            login:login,
            password:password,
            confirmPassword:password,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber

        }

        axios.post("/api/users/register", registerData, {headers: {
                'Accept-Language': locale
            }})
            .then(response => {
                console.log('Response ' + JSON.stringify(response.headers));
                dispatch(registerSuccess())
                toast.success('Successful registration', {position: toast.POSITION.BOTTOM_RIGHT})
            })
            .catch(err => {
                console.log('Error ' + JSON.stringify(err.response))
                dispatch(authFail(err.response.data));
                toast.error(err.response.data.username, {position: toast.POSITION.BOTTOM_RIGHT})
            });
    }
}

export const login = (login, password) => {
    return dispatch => {
        dispatch(authStart());
        const loginData = {
            login: login,
            password: password
        }
        axios.post("https://pomocnik2021react.herokuapp.com/api/users/login", loginData)
            .then(response => {
                console.log('Response ' + JSON.stringify(response));
                const {token} = response.data;
                console.log(token);
                localStorage.setItem("jwtToken", token);
                setJWTToken(token);
                const decoded = jwt_decode(token);
                console.log('Decode moj ' + decoded)
                dispatch(authSuccess(decoded));
                dispatch(firstSetRole(decoded))
                toast.success('Successful login', {position: toast.POSITION.BOTTOM_RIGHT})
            })
            .catch(err => {
                console.log('Error ' + JSON.stringify(err.response))
                dispatch(authFail(err.response.data));
                toast.error('Login error', {position: toast.POSITION.BOTTOM_RIGHT})
            });
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.jwtToken;
        console.log('Token, metoda authCheckState: '+ token)
        if (!token) {
            console.log('Logout w metodzie authCheckState')
            dispatch(logout());
        }
        else {
            const decoded_jwtToken = jwt_decode(token);
            const currentTime = Date.now() / 1000;
            console.log("Current time: "+currentTime)
            console.log("Exp time: " + decoded_jwtToken.exp)
            const seniorId = decoded_jwtToken.id
            dispatch(loadPoints(seniorId));
            if (decoded_jwtToken.exp < currentTime) {
                dispatch(logout());
                window.location.href = "/";
            } else {
                setJWTToken(token);
                dispatch(authSuccess(decoded_jwtToken));
            }
        }
    };
};


export const setAccessLevel = (role) => {
    return {
        type: actionTypes.SET_ACCESS_LEVEL,
        currentRole: role
    };
}


export const loadPoints = (id) => {
    return dispatch => {
        axios.get( `/api/users/getSeniorPoints/${id}` )
            .then( response => {
                console.log('ResponseLoadPoints ' + JSON.stringify(response.data));
                dispatch(storePoints(response.data.points));
                // toast.success('Your points has been updated', {position: toast.POSITION.BOTTOM_RIGHT})

            } )
            .catch( err => {
                console.log('Blad ' + JSON.stringify(err))
                // toast.error('Blad w pobiorze punktow', {position: toast.POSITION.BOTTOM_RIGHT})
            } );

    };
}

export const storePoints = ( points ) => {
    return {
        type: actionTypes.STORE_POINTS,
        points: points
    };
};

