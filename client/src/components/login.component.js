import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import * as usersActions from '../actions/users.action';
import Loader from 'react-loader-spinner'

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [submitted,setSubmitted] = useState(false);
    const state = useSelector(state => state);
    const { loggingIn } = state.authentication;
    const dispatch = useDispatch();
    const handleChange = (e) =>{
        const { name, value } = e.target;
         name ==='password'? setPassword(value):   setEmail(value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
       setSubmitted(true);
        if (email && password) {
            dispatch(usersActions.login(email,password))
        }
    };
    if (loggingIn) {
        return <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
        />
    }else {
        return (
            <div className="container">
                <h2>Login</h2>
                <form name="form" onSubmit={handleSubmit}>
                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                        <label htmlFor="username">Email</label>
                        <input type="text" className="form-control" name="username" value={email}
                               onChange={handleChange}/>
                        {submitted && !email &&
                        <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password}
                               onChange={handleChange}/>
                        {submitted && !password &&
                        <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        );
    }
};
export default Login;
