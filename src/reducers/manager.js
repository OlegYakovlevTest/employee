import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CREATE_MANAGER_REQUEST,
    CREATE_MANAGER_SUCCESS,
    CREATE_MANAGER_FAIL,
    SET_MANAGER,
    LOGOUT_REQUEST
} from '../constants/Manager';

const initialState = {
    username: null
};

export default function user(state = initialState, action) {

    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, fetching: true };
        case LOGIN_SUCCESS:
            return { ...state, ...action.data.manager, fetching: false };
        case LOGIN_FAIL:
            return { ...state, error: action.error, fetching: false };
        case CREATE_MANAGER_REQUEST:
            return { ...state, fetching: true };
        case CREATE_MANAGER_SUCCESS:
            return { ...state, ...action.data.manager, fetching: false };
        case CREATE_MANAGER_FAIL:
            return { ...state, error: action.error, fetching: false };
        case SET_MANAGER:
            return { ...state, ...action.manager };
        case LOGOUT_REQUEST:
            return { ...state, username: null, fetching: false };

        default:
            return state;
    }
}