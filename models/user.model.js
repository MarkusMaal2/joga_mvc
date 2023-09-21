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

User.getUser = (username, password, req, result) => {
    let sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`
    con.query(sql, (err, res) => {
        console.log(res);
        console.log(sql);
        if(err){
            console.log(err)
            result(err, null)
        } else if (Object.keys(res).length <= 0) {
            console.log("wrong credentials")
            result(err, null);
        } else {
            req.session.user = {
                firstname: res[0].firstname, // get MySQL row data
                lastname: res[0].lastname, // get MySQL row dataa
                username: username,
                password: password
            }
            result(null, null)
        }
    })
}

module.exports = User