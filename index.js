const express = require('express')
const app = express()

const cookieParser = require("cookie-parser");
const sessions = require('express-session');
var parseUrl = require('body-parser');
let encodeUrl = parseUrl.urlencoded({ extended: false });
app.use(sessions({
    secret: "thisismysecrctekey",
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
    resave: false
}));
app.use(cookieParser());

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
const userRoutes = require('./routes/user')

app.use('/', articleRoutes)
app.use('/author', authorRoutes)
app.use('/', userRoutes)


app.listen(3010, () => {
    console.log("Webapp started at http://localhost:3010")
})