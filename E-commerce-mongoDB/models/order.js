const mongoDB = require("mongodb");
const getDb = require("../util/database").getDb;

class Order {
  constructor(userId, items) {
    this.userId = userId;
    this.items = items;
  }
}

module.exports = Order;
