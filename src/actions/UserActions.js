import $ from 'jquery';
import { browserHistory } from 'react-router';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SET_USER,
    LOG_OUT
} from '../constants/User';

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
            if (!data) {
                console.error('Looks like there was a problem. Status Code: ' +
                    jqXHR.status);
                return;
            }
            localStorage.setItem('token', data.token);
            browserHistory.push('/about');
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

export function logOut() {
    localStorage.clear();
    return (dispatch) => {
        browserHistory.push('/auth');
        dispatch({
            type: LOG_OUT
        });
    }
}

export function setUser(user) {
    return (dispatch) => {
        dispatch({
            type: SET_USER,
            user
        });
    }
}