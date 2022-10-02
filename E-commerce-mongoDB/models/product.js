const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageURL) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageURL = imageURL;
  }
  save() {
    const db = getDb();
    return db
      .collection("product")
      .insertOne(this)
      .then((result) => {
        console.log(result, "Aaaaa");
      })
      .catch((err) => {
        console.log(err, "err in product.js save methods");
      });
  }
}
module.exports = Product;
