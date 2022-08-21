const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const UserRoutes = require("./routes/user_routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(UserRoutes);

const sequelize = require("./utils/database");
sequelize
  .sync()
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
