const mongoDB = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
  saveUser() {
    const db = getDb();
    let dbOp;
    return db
      .collection("user")
      .insertOne(this)
      .then((result) => {
        console.log(result, "account created");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  findUserById(userId) {
    const db = getDb();
    let dbOp;
    return db
      .collection("user")
      .findOne({ _id: new mongoDB.ObjectId(userId) })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
module.exports = User;
