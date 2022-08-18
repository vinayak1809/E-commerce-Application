const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");
const shopController = require("../controllers/shop");
const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/products => GET
router.get("/products", adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);

module.exports = router;
