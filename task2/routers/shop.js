const express = require("express");
const path = require("path");
const ShopRouter = express.Router();

ShopRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
});

module.exports = ShopRouter;
