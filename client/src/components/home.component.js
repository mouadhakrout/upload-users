import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Home = () => {
    const state = useSelector(state => state)
    const { currentUser } = state.authentication;
    return (
        <div className="col-md-6 col-md-offset-3">
            <h1>Hi {currentUser.user.email}!</h1>
            <p>Your details:</p>
            <p>
                {currentUser.user.about}
            </p>
                <Link to="/login">Logout</Link>
        </div>
    );
}
export default Home;
