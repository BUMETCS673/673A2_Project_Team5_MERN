const User = require('../model/users');
const Document = require('../model/document');
const { v4: uuid } = require('uuid')

module.exports.getUser = async (req, res) => {
    try {
        console.log("hello")
        const userId = req.query.user_id;
        console.log('req.query', req.query)
        //DB.find() return , so we need to use user[0]
        //DB.findOne() return an object, so we can use user
        const user = await User.findOne({ user_id: userId });
        console.log('user', user)
        if (user) {
            console.log("user successfully found");
            console.log(user);
        }
        const docs = await Document.find({ author: user._id });
        if (docs) {
            console.log("docs successfully found");
            console.log(docs)
        }
        res.json({ user, docs });

    } catch (err) {
        console.log(err);
        return res.json({ error: "Error occur! Unable to get user." })
    }
}


module.exports.createDoc = async (req, res) => {

    try {
        console.log('req.body', req.body)
        const docTitle = req.body.title;
        const user = await User.findOne({ user_id: req.body.userId }); // user returned from MongoDB is an array with 1 user
        console.log('user', user)
        const newDoc = await new Document({
            title: docTitle,
            document_id: uuid(),
            content: '',
            summary: '',
            last_modified: new Date(),
            author: user._id,
            date_modified: new Date()
        }).save();

        res.json({ document_id: newDoc.document_id });

    } catch (err) {
        console.log(err);
        return res.json({ error: "Error occur! Unable to create new doc" })
    }
}

module.exports.deleteDoc = async (req, res) => {
    try {
        const docId = req.params.docId;
        const user_id = req.body.sub;
        const user = await User.findOne({ user_id: user_id });
        await Document.deleteOne({ document_id: docId, author: user._id });

        const docs = await Document.find({ author: user._id });
        res.json({ message: "Successfully deleted the doc" });
    } catch (err) {
        console.log(err);
        return res.json({ error: "Error occur! Unable to delete the doc" })
    }
}






// const docs = [
//     {
//         imageSrc: imgSrc,
//         title: 'This is a Doc Title 1',
//         description: 'This is a Doc summary 1',
//         linkURL: 'https://www.google.com/',
//         _id: 1
//     },
//     {
//         imageSrc: imgSrc,
//         title: 'This is a Doc Title 2',
//         description: 'This is a Doc summary 2',
//         linkURL: 'https://www.google.com/',
//         _id: 2
//     },
//     {
//         imageSrc: imgSrc,
//         title: 'This is a Doc Title 3',
//         description: 'This is a Doc summary 3',
//         linkURL: 'https://www.google.com/',
//         _id: 3
//     },
//     {
//         imageSrc: imgSrc,
//         title: 'This is a Doc Title 4',
//         description: 'This is a Doc summary 4',
//         linkURL: 'https://www.google.com/',
//         _id: 4
//     }
// ]