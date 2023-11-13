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


const addNewUser = async () => {
    await User.deleteMany({});
    await Doc.deleteMany({});

    const user = new User({
        user_name: `Siyuan`,
        user_id: `112330017898894277040`,
    });
    await user.save();

    for (let j = 0; j < 3; j++) {
        const doc = new Doc({
            title: `doc${j}`,
            document_id: j,
            body: `This is doc ${j} for Siyuan`,
            summary: `This is summary for doc ${j}`,
            last_modified: new Date(),
            author: user._id,
            date_modified: new Date()
        })

        await doc.save();
    }
}


addNewUser()
    .then(() => {
        mongoose.connection.close();
    })