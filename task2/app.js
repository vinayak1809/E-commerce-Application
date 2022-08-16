// const http = require("http"); //node
const express = require("express"); // third-party express
const adminRoutes = require("./routers/admin");
const shopRouter = require("./routers/shop");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/admin", adminRoutes);
("adding prefix in /admin is called as filtering");
app.use(shopRouter);

app.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});
app.listen(4000);
