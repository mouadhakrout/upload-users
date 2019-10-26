const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
let UserSchema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    name: {type: String, required: true},
    email:{type: String, required: true,  unique: true},
    age: {type: String, required: true},
    gender: {type: String, required: true},
    company: {type: String, required: true},
    address: {type: String, required: true},
    about: {type: String, required: true},
    balance: {type: String, required: true},
    isActive: {type: Boolean, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    registered:{ type: String, required: true },
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
    tags: {type: Array.of(String), required: true},
    friends: {type: Array, required: true},
    data: {type:String, required: true},
    hash: '',
    salt: '',
});
// hash user password before saving into database
UserSchema.pre('save', function(next){
    const self = this;
    mongoose.model('User', UserSchema).find({email : self.email}, function (err, docs) {
        if (!docs.length){
            bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                if (err) console.log(err);
                // hash the password using our new salt
                bcrypt.hash(self.password, salt, function (err, hash) {
                    if (err) console.log(err);
                    self.password = hash;
                    next();
                });
            });
            next();
        }else{
            console.log('user exists: ',self.name);
            next(new Error("User exists!"));
        }
    });
});

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

UserSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};
// Export the model
module.exports = mongoose.model('User', UserSchema);
