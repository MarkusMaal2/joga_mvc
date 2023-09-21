const con = require("../utils/db");
const User = require("../models/user.model")

const showRegisterForm = (req, res) => {
    res.render('register')
}

const showLoginForm = (req, res) => {
    res.render('login')
}

const showSessionTest = (req, res) => {
    if (req.session.user) {
        res.render('private', {
            user: req.session.user
        })
    }
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

const verifyAndLogin = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    User.getUser(username, password, req, (err, data) => {
        if (err) {
            res.status(401).send({
                message : err.message || "Login failed, check credentials"
            })
        } else {
            console.log(data);
            console.log(req.session.user)
            res.redirect('/session_test')
        }
    })
}

module.exports = {
    showRegisterForm,
    showLoginForm,
    verifyAndRegister,
    verifyAndLogin,
    showSessionTest
}