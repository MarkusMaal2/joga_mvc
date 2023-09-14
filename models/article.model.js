const con = require("../utils/db")

const Article = (article) => {
    this.name = article.name
    this.slug = article.slug
    this.body = article.body
    this.image = article.image
    this.published = article.published
    this.author_id = article.author_id
}

Article.getAll = (result) => {
    let sql = 'SELECT * FROM article'
    let articles = []
    con.query(sql, (err, res) => {
        if (err) {
            console.log("error:" + err)
            result(err, null)
            return
        }
        articles = res
        console.log("articles: ", articles)
        result(null, articles)
    })
}

Article.getBySlug = (slug, result) => {

    let query = `SELECT article.id as 'id', article.name as 'name', article.slug as 'slug', article.image as 'image', article.body as 'body', article.published as 'published', author.name as 'author', author.id as 'author_id' FROM article INNER JOIN author ON article.author_id = author.id WHERE slug = '${slug}'`
    con.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result (err, null)
            return
        }

        if (res.length) {
            console.log("found article: " + res[0])
            result(null, res[0])
        } else {
            result(null, null)
        }
    })
}

Article.getById = (id, result) => {
    let query = `SELECT article.id as 'id', article.name as 'name', article.slug as 'slug', article.image as 'image', article.body as 'body', article.published as 'published', author.name as 'author', author.id as 'author_id' FROM article INNER JOIN author ON article.author_id = author.id WHERE id = '${id}'`
    con.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result (err, null)
            return
        }

        if (res.length) {
            console.log("found article: " + res[0])
            result(null, res[0])
        }
    })
}

module.exports = Article