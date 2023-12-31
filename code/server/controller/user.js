import User from '../model/users.js';
import Document from '../model/document.js';
import { v4 as uuid } from 'uuid';


/**
 * Find a user and all the docs created by the user
 * Req
 * @param user_id
 * Res  
 * { user, docs }
 */
const getUser = async (req, res) => {

    const user = await User.findOne({ user_id: req.user.user_id });
    const docs = await Document.find({ author: user._id });

    res.json({ user, docs });

}

/**
 * Create a new document
 * Req
 * @param title
 * @param user_id
 * Res
 * { document_id }
 */
const createDoc = async (req, res) => {
    //Once middleware works, we can use req.user.sub
    // const user = req.user; then user can be deconstructed.

    const docTitle = req.body.title;
    const user = await User.findOne({ user_id: req.body.userId }); // user returned from MongoDB is an array with 1 user

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


}

/**
 * Delete a document
 * Req
 * @param document_id
 * @param user_id
 * Res
 * { docs }
 */
const deleteDoc = async (req, res) => {
    // Once mmiddleware works, we can use req.user.sub
    // const user = req.user; then user can be deconstructed.
    // try and catch block can be removed now, if app.js error handling works, need to test...

    const docId = req.params.docId;
    const user_id = req.user.user_id;
    const user = await User.findOne({ user_id: user_id });

    await Document.deleteOne({ document_id: docId, author: user._id });
    res.json({ message: "Successfully deleted the doc" });

}

export default {
    getUser,
    createDoc,
    deleteDoc
}