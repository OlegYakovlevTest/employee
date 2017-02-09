import { combineReducers } from 'redux'
import employee from './employee'
import user from './user'
import {reducer as modalReducer} from 'react-redux-modal'

export default combineReducers({
    user,
    employee,
    modals: modalReducer
})