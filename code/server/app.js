// if (process.env.NODE_ENV !== "production") {
//     require('dotenv').config();
// }
const express = require('express')
const morgan = require('morgan')
//starts express
const app = express();
app.use(morgan('dev'))

//for dev
const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:5173', // This should be the port Vite is using
};
app.use(cors(corsOptions));


//makes it easy to access files
//const path = require('path')

//mongoDB: mongoose helps to connect to MongoDB
const mongoose = require('mongoose')
const dbUrl = 'mongodb://127.0.0.1:27017/teamFive'
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));
db.once('open', function () {
    console.log("mongo Connection open!")
});

//Data Models
const User = require('./model/users')
const Docs = require('./model/document');

//Router Fiele
const testRoute = require('./routes/testRoute')

//Routes
app.use('/', loginRoute)
//app.use('/home', registerRoute)
app.use('/user', userRoute)

app.get('*', (req, res) => {
    res.send('invalid url')
})

app.listen(8000, () => {
    console.log('listening on port 8000')
});







