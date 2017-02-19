import $ from 'jquery';
// import request from 'superagent';
var moment = require('moment');

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


// export const saveEmployee = (employee, photo) => dispatch => {
//     console.log(employee);
//
//     dispatch({
//         type: SAVE_EMPLOYEE_REQUEST
//     });
//
//     return new Promise((resolve, reject) => request.post(`/employee/save`)
//         .send(employee)
//         .end((err, data) => {
//             if (err) {
//                 err = err.message ? err.message : null;
//
//                 dispatch({
//                     type: SAVE_EMPLOYEE_FAIL
//                 });
//
//                 reject(err);
//             } else {
//                 console.log('-------data-----', data)
//                 dispatch({
//                     type: SAVE_EMPLOYEE_SUCCESS,
//                     data: {
//                         ...data.employee,
//                         firstDay: new moment(data.employee.firstDay),
//                         skills: data.employee.skills.split(',')
//                     }
//                 });
                // data = JSON.parse(data.text);
                //
                // dispatch({
                //     type: USERPHOTO_EDIT_SUCCESS,
                //     avatar: ( data && data.avatar.url ) || null
                // });
//
//                 resolve(data);
//             }
//         }));
// };

export function saveEmployee(employee, photo) {

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
            console.log('SAVE_EMPLOYEE_SUCCESS', new moment(data.employee.firstDay));
            if (!data) {
                console.error('Looks like there was a problem. Status Code: ' +
                    jqXHR.status);
                return;
            }
            dispatch({
                type: SAVE_EMPLOYEE_SUCCESS,
                data: {
                    ...data.employee,
                    firstDay: new moment(data.employee.firstDay),
                    skills: data.employee.skills.split(',')
                }
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
            console.log('GET_EMPLOYEES_SUCCESS', data);
            if (!data) {
                console.error('Looks like there was a problem. Status Code: ' +
                    jqXHR.status);
                return;
            }
            dispatch({
                type: GET_EMPLOYEES_SUCCESS,
                employees: data.employees.map((employee) => {
                    return {
                        ...employee,
                        firstDay: employee.firstDay ? new moment(employee.firstDay) : null,
                        skills: employee.skills.split(',')
                    };
                })
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