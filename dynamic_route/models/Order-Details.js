const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const OrderDetails = sequelize.define("orderDetails", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = OrderDetails;
