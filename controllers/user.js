const con = require("../utils/db");
const User = require("../models/user.model")
const bcrypt = require('bcrypt')
const saltrounds = 5;

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
    } else {
        res.redirect("/login")
    }
}

const verifyAndRegister = (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let userName = req.body.userName;
    let password = req.body.password;
    bcrypt.genSalt(saltrounds, (err, salt) => {
        if (err) {
            console.log("salt error: "  + err)
        }
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                console.log("hash error: " + err)
            }
            console.log("hash ok")
            password = hash
            console.log(password)
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
                    res.redirect('/login')
                }
            })
        })
    })
}

const verifyAndLogin = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    User.getUser(username, password, req, (err, data) => {
        if (err) {
            console.log(err)
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

const sessionDestroy = (req, res) => {
    req.session.destroy()
    res.redirect('/login')
}

module.exports = {
    showRegisterForm,
    showLoginForm,
    verifyAndRegister,
    verifyAndLogin,
    showSessionTest,
    sessionDestroy
}