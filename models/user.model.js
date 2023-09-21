const con = require("../utils/db")
const bcrypt = require("bcrypt")

const User = function (user)  {
    this.firstname = user.firstname
    this.lastname = user.lastname
    this.username = user.username
    this.password = user.password
    this.reg_date = user.reg_date
}

User.registerUser = (newUser, result) => {
    var sql = `INSERT INTO users (firstname, lastname, username, password) VALUES ('${newUser.firstname}', '${newUser.lastname}', '${newUser.username}', '${newUser.password}')`;
    con.query(sql, (err, res) => {
        if (err){
            console.log("error: ", err)
            result(err, null)
        }else{
            // using userPage function for creating user page
            console.log("created user: ", {id: res.insertId, ...newUser})
            result(null, {id: res.insertId, ...newUser})
        }
    });
}

User.getUser = (username, password, req, result) => {
    let sql = `SELECT * FROM users WHERE username = '${username}'`
    con.query(sql, (err, res) => {
        if(err){
            console.log(err)
            result(err, null)
            return
        } else if (Object.keys(res).length <= 0) {
            console.log("this user does not exist")
            result(err, null)
            return
        }
        let hash = res[0].password
        bcrypt.compare(password, hash, (err2, result2) => {
            if (result2) {
                console.log("Authentication successful!")
                req.session.user = {
                    firstname: res[0].firstname, // get MySQL row data
                    lastname: res[0].lastname, // get MySQL row dataa
                    username: username,
                    hash: res[0].password,
                    reg_date: res[0].reg_date
                }
                result(null, null)
            } else if (err2) {
                console.log("Hashcheck fail: " + err2)
                result(err2, null)
            }
        })
    })
}

module.exports = User