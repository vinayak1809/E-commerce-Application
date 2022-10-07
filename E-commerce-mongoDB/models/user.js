const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./product");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.getCart = function (product) {
  const productIds = this.cart.items.map((i) => {
    return i.productId;
  });
  console.log(productIds, "productIds");
  Product.find({ _id: { $in: productIds } })
  .then((products) => {
    return products.map((p) => {
      return {
        ...p,
        quantity: this.cart.items.find((i) => {
          return i.productId.toString() === p._id.toString();
        }).quantity,
      };
    });
  });
};

userSchema.methods.addToCart = function (product) {
  const cartProduct = this.cart.items.findIndex((cp) => {
    if (this.cart.items > 0) {
      return cp.productId.toString() === product._id.toString();
    }
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProduct >= 0) {
    newQuantity = this.cart.items[cartProduct].quantity + 1;
    updatedCartItems[cartProduct].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
//const mongoDB = require("mongodb");
//const getDb = require("../util/database").getDb;
//
//class User {
//  constructor(name, email, password, cart, id) {
//    this.name = name;
//    this.email = email;
//    this.password = password;
//    this.cart = cart;
//    this._id = id;
//  }
//  saveUser() {
//    const db = getDb();
//    return db
//      .collection("user")
//      .insertOne(this)
//      .then((result) => {
//        console.log(result, "account created");
//      })
//      .catch((err) => {
//        console.log(err);
//      });
//  }
//
//  addToCart(product) {
//    const db = getDb();
//    const cartProduct = this.cart.items.findIndex((cp) => {
//      if (this.cart.items > 0) {
//        return cp.productId.toString() === product._id.toString();
//      }
//    });
//
//    let newQuantity = 1;
//    const updatedCartItems = [...this.cart.items];
//
//    if (cartProduct >= 0) {
//      newQuantity = this.cart.items[cartProduct].quantity + 1;
//      updatedCartItems[cartProduct].quantity = newQuantity;
//    } else {
//      updatedCartItems.push({
//        productId: new mongoDB.ObjectId(product._id),
//        quantity: newQuantity,
//      });
//    }
//    const updatedCart = {
//      items: updatedCartItems,
//    };
//
//    return db
//      .collection("user")
//      .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
//  }
//
//  getCart() {
//    const db = getDb();
//    const productIds = this.cart.items.map((i) => {
//      return i.productId;
//    });
//
//    return db
//      .collection("product")
//      .find({ _id: { $in: productIds } })
//      .toArray()
//      .then((products) => {
//        return products.map((p) => {
//          return {
//            ...p,
//            quantity: this.cart.items.find((i) => {
//              return i.productId.toString() === p._id.toString();
//            }).quantity,
//          };
//        });
//      });
//  }
//
//  removeItemFromCart(productId) {
//    const db = getDb();
//    const updatedCartItem = this.cart.items.filter((item) => {
//      if (
//        item.productId.toString() == productId.toString() &&
//        item.quantity > 1
//      ) {
//        const quant = {
//          productId: item.productId,
//          quantity: item.quantity - 1,
//        };
//        console.log(quant, "quant");
//        return quant;
//      } else {
//        return item.productId.toString() != productId.toString();
//      }
//    });
//    console.log(updatedCartItem, "updatedCartItem");
//    return db.collection("user").updateOne(
//      {
//        _id: new mongoDB.ObjectId(this._id),
//      },
//      {
//        $set: { cart: { items: updatedCartItem } },
//      }
//    );
//  }
//
//  removeExistingCart(userId) {
//    const db = getDb();
//    db.collection("user").updateOne(
//      { _id: userId },
//      {
//        $set: {
//          cart: { items: [] },
//        },
//      }
//    );
//  }
//
//  placeOrder() {
//    this.getCart().then((products) => {
//      const db = getDb();
//      const order = { userId: this._id, products: products };
//
//      return db
//        .collection("order")
//        .insertOne(order)
//        .then(() => console.log("order placed"));
//    });
//
//    this.removeExistingCart(this._id);
//  }
//
//  getOrders() {
//    const db = getDb();
//    return db
//      .collection("order")
//      .find({
//        userId: this._id,
//      })
//      .toArray()
//      .then((orders) => {
//        return orders;
//      });
//  }
//  static findUserById(userId) {
//    const db = getDb();
//    return db
//      .collection("user")
//      .find({ _id: new mongoDB.ObjectId(userId) })
//      .next()
//      .then((result) => {
//        return result;
//      })
//      .catch((err) => {
//        console.log(err);
//      });
//  }
//}
//module.exports = User;
//
