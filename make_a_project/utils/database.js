const Sequelize = require("sequelize");

const sequelize = new Sequelize("project_schema", "root", "Vinayak++18", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
