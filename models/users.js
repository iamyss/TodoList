const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const user = new Schema({
    email: {
        type: String,
        unique: ['Email entered in already registered', true]
    },
    firstName: String,
    lastName: String,
    password: String,
});

user.pre('save', function (next) {
    let model = this
    let saltRounds = 5

    if (!model.isModified('password')) return next()

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(model.password, salt, function (err, hash) {
            if (err) return next(err)
            model.password = hash;
            next()
        });
    });
})

const User = mongoose.model("User", user);
module.exports = User