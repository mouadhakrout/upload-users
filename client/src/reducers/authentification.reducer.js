import { LOGIN_REQUEST , LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/actionsTypes';

let currentUser = JSON.parse(localStorage.getItem('current'));
const initialState = currentUser ? { loggedIn: true, currentUser } : {};

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loggingIn: true,
                currentUser: action.user
            };
        case LOGIN_SUCCESS:
            return {
                loggedIn: true,
                currentUser: action.user
            };
        case LOGIN_FAILURE:
            return {};
        case LOGOUT:
            return {};
        default:
            return state
    }
}
