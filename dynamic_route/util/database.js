const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-collection",
  password: "Vinayak++18",
}); // to run multiple server at once we use createPool

module.exports = pool.promise();
