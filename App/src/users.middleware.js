const config = require('./utils/auth.config');
const User = require("./utils/mysql.orm").users;

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {     
    if (user.role_id === config.ROLE_ADMIN ) {
      next();
      return;
    }
  
    return res.status(403).send({
      message: "Unauthorized"
    });
  });
};

isValidUser = (req, res, next) => {
  let userId = parseInt(req.params.id);
  if (req.userId === userId || req.roleId === config.ROLE_ADMIN) {  
    next();
    return;    
  }

  return res.status(403).send({
    message: "Unauthorized invalide user"
  });
};

const AuthJwt = {
  isAdmin,
  isValidUser
};

module.exports = AuthJwt;