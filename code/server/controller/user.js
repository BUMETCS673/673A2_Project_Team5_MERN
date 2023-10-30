
//import { v4 as uuidv4 } from 'uuid';
const imgSrc = 'https://www.dunkindonuts.com/content/dam/dd/img/menu-redesign/donuts/VanillaFrostedSprinklesDonut_570x570.png'
const docs = [
    {
        imageSrc: imgSrc,
        title: 'This is a Doc Title 1',
        description: 'This is a Doc summary 1',
        linkURL: 'https://www.google.com/',
        _id: 1
    },
    {
        imageSrc: imgSrc,
        title: 'This is a Doc Title 2',
        description: 'This is a Doc summary 2',
        linkURL: 'https://www.google.com/',
        _id: 2
    },
    {
        imageSrc: imgSrc,
        title: 'This is a Doc Title 3',
        description: 'This is a Doc summary 3',
        linkURL: 'https://www.google.com/',
        _id: 3
    },
    {
        imageSrc: imgSrc,
        title: 'This is a Doc Title 4',
        description: 'This is a Doc summary 4',
        linkURL: 'https://www.google.com/',
        _id: 4
    }
]
module.exports.getUser = async (req, res) => {
    try {
        //const userID = req.headers.authorization;
        //middleware requireLogin handles login check.
        //const user = await User.findById(userID); //which will be the sub from google JWT
        //const docs = await Document.find({ author: userID });


        res.json({ docs });

    } catch (err) {
        console.log(err);
        return res.json({ error: "Error occur! Unable to get user." })
    }
}

module.exports.createDoc = async (req, res) => {

    try {
        // const userID = req.params.userid
        // const docTitle = req.body.title;
        // const newDoc = await new Document({
        //     document_id: uuidv4(),
        //     title: docTitle,
        //     author: userID,
        //     last_modified: new Date()
        // }).save();
        const { title } = req.body;

        docs.push({
            imageSrc: imgSrc,
            title: title,
            description: 'This is a new document: ' + title,
            linkURL: 'https://www.google.com/',
            _id: docs.length + 1
        })

        res.json({ docs })

    } catch (err) {
        console.log(err);
        return res.json({ error: "Error occur! Unable to create new doc" })
    }
}

module.exports.deleteDoc = async (req, res) => {
    try {
        // const userID = req.params.userid
        // const docID = req.body.docID;
        // const temp = Document.findByIdAndDelete({ document_id: docID })

        const { _id } = req.body;

        const index = docs.findIndex(doc => doc._id === parseInt(_id));
        if (index !== -1) {
            docs.splice(index, 1);
        }
        res.json({ docs });

    } catch (err) {
        console.log(err);
        return res.json({ error: "Error occur! Unable to delete the doc" })
    }
}
