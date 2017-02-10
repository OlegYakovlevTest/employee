import { combineReducers } from 'redux'
import employee from './employee'
import manager from './manager'

export default combineReducers({
    manager,
    employee
})