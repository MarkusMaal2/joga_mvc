const con = require("../utils/db")

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

module.exports = User