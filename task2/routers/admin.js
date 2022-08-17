const express = require("express");
const path = require("path");

const router = express.Router();
const rootDir = require("../util/path");
const shopController = require("../controller/shopController");

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
  // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
});

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

router.get("/contact-us", shopController.contactUs);
router.post("/success", shopController.success);

module.exports = router;
