const jwt = require('jsonwebtoken');
const config = require('./utils/auth.config');
const User = require("./utils/mysql.orm").users;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).send({
      message: "Unauthorized, no token provided!"
  });
  

  jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log(err);
    if (err) return res.status(401).send({
        message: "Unauthorized!"
    });
  
    req.userId = decoded.id;
    req.roleId = decoded.roleId;

    next();
  });
};

const AuthJwt = {
  verifyToken,
};

module.exports = AuthJwt;