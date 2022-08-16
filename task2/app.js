// const http = require("http"); //node
const express = require("express"); // third-party express
const app = express();

app.use((req, res, next) => {
  console.log("in the middleware");
  next();
});

app.use((req, res, next) => {
  console.log("next to first middleware");
  res.send({ key1: "value" });
});

app.listen(4000);
