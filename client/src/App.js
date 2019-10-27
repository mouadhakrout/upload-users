import React from 'react'
import {Route, Router, Switch} from 'react-router-dom';
import Home from './components/home.component'
import Login from './components/login.component'
import PrivateRoute from './components/privateRoute.component'
import history from "./utils/history";
import UploadForm from "./components/uploadForm.component";

const App = () => {
    return (
        <Router history={history}>
            <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/upload" component={UploadForm} />
            </Switch>
        </Router>
    )
};

export default App
