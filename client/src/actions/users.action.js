import httpClient from '../utils/httpClient'
import {AppConfig} from '../config'
import history from "../utils/history";
import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, RECEIVE_USERS} from './actionsTypes';
import {authHeader} from "../utils/authentification.header";

export function receiveUsers(users) {
    return {type: RECEIVE_USERS, users: users};
}
export  function fetchUsers () {
    return async (dispatch) => {
        const [users] = await Promise.all([
            httpClient.get(`${AppConfig.apiUsersUrl}/users`),
        ]);

        dispatch(receiveUsers(users))
    }
}
export function createUsers (files) {
    return async (dispatch) => {
        await httpClient.upload(
            `${AppConfig.apiUsersUrl}/users`,
            files
        );
        dispatch(fetchUsers())
    }
}
export function updateUser (newUser) {
    return async (dispatch) => {
        const [updatedUser] =  await httpClient.put(
            `${AppConfig.apiUsersUrl}/users/${newUser._id}`,
            newUser,
            true,
            authHeader()
        );
        dispatch(login(updatedUser.email,updatedUser.password))
    }
}
export function login(email, password) {
    return async (dispatch) => {
        dispatch(request({ email }));
        await httpClient.post(`${AppConfig.apiUsersUrl}/authentificate`, {user:{email, password}})
             .then(
                user =>  {
                    localStorage.setItem('current', JSON.stringify(user));
                    dispatch(success(user));
                    history.push('/')
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request(user) { return { type: LOGIN_REQUEST, user } }
    function success(user) { return { type: LOGIN_SUCCESS, user } }
    function failure(error) { return { type: LOGIN_FAILURE, error } }
}

export function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('current');
}
