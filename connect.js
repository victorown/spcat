const Sequelize = require("sequelize");
const sequelize = new Sequelize("dbcat", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
