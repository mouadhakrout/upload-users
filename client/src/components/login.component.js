import React, {useState } from 'react'
import {useDispatch } from 'react-redux';
import * as usersActions from '../actions/users.action';
const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [submitted,setSubmitted] = useState(false)
    const handleChange = (e) =>{
        const { name, value } = e.target;
         name ==='password'? setPassword(value):   setEmail(value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
       setSubmitted(true)
        if (email && password) {
            dispatch(usersActions.login(email,password))
        }
    }
    const dispatch = useDispatch()
    return (
        <div className="col-md-6 col-md-offset-3">
            <h2>Login</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                    <label htmlFor="username">Email</label>
                    <input type="text" className="form-control" name="username" value={email} onChange={ handleChange} />
                    {submitted && !email &&
                    <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={password} onChange={handleChange} />
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
export default Login;
