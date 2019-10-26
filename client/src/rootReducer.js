import { combineReducers } from 'redux'
import users from './reducers/users.reducer'
import authentication from './reducers/authentification.reducer'
import { connectRouter } from 'connected-react-router'
export default (history) => combineReducers({
    router: connectRouter(history),
    authentication,
    users,
});
