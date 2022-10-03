//sequelize mysql
const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  imageUrl: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: false },
  price: { type: Sequelize.DOUBLE, allowNull: false },
});

module.exports = Product;

//pure mysql code

// const db = require("../util/database");

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     return db.execute(
//       "INSERT INTO products (title, price, imageUrl,description) VALUES  (?,?,?,?)",
//       [this.title, this.price, this.imageUrl, this.description]
//     );
//   }
//   static deleteproductbyID(productId) {
//     db.execute("DELETE FROM products where products.id = ?", [productId]);
//   }

//   static fetchAll() {
//     return db.execute("SELECT * FROM products");
//   }

//   static findById(id) {
//     return db.execute("SELECT * FROM products WHERE id = ?", [id]);
//   }
// };