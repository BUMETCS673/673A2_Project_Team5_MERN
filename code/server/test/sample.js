const User = require('../model/users');
const Doc = require('../model/document');
// import { v4 as uuidv4 } from 'uuid'; 
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/teamFive');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));
db.once('open', function () {
    console.log("mongo Connection open!")
});
//Adding dummy users to DB

const seedDB = async () => {
    await User.deleteMany({});
    await Doc.deleteMany({});

    const user = new User({
        user_name: 'test_user',
        user_id: '1234567891',
        })

    await user.save();

            const doc = new Doc({
                title: 'test_doc',
                document_id: '987654321',
                //body: This is for user ${i},
                summary: 'this ius test summary',
                last_modified: Date("2023-11-02T20:25:38.264Z"),
                author: user._id,
                date_modified: Date("2023-11-02T20:25:38.264Z")
            })

    await doc.save();
        
    }


seedDB()
    .then(() => {
        mongoose.connection.close();
    })