const con = require("../utils/db")

const Author = (author) => {
    this.name = author.name
}


Author.getName = (id, result) => {
    let get_author = `SELECT name FROM author WHERE id = ${id}`
    con.query(get_author, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result (err, null)
            return
        }
        if (res.length > 0) {
            result(null, res[0])
        }
    })
}

Author.getArticles = (id, result) => {
    let query = `SELECT article.id as 'id', article.name as 'name', article.slug as 'slug', article.image as 'image', article.body as 'body', article.published as 'published' FROM article INNER JOIN author ON article.author_id = author.id WHERE author_id = ${id};`
    con.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result (err, null)
            return
        }
        if (res.length > 0) {
            result(null, res)
        } else {
            result(null, null)
        }
    })
}

Author.getAll = (result) => {
    let query = 'SELECT id, name FROM author';
    con.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }
        if (res.length > 0) {
            result(null, res)
        }
    })
}

module.exports = Author