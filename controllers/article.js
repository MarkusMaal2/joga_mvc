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
    Article.getBySlug(req.params.slug, (err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || "Error occured retrieving article data"
            })
        } else {
            console.log(data)
            res.render('article', {article: data})
        }
    })
}

// export ctrl functions
module.exports = {
    getAllArticles,
    getArticleBySlug
}