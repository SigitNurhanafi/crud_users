
module.exports = app => {
  const users = require('./users.controller');

  const router = require('express').Router();
  const auth = require('./jwt.middleware');
  const user = require('./users.middleware');

  // Create a new user
  router.post("/", [auth.verifyToken, user.isAdmin], users.create);

  // Show User
  router.get("/:id", [auth.verifyToken, user.isValidUser], users.findOne);

  // Retrieve all users
  router.get("/", [auth.verifyToken, user.isAdmin], users.findAll);

  // Update a User with id
  router.put("/:id", [auth.verifyToken, user.isAdmin], users.update);

  // Update a User with id
  router.delete("/:id", [auth.verifyToken, user.isAdmin], users.delete);

  app.use('/api/users', router);
};