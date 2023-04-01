const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  
  if (!token) {
    req.authorization = false;
    return next();
  }
  
  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    
    req.username = data.username;
    req.member = data.member;
    req.admin = data.admin;
    req.authorization = true;
    
    return next();
  } catch {
    req.authorization = false;
    return next();
  }
}

module.exports = authorization;