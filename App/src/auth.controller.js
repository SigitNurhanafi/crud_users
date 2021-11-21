const User = require("./utils/mysql.orm").users;
const config = require("./utils/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signin = async (req, res) => {
  let { email, password } = req.body;

  try {
    user = await User.findOne({ where: { email: email }})
    if (!user) return res.status(404).send({ 
      message: "User Not found." 
    });
    
    let passwordIsValid = bcrypt.compareSync(
      password,
      user.hashed_password
    );
    if (!passwordIsValid) return res.status(401).send({
        message: "Invalid Password or Email"
    });
    

    let accessToken = jwt.sign({ id: user.id, roleId: user.role_id }, config.ACCESS_TOKEN_SECRET, {
      expiresIn: config.ACCESS_TOKEN_EXPIRATION
    });

    let refreshToken = jwt.sign({ id: user.id, roleId: user.role_id }, config.REFRESH_TOKEN_SECRET, {
      expiresIn: config.REFRESH_TOKEN_EXPIRATION
    });

    try {
      user.refreshToken = refreshToken;
      await user.save();

      res.status(200).send({
        id: user.id,
        email: user.email,
        role_id: user.role_id,
        accessToken,
        refreshToken
      });

    } catch (err) {
      res.status(500).send({ message: err.message });
    }
    
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.refreshToken = async (req, res) => {
  let { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).send({
    message: "Token not found"
  });

  try {
    const decode_user = await jwt.verify(
      refreshToken,
      config.REFRESH_TOKEN_SECRET
    );

    user = await User.findOne({ where: { id: decode_user.id }})
    if (!user) return res.status(403).json({
      message: "Invalid token"
    });

    if (user.refreshToken !== refreshToken) {
      return res.status(403).json({
        message: "Invalid token"
      });

    } else {
      let accessToken = jwt.sign({ id: user.id, roleId: user.role_id }, config.ACCESS_TOKEN_SECRET, {
        expiresIn: config.ACCESS_TOKEN_EXPIRATION
      });
      return res.status(200).send({
        status: "OK",
        accessToken,
        // user
      }); 
    }

  } catch (err) {
    console.error(err)
    res.status(403).json({
      message: "Invalid token"
    });
  }
};