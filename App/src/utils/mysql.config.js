require("dotenv").config({ path:__dirname+'/./../../.env' });
console.log(process.env);
module.exports = {
  HOST: process.env.DB_HOST || process.env.MYSQL_SERVICE_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000
  }
};