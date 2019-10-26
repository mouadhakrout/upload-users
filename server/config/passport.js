const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../app/models/user.model.js');
passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
}, (email, password, done) => {
    User.findOne({ email })
        .then((user) => {
            if(!user) {
                return done(null, false, { errors: { 'email or password': 'is invalid' } });
            }
            return done(null, user);
        }).catch(done);
}));
