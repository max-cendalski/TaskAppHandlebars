const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const port = 3000

// Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main'
}));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Connect to mongoose
mongoose.connect('mongodb://localhost/TaskAppHandlebars', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

// Main page

app.get('/', (req, res) => {
    const title = 'Welcome'
    res.render('index', { title })
})

app.listen(port, () => {
    console.log(`App listen to port ${port}`)
})