const express = require("express");

const userRoutes = require("./routes/user");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(userRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found (Group chat)</h1>");
});
app.listen(5000);
