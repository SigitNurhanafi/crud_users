const express = require("express");
const app = express();

var bcrypt = require("bcryptjs");

// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./src/utils/mysql.orm");

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database');
  db.users.create({
    full_name: "Admin Name",
    phone_number: "08776779437",
    email: "admin@admin.admin",
    hashed_password: bcrypt.hashSync("123321", 8),
    role_id: 1,
  });
  
  db.users.create({
    full_name: "User Name",
    phone_number: "08776779437",
    email: "user@user.user",
    hashed_password: bcrypt.hashSync("123321", 8),
    role_id: 2,
  });
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Users CRUD application 2021" });
});

require("./src/users.route")(app);
require("./src/auth.route")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8181;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

