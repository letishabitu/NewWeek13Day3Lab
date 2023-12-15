// require dotenv so that I can use the .env fil
require('dotenv').config();
const express = require('express');
// require mongoose so that I can connect to my db
const mongoose = require('mongoose');
const app = express();
// const fruits = require('./models/fruits.js');
// we want to import the fruit model
const Vegitable = require('./models/vegitable');
const jsxViewEngine = require('jsx-view-engine');

// Global configuration
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
})

app.set('view engine', 'jsx');
app.set('views', './views/vegitables');
app.engine('jsx', jsxViewEngine());



// ================ Middleware ================
//
app.use((req, res, next) => {
    console.log('Middleware: I run for all routes');
    next();
})

//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));



app.get('/', (req, res) => {
    res.send('this is my vegitable root route');
});

// I - INDEX - dsiplays a list of all fruits
app.get('/vegitables/', async (req, res) => {
    // res.send(fruits);
    try {
        const foundVegitables = await Vegitable.find({});
        res.status(200).render('Index', {vegitables: foundVegitables});
    } catch (err) {
        res.status(400).send(err);
    }
    
});


// N - NEW - allows a user to input a new fruit
app.get('/vegitables/new', (req, res) => {
    res.render('New');
});


// C - CREATE - update our data store
app.post('/vegitables', async (req, res) => {
    if(req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else {  //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }

    try {
        const createdVegitable = await Vegitable.create(req.body);
        res.status(200).redirect('/vegitables');
    } catch (err) {
        res.status(400).send(err);
    }
    // fruits.push(req.body);
    // console.log(fruits);
    // console.log(req.body)
    // res.send('data received');
    //  *** We will add this back in later
    //  ***
    // res.redirect('/fruits'); // send user back to /fruits
})

// S - SHOW - show route displays details of an individual fruit
app.get('/vegitables/:id', async (req, res) => {
    // res.send(fruits[req.params.indexOfFruitsArray]);
    try {
        const foundVegitable = await Vegitable.findById(req.params.id);
        res.render('Show', {vegitable: foundVegitable});
    } catch (err) {
        res.status(400).send(err);
    }

})

app.listen(3000, () => {
    console.log('listening');
});