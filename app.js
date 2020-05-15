const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const methodOverride = require('method-override')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const tasks = require('./routes/tasks')


// Handlebars
app.engine('handlebars', exphbs());
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');


// Method Override middleware
app.use(methodOverride('_method'))

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

// About page
app.get('/about', (req, res) => {
    res.render('about')
})


//Use router
app.use('/tasks', tasks)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`App listen to port ${port}`)
})