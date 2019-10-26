import createReducer from '../utils/createReducer'
import {RECEIVE_USERS} from '../actions/actionsTypes';
const initialState = null
export default createReducer(initialState, {
    [RECEIVE_USERS] (state, action) {
        return action.users
    }
})
