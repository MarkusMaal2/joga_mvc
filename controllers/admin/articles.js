const con = require('../../utils/db.js')
const Article = require('../../models/article.model')
const Author = require('../../models/author.model')
// display article creation form (GET)
const showArticleForm = (req, res) => {
    Author.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error occurred retrieving authors"
            })
        } else {
            console.log(data);
            res.render('create', {
                message: "",
                authors: data
            })
        }
    })
}

// show article update form
const updateArticle = (req, res) => {
    if (req.method === "POST") {
        if (req.body.action === "erase") {
            let query = `DELETE FROM article WHERE id = ${req.params.id}`;
            con.query(query, (err, result) => {
                if (err) throw err
                console.log(`Deleted record with id=${req.params.id}`)
                res.redirect("/")
            })
        } else if (req.body.action === "edit") {
            // POST
            let query = `UPDATE article
                         SET name='${req.body.name}',
                             slug='${req.body.slug}',
                             image='${req.body.image}',
                             body='${req.body.body}',
                             author_id=${req.body.author}
                         WHERE id = ${req.params.id}`;
            con.query(query, (err, result) => {
                if (err) throw err
                res.redirect("/")
            })
        }
    } else {
        // GET
        let query2 = `SELECT article.id as 'id', article.name as 'name', article.slug as 'slug', article.image as 'image', article.body as 'body', article.published as 'published' /*, author.name as 'author', author.id as 'author_id' */ FROM article /* INNER JOIN author ON article.author_id = author.id */ WHERE id = '${req.params.id} LIMIT 1'`
        Author.getAll((err, authordata) => {
            con.query(query2, (err, result) => {
                if (err) throw err
                if (result.length === 0) {
                    res.render('edit', {
                        message: "This article does not exist!",
                        article: null,
                        authors: null
                    })
                    return;
                }
                res.render('edit', {
                    message: "",
                    article: result,
                    authors: authordata
                })
            })
        })
    }
}

// export ctrl functions
module.exports = {
    showArticleForm,
    updateArticle
}