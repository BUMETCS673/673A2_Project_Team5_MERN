// if (process.env.NODE_ENV !== "production") {
//     require('dotenv').config();
// }
const express = require('express')
//starts express
const app = express();

//makes it easy to access files
// const path = require('path')

//mongoDB: mongoose helps to connect to MongoDB
const mongoose = require('mongoose')
const dbUrl = 'mongodb://127.0.0.1:27017/teamFive'
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));
db.once('open', function () {
    console.log("mongo Connection open!")
});

//Date Models
const User = require('./model/users')
const Docs = require('./model/document');


app.listen(8080, () => {
    console.log('listening on port 8080')
});

app.get(`/`, (req, res) => {
    res.send(`Welcome to the home page!`)
})

app.get('/register', (req, res) => {
    res.send("Register Site");
})

app.get('/login', (req, res) => {
    res.send("Log in page");
})

//Getting all documents that belongs to a user 
app.get('/docs/:userId/:docID', async (req, res) => {
    const user = await User.findById(req.params.userId);

})






