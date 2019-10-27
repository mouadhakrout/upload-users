import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import App from './App'
import store, {history} from './store'
import {ConnectedRouter} from "connected-react-router";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
                <App/>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));
