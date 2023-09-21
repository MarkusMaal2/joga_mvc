const con = require("../utils/db");
const User = require("../models/user.model")

const showRegisterForm = (req, res) => {
    res.render('register')
}

const showLoginForm = (req, res) => {
    res.render('login')
}

const verifyAndRegister = (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var userName = req.body.userName;
    var password = req.body.password;

    console.log("new user")
    const newUser = {
        firstname: firstName,
        lastname: lastName,
        username: userName,
        password: password
    }
    User.registerUser(newUser, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Error occurred, while creating user"
            })
        } else {
            console.log(data)
            res.redirect('/')
        }
    })
}

module.exports = {
    showRegisterForm,
    showLoginForm,
    verifyAndRegister
}