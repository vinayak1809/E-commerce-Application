const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const Product = require("./models/product");
const User = require("./models/user");

app.use((req, res, next) => {
  User.findAll({ where: { id: 5 } })
    .then((user) => {
      req.user = user[0];
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); // if user is deleted he will lose all of hos products
User.hasMany(Product); // same meaning as above code
//these relations are also called associations => more to know =>https://sequelize.org/docs/v6/core-concepts/assocs/

const sequelize = require("./util/database");
sequelize
  .sync() //sync(force:true) saves the changes and created new table and can delete old data,once using force:true code is changed we can use it again only on any next change in database

  .then((result) => {
    return User.findAll({ where: { id: 4 } })
      .then((data) => {
        if (!data) {
          return User.create({ name: "Max", email: "test@test.com" });
        }
        return data;
      })
      .then((user) => {
        // console.log(user);
        app.listen(5000);
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(result);
  });

//sequelize.sync() syncs the database that we coded in database.js into pure Sql form (now we can see this database in mysql workbench
