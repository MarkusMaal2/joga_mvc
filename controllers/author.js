const Author = require('../models/author.model')
const getAuthorArticles = (req, res) => {
    let author_name = ''
    Author.getName(req.params.author_id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error occurred retrieving author data"
            })
        } else {
            author_name = data.name
        }
    })
    Author.getArticles(req.params.author_id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error occurred retrieving author articles"
            })
        } else {
            res.render('author', {
                articles: data,
                author: author_name
            })
        }
    })
}

module.exports = {
    getAuthorArticles
}