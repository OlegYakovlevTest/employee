import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SET_USER,
    LOG_OUT
} from '../constants/User';

const initialState = {
    username: null
};

export default function user(state = initialState, action) {

    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, fetching: true };
        case LOGIN_SUCCESS:
            return { ...state, ...action.data.user, fetching: false };
        case LOGIN_FAIL:
            return { ...state, error: action.error, fetching: false };
        case SET_USER:
            return { ...state, ...action.user };
        case LOG_OUT:
            return { ...state, username: null, fetching: false };

        default:
            return state;
    }
}