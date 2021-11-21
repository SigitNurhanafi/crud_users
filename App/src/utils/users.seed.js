const db = require('./mysql.orm');
var bcrypt = require("bcryptjs");

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  db.users.create({
    full_name: "Sigit Nurhanafi",
    phone_number: "08776779437",
    email: "sigit.nurhanafi@gmail.com",
    hashed_password: bcrypt.hashSync("123321", 8),
    role_id: 1,
  });
  
  db.users.create({
    full_name: "Nurhanafi Sigit",
    phone_number: "08776779437",
    email: "nurhanafi1996@gmail.com",
    hashed_password: bcrypt.hashSync("123321", 8),
    role_id: 2,
  });
});