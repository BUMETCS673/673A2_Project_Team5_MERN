const jwt = require('jsonwebtoken');
const secretKey = 'testestest';
module.exports.requireLogin = async (req, res, next) => { 
    const requireLogin = (req, res, next) => {
      const token = req.header.Authorization;
    
      if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
      }
    
      jwt.verify(token, secretKey, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token.' });
        }
    
        req.user = user;
        
      });

      next()
    };    
    next()
}
