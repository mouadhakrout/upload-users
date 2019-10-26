const User = require('../models/user.model.js');
const passport = require('passport');
const multer = require('multer')
const fs = require('fs')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
    }
})
exports.authentificate = async (req, res, next) => {
    const { body: { user } } = req;

    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if(err) {
            return next(err);
        }

        if(passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({user, token:user.token});
        }

        return res.status(500).send({
            message: "Error retrieving user with email " + user.email
        });
    })(req, res, next);
}
const upload = multer({ storage: storage }).array('user', 100)
// Create and Save  new Users
exports.createUsers = async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        let files = req.files
        let users = []
        for await (const file of files) {
            const newUser = await JSON.parse(fs.readFileSync(file.path, "utf-8"));
            users.push(newUser)
        }
        flatDeep = (arr) => {
            return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val) : val), []);
        }
        User.create(flatDeep(users))
            .then(data => {
                res.send(data);
            }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating users."
            });
        });

    })
};

// Create and Save a new User
exports.create = (req, res) => {
    // Create a User
    const user = new User(req.body);
    // Save User in the database
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single User with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, req.body, {new: true})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({message: "User deleted successfully!"});
        }).catch(err => {
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};
