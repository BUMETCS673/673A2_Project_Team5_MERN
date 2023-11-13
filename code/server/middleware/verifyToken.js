const jwt = require('jsonwebtoken');
const secretKey = 'testestest';

const verifyToken = async (req, res, next) => {
  const token = req.header.Authorization;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyToken;
