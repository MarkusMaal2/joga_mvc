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

module.exports = Article