import User from '../model/users'
import Document from '../model/document';

module.exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userID); //which will be the sub from google JWT
        const docs = await Document.find({ author: user._id })

        res.json({ docs })

    } catch (err) {
        console.log(err);
        return res.json({ error: "Error Occur! Unable to get user." })
    }

    const user = await User.findById(req.params.sub);

}