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

const initialState = {
    employees: [],
    employee: null
};

export default function user(state = initialState, action) {

    switch (action.type) {
        case SAVE_EMPLOYEE_REQUEST:
            return { ...state, fetching: true };
        case SAVE_EMPLOYEE_SUCCESS:
            return { ...state, employees: [...action.employees, action.data], fetching: false };
        case SAVE_EMPLOYEE_FAIL:
            return { ...state, error: action.error, fetching: false };
        case UPDATE_EMPLOYEE_REQUEST:
            return { ...state, fetching: true };
        case UPDATE_EMPLOYEE_SUCCESS:
            return { ...state, employees: [...state.employees.filter(employee => employee._id !== action.employee._id), action.employee], employee: action.employee, fetching: false };
        case UPDATE_EMPLOYEE_FAIL:
            return { ...state, error: action.error, fetching: false };
        case GET_EMPLOYEES_REQUEST:
            return { ...state, fetching: true };
        case GET_EMPLOYEES_SUCCESS:
            return { ...state, employees: [...action.employees], fetching: false };
        case GET_EMPLOYEES_FAIL:
            return { ...state, error: action.error, fetching: false };
        case SET_EMPLOYEE:
            return { ...state, employee: {...action.employee} };

        default:
            return state;
    }
}