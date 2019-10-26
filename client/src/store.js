import { applyMiddleware, compose, createStore } from 'redux'
import {routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history'
import rootReducer from './rootReducer'
const loggerMiddleware = createLogger();
export const history = createBrowserHistory({
    basename: process.env.NODE_ENV === 'development' ? '/' : process.env.PUBLIC_URL
})

const initialState = {}
const enhancers = []
const middleware = [thunk,loggerMiddleware, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
)

export default createStore(
    rootReducer(history),
    initialState,
    composedEnhancers
)
