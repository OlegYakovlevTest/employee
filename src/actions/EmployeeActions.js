import $ from 'jquery';

import {
    SAVE_EMPLOYEE_REQUEST,
    SAVE_EMPLOYEE_SUCCESS,
    SAVE_EMPLOYEE_FAIL,
    UPDATE_EMPLOYEE_REQUEST,
    UPDATE_EMPLOYEE_SUCCESS,
    UPDATE_EMPLOYEE_FAIL,
    GET_EMPLOYEES_REQUEST,
    GET_EMPLOYEES_SUCCESS,
    GET_EMPLOYEES_FAIL,
    SET_EMPLOYEE
} from '../constants/Employee';

export function saveEmployee(employee) {

    return (dispatch) => {
        dispatch({
            type: SAVE_EMPLOYEE_REQUEST
        });

        $.ajax({
            method: 'POST',
            url: '/employee/save',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(employee)
        }).done(function (data, textStatus, jqXHR) {
            console.log('SAVE_EMPLOYEE_SUCCESS', data);
            if (!data) {
                console.error('Looks like there was a problem. Status Code: ' +
                    jqXHR.status);
                return;
            }
            dispatch({
                type: SAVE_EMPLOYEE_SUCCESS,
                data: data.employee
            });
        }).fail(function (jqXHR, textStatus) {
            console.error(textStatus);
            dispatch({
                type: SAVE_EMPLOYEE_FAIL
            });
        });
    }
}

export function updateEmployee(employee) {

    return (dispatch) => {
        dispatch({
            type: UPDATE_EMPLOYEE_REQUEST
        });

        $.ajax({
            method: 'PUT',
            url: '/employee/update',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(employee)
        }).done(function (data, textStatus, jqXHR) {
            console.log('UPDATE_EMPLOYEE_SUCCESS', data);
            if (!data) {
                console.error('Looks like there was a problem. Status Code: ' +
                    jqXHR.status);
                return;
            }
            dispatch({
                type: UPDATE_EMPLOYEE_SUCCESS,
                employee
            });
        }).fail(function (jqXHR, textStatus) {
            console.error(textStatus);
            dispatch({
                type: UPDATE_EMPLOYEE_FAIL
            });
        });
    }
}

export function getEmployees() {

    return (dispatch) => {
        dispatch({
            type: GET_EMPLOYEES_REQUEST
        });

        $.ajax({
            method: 'GET',
            url: '/employee/getall',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).done(function (data, textStatus, jqXHR) {
            if (!data) {
                console.error('Looks like there was a problem. Status Code: ' +
                    jqXHR.status);
                return;
            }
            dispatch({
                type: GET_EMPLOYEES_SUCCESS,
                employees: data.employees
            });
        }).fail(function (jqXHR, textStatus) {
            console.error(textStatus);
            dispatch({
                type: GET_EMPLOYEES_FAIL
            });
        });
    }
}

export function setEmployee(employee) {
    console.log('--setEmployee--employee---', employee);
    return (dispatch) => {
        dispatch({
            type: SET_EMPLOYEE,
            employee
        });
    }
}