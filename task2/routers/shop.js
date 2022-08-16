const express = require("express");
const ShopRouter = express.Router();

ShopRouter.get("/", (req, res, next) => {
  res.send("<h1>Hello from Express JS</h1>");
});

module.exports = ShopRouter;
