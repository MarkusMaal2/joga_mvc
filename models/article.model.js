const con = require("../utils/db")

const Article = function (article) {
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

Article.createNew = (newArticle, result) => {
    let query = `INSERT INTO article (name, slug, image, body, published, author_id) VALUES ("${newArticle.name}", "${newArticle.slug}", "${newArticle.image}", "${newArticle.body}", "${newArticle.published}", ${newArticle.author_id})`
    con.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }
        console.log("created article: ", {id: res.insertId, ...newArticle})
        result(null, {id: res.insertId, ...newArticle})
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
            result({message: "Article not found"}, null)
        }
    })
}

Article.getById = (id, result) => {
    let query = `SELECT article.id as 'id', article.name as 'name', article.slug as 'slug', article.image as 'image', article.body as 'body', article.published as 'published', author.name as 'author', author.id as 'author_id' FROM article INNER JOIN author ON article.author_id = author.id WHERE article.id = '${id}'`
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
            result ({message: "Article not found"}, null)
        }
    })
}

module.exports = Article