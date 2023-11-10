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

    for (let i = 0; i < 10; i++) {
        const user = new User({
            user_name: `username${i}`,
            user_id: `userid${i}`,
        })
        await user.save();

        for (let j = 0; j < 3; j++) {
            const doc = new Doc({
                title: `doc${j}`,
                document_id: `docid${j}`,
                body: `This is doc ${j} for user ${i}`,
                summary: `This is summary for doc ${j}`,
                last_modified: new Date(),
                author: user._id,
                date_modified: new Date()
            })

            await doc.save();
        }
    }
}


seedDB()
    .then(() => {
        mongoose.connection.close();
    })