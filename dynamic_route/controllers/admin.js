const Product = require("../models/product");
const fs = require("fs");
const path = require("path");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  Product.findById(prodId, (product) => {
    if (!product) {
      console.log("invalid product");
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      //admin/edit-product => stands for which html page to go
      pageTitle: "Edit Product",
      path: "/admin/add-product",
      //admin/add-product => stands for which path to go
      editing: editMode, //query parameter
      product: product,
    });
  });
};
exports.postEditProduct = (req, res, next) => {
  const postId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    postId,
    updatedTitle,
    updatedPrice,
    updatedImageUrl,
    updatedDesc
  );
  updatedProduct.save();
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products[0],
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.deleteproductbyID(productId);
  res.redirect("/admin/products");
};
