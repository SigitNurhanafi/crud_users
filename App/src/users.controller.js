const db = require('./utils/mysql.orm');
const Users = db.users;
const Op = db.Sequelize.Op;

var bcrypt = require("bcryptjs");

// Create and Save a new Users
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email && !req.body.full_name) {
    res.status(400).send({
      message: "Content can epmty full name or email!"
    });
    return;
  }

  const default_user_role = 2; 
  const rounds_salt_hash  = 8;

  // Create a Users
  const users = {
    full_name: req.body.full_name,
    phone_number: req.body.phone_number ? req.body.phone_number : null,
    email: req.body.email,
    hashed_password: bcrypt.hashSync(req.body.password, rounds_salt_hash),
    role_id: req.body.role_id ? parseInt(req.body.role_id): default_user_role,
  };

  // Save Users in the database
  Users.create(users)
    .then(data => {
      delete data.dataValues.hashed_password
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const full_name = req.query.full_name;
  let condition = full_name ? { full_name: { [Op.like]: `%${first_name}%` } } : null;

  Users.findAll({ where: condition, attributes: { exclude: ['hashed_password'] }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single Users with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Users.findByPk(id, { attributes: { exclude: ['hashed_password'] }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Users with id = " + id
      });
    });
};

// Update a Users by the id in the request
exports.update = (req, res) => {
  const rounds_salt_hash  = 8;
  const id = req.params.id;
  if (req.body.password) 
    req.body.password = bcrypt.hashSync(req.body.password, rounds_salt_hash)

  Users.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Users was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Users with id = ${id}. Users was not found !`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Users with id = " + id
      });
    });
};

// Delete a Users with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Users.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Users was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id = ${id}.User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Users with id = " + id
      });
    });
};