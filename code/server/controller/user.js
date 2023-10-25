import { v4 as uuidv4 } from 'uuid';
import User from '../model/users'
import Document from '../model/document';

module.exports.getUser = async (req, res) => {
  try {
    const userID = req.params.userid
    //middleware requireLogin handles login check.
    const user = await User.findById(req.params.userID); //which will be the sub from google JWT
    const docs = await Document.find({ author: userID });

    res.json({ docs });
  } catch (err) {
    console.log(err);
    return res.json({ error: 'Error occur! Unable to get user.' })
  }
}

module.exports.createDoc = async (req, res) => {
  try {
    const userID = req.params.userid
    const docTitle = req.body.title;
    const newDoc = await new Document({
      document_id: uuidv4(),
      title: docTitle,
      author: userID,
      last_modified: new Date(),
    }).save();
  } catch (err) {
    console.log(err);
    return res.json({ error: 'Error occur! Unable to create new doc' })
  }
}

module.exports.deleteDoc = async (req, res) => {
  try {
    const userID = req.params.userid
    const { docID } = req.body;
    const temp = Document.findByIdAndDelete({ document_id: docID })
  } catch (err) {
    console.log(err);
    return res.json({ error: 'Error occur! Unable to create new doc' })
  }
}
