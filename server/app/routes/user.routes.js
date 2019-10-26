const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;

    if(authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
};

const auth = {
    required: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
    }),
    optional: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
    }),
};
module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    // User authentification
    app.post('/authentificate',auth.optional, users.authentificate)
    // Create new Users
    app.post('/users',users.createUsers);

    // Create a new User
    app.post('/user', auth.required, users.create);

    // Retrieve all Users
    app.get('/users', users.findAll);

    // Retrieve a single User with userId
    app.get('/users/:userId', auth.required, users.findOne);

    // Update a User with userId
    app.put('/users/:userId', auth.required, users.update);

    // Delete a User with userId
    app.delete('/users/:userId', auth.required, users.delete);
}
