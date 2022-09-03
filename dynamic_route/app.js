const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-Item");
const Order = require("./models/order");
const OrderDetails = require("./models/Order-Details");

app.use((req, res, next) => {
  User.findAll({ where: { id: 2 } })
    .then((user) => {
      req.user = user[0];
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.use((req, res) => {
  console.log("urllllll", req.url);
  res.sendFile(path.join(__dirname, `public/index.html`));
});

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); // if user is deleted he will lose all of hos products
// User.hasMany(Product); // same meaning as above code
//these relations are also called associations => more to know =>https://sequelize.org/docs/v6/core-concepts/assocs/

User.hasMany(Product);
User.hasOne(Cart);

Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderDetails });
Product.belongsTo(Order, { through: OrderDetails }); // this is also many-many relo but such a way that every product can be in number of orders, so it belongd to certain order

const sequelize = require("./util/database");
sequelize
  .sync() //sync(force:true) saves the changes and created new table and can delete old data,once using force:true code is changed we can use it again only on any next change in database
  .then((user) => {
    User.findAll({ where: { id: 2 } })
      .then((user) => {
        if (user.length == 0) {
          return User.create({ name: "virend", email: "virend@test.com" });
        }
        return user;
      })
      .then((user) => {
        if (user.length == 0) {
          return user.createCart();
        }
      })
      .then((cart) => {
        app.listen(2000);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);

    //sequelize.sync() syncs the database that we coded in database.js into pure Sql form (now we can see this database in mysql workbench
  });
