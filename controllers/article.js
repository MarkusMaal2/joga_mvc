const Article = require("../models/article.model")
// show all articles (index)
const getAllArticles = (req, res) => {
    Article.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error occurred retrieving article data"
            })
        } else {
            console.log(data);
            res.render('index', { articles: data })
        }
    })
}

// show article by a slug
const getArticleBySlug = (req, res) => {
    let query = `SELECT article.id as 'id', article.name as 'name', article.slug as 'slug', article.image as 'image', article.body as 'body', article.published as 'published', author.name as 'author', author.id as 'author_id' FROM article INNER JOIN author ON article.author_id = author.id WHERE slug = '${req.params.slug}'`
    con.query(query, (err, result) => {
        if (err) throw err
        res.render('article', {
            article: result
        })
    })
}

// export ctrl functions
module.exports = {
    getAllArticles,
    getArticleBySlug
}