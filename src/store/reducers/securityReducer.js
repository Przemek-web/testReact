import { SET_CURRENT_USER } from "../actions/actionTypes";

const initialState = {
    token: false,
    user: {}
};

const booleanActionPayload = payload => {
    if (payload) {
        return true;
    } else {
        return false;
    }
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                token: booleanActionPayload(action.payload),
                user: action.payload
            };

        default:
            return state;
    }
}