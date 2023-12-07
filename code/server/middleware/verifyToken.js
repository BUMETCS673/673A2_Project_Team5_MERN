// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
const secretKey = 'testestest';

const verifyToken = async (req, res, next) => {
  //authorization is the accessToken, and it comes with quotes marks
  //using split to get rid of the quotes marks
  const accessToken = req.headers.authorization;
  //console.log("token from verifyToken", accessToken);

  if (!accessToken) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(accessToken, secretKey);
    req.user = decoded;
    // console.log("From verifyToken, req.user", req.user);
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token.' });
  }
};

export default verifyToken;
