const express = require('express')
const app = express()

// add template engine
const path = require('path')
const hbs = require('express-handlebars')

// setup template dir and file exts
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
}))

// setup static public directory
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const articleRoutes = require('./routes/article')
const authorRoutes = require('./routes/author')
const registerRoutes = require('./routes/register')

app.use('/', articleRoutes)
app.use('/author', authorRoutes)
app.use('/', registerRoutes)


app.listen(3010, () => {
    console.log("Webapp started at http://localhost:3010")
})