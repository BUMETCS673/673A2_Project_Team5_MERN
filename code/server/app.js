//starts express
const express = require('express')
const app = express();

//for server status report
//morgan helps dev by auto generating request details,
//response time, status code, route in terminal
const morgan = require('morgan')
app.use(morgan('dev'))

//for data communication between client port and server port
const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:5173', // This should be the port Vite is using
};
app.use(cors(corsOptions));


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

//Router files
const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')

//Routes
app.get(`/`, (req, res) => {
    res.send(`Welcome to the home page!`)
})

app.use('/register', registerRoute)
app.use('/login', loginRoute)

//Getting all documents that belongs to a user 
app.get('/docs/:userId/:docID', async (req, res) => {
    const user = await User.findById(req.params.userId);
})

//catching invalid url
app.get('*', (req, res) => {
    res.send('invalid url')
})

app.listen(8000, () => {
    console.log('listening on port 8000')
});

//post request
// app.post('/register'(req, res)=>{

// })






