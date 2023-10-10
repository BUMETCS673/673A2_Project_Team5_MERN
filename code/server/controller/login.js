/**
 * 
 * @param {user_object} req 
 * @param {*} res 
 */

module.exports.welcome = (req, res) => {
    const user = req.body.user;
    if (user.verified) {
        res.json({ msg: "You have logged in!" })
    }
}

