const productModel = require("../models/product");

exports.getAddProducts = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

var body = [];
exports.postAddProducts = (req, res, next) => {
  const product1 = new productModel(req.body.title);
  product1.save();

  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  productModel.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: body.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
