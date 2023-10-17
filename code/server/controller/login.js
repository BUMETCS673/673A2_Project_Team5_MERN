/**
 * 
 * @param {user_object} req 
 * @param {*} res 
 */

/**
 * Front-end will send a Google JWT Token to here in req,
 * use jwt.decode() to extract user object.
 *      const userObj = jwt.decode(req.body.Token)
 * user.object contains email, username, sub(unique user id)
 * Check if user already exist
 * if(!user){
 *  const user = await new User({
 *      user_name:  userObj.username,
 *      user_id: userObj.sub
 *  })
 * 
 * Assign Access Token and Refresh Token
 * 
 * 
 * }
 */

module.exports.welcome = (req, res) => {
    const user = req.body.user;
    if (user.verified) {
        res.json({ msg: "You have logged in!" })
    }
}

