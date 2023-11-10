const jwt = require('jsonwebtoken');
const User = require('../model/users.js');
// Import your User model

const secretKey = 'testestest';
const accessTokenExpiry = '4h';

const loginController = async (req, res) => {
  const token  = req.body.token;

  try {
    // Decode the Google JWT token
    const userObj = jwt.decode(token);
    console.log(userObj);
    if (!userObj) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    // Check if the user already exists
    let user = await User.findOne({ user_id: userObj.sub });

    if (!user) {
      // Create a new user if they don't exist
      user = new User({
        user_name: userObj.name,
        user_id: userObj.sub,
        user_pic: userObj.picture,
      });

      await user.save();
    }

    // Generate an access token
    const accessToken = jwt.sign({ user_id: user.user_id, user_name: user.user_name }, secretKey, {
      expiresIn: accessTokenExpiry,
    });

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = loginController;

