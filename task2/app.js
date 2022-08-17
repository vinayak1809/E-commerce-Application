// const http = require("http"); //node
const express = require("express"); // third-party express
const path = require("path");
const adminRoutes = require("./routers/admin");
const shopRouter = require("./routers/shop");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", adminRoutes);
// ("adding prefix in /admin is called as filtering");
app.use(shopRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
app.listen(4000);
