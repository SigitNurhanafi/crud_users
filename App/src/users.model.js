module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    full_name: {
      type: Sequelize.STRING
    },
    phone_number: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    hashed_password: {
      type: Sequelize.STRING
    },
    role_id: {
      type: Sequelize.INTEGER
    },
    refreshToken: {
      type: Sequelize.STRING
    }
  });

  return Users;
};
