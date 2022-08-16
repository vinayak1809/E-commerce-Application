const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.send(
    "<form action='/admin/add-product' method='POST'><input type='text' value='product' name='product'/><input type='text' value='price' name='price'/><button>Add product</button></form>"
  );
});

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
