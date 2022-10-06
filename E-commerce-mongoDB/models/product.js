const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
//const mongoDB = require("mongodb");
//const getDb = require("../util/database").getDb;
//
//class Product {
//  constructor(title, price, description, imageURL, id, userId) {
//    this.title = title;
//    this.price = price;
//    this.description = description;
//    this.imageURL = imageURL;
//    this._id = id ? new mongoDB.ObjectId(id) : null;
//    this.userId = userId;
//  }
//  save() {
//    const db = getDb();
//    let dbOp;
//    if (this._id) {
//      dbOp = db
//        .collection("product")
//        .updateOne({ _id: this._id }, { $set: this });
//    } else {
//      dbOp = db.collection("product").insertOne(this);
//    }
//    return dbOp
//      .then((result) => {
//        console.log(result, "insert product into database");
//      })
//      .catch((err) => {
//        console.log(err, "err in product.js save methods");
//      });
//  }
//
//  static fetchAll() {
//    const db = getDb();
//    return db
//      .collection("product")
//      .find()
//      .toArray()
//      .then((result) => {
//        return result;
//      })
//      .catch((err) => {
//        console.log(err, "err in fetch products");
//      });
//  }
//
//  static findById(productId) {
//    const db = getDb();
//    return db
//      .collection("product")
//      .find({ _id: new mongoDB.ObjectId(productId) })
//      .next()
//      .then((result) => {
//        return result;
//      })
//      .catch((err) => {
//        console.log(err, "err in find one product");
//      });
//  }
//
//  static deleteById(productId) {
//    const db = getDb();
//    return db
//      .collection("product")
//      .deleteOne({ _id: new mongoDB.ObjectId(productId) })
//      .then(() => {
//        return;
//      })
//      .catch((err) => {
//        console.log(err, "err in find one product");
//      });
//  }
//}
//module.exports = Product;
//
