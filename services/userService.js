const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (email, firstName, lastName, password) => {
    try {
        let user = new User({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password
        });
        user = await user.save();
        return user;
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
}

const login = async (email, password) => {
    try {
        let user = await User.findOne({
            email: email
        });
        if (user) {
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (!err) {
                        if (result) {
                            let token = jwt.sign({ user: user }, "1234567890");
                            resolve({ user: user, token: token });
                        } else {
                            reject({
                                message: "Invalid Password!"
                            });
                        }
                    } else {
                        console.log(err);
                        reject(err);
                    }
                });
            });
        } else {
            throw {
                message: "Invalid email!"
            }
        }
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
}

module.exports = {
    createUser, login
}