module.exports = app => {
  const auth = require("./auth.controller");

  let router = require("express").Router();

  // Signin User
  router.post("/signin", auth.signin);
  router.post("/token", auth.refreshToken);

  app.use('/api/auth', router);
};