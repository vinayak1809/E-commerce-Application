const mongoose = require("mongoose");

const mongooseClient = mongoose.connect(
  "mongodb+srv://Vinayak:rishabh3195@cluster0.pkv2lh5.mongodb.net/shop?retryWrites=true&w=majority"
);

exports.mongooseConnect = mongooseClient;

//const mongodb = require("mongodb");
//const MongoClient = mongodb.MongoClient;
//
//let _db;
//url =
//  "mongodb+srv://Vinayak:rishabh3195@cluster0.pkv2lh5.mongodb.net/shop?retryWrites=true&w=majority";
//
//const mongoConnect = (callback) => {
//  MongoClient.connect(url)
//    .then((client) => {
//      _db = client.db();
//      callback();
//    })
//    .catch((err) => {
//      console.log(err);
//      throw err;
//    });
//};
//
//const getDb = () => {
//  if (_db) {
//    return _db;
//  }
//  throw "No database found!";
//};
//
//exports.mongoConnect = mongoConnect;
//exports.getDb = getDb;
