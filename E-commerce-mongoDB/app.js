const path = require("path");

const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

dotenv.config();
const errorController = require("./controllers/error");
const mongooseConnect = require("./util/database").mongooseConnect;
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//app.use((req, res, next) => {
//  User.findUserById("633c487ff10bc8532b8a89bd")
//    .then((user) => {
//      req.user = new User(user.name, user.email, "", user.cart, user._id);
//      next();
//    })
//    .catch((err) => console.log(err));
//});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
mongoose
  .connect(
    "mongodb+srv://Vinayak:rishabh3195@cluster0.pkv2lh5.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(2000);
  })
  .catch((err) => {
    console.log(err);
  });
