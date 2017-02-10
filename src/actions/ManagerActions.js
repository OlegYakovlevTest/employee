import $ from 'jquery';
import { browserHistory } from 'react-router';

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

export function signIn(signInData) {

    return (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST
        });

        $.ajax({
            method: 'POST',
            url: '/signin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(signInData)
        }).done(function (data, textStatus, jqXHR) {
            console.log('LOGIN_SUCCESS', data);
            if (!data) {
                console.error('Looks like there was a problem. Status Code: ' +
                    jqXHR.status);
                return;
            }
            localStorage.setItem('token', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.manager));
            browserHistory.push('/list');
            dispatch({
                type: LOGIN_SUCCESS,
                data
            });
        }).fail(function (jqXHR, textStatus) {
            console.error(textStatus);
            dispatch({
                type: LOGIN_FAIL
            });
        });
    }
}

export function signUp(signUpData) {

    return (dispatch) => {
        dispatch({
            type: CREATE_MANAGER_REQUEST
        });

        $.ajax({
            method: 'POST',
            url: '/signup',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(signUpData)
        }).done(function (data, textStatus, jqXHR) {
            if (!data.manager) {
                console.error('Looks like there was a problem. Status Code: ' +
                    jqXHR.status);
                return;
            }
            localStorage.setItem('token', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.manager));
            browserHistory.push('/list');
            dispatch({
                type: CREATE_MANAGER_SUCCESS,
                data
            });
        }).fail(function (jqXHR, textStatus) {
            console.error(textStatus);
            dispatch({
                type: CREATE_MANAGER_FAIL
            });
        });
    }
}

export function logOut() {
    localStorage.clear();
    return (dispatch) => {
        browserHistory.push('/auth');
        dispatch({
            type: LOGOUT_REQUEST
        });
    }
}

export function setManager(manager) {
    console.log('--setManager--manager---', manager);
    return (dispatch) => {
        dispatch({
            type: SET_MANAGER,
            manager
        });
    }
}