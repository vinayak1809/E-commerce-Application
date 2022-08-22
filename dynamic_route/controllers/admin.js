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

exports.getSpecificUserProduct = (req, res, next) => {
  const idd = req.params.id;
  console.log(idd, "idddd");
  Product.findAll({ where: { userId: idd } })
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const userId = req.user.id;
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
    userId: userId,
  })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });

  //pure mysql
  // const product = new Product(null, title, imageUrl, description, price);
  // product
  //   .save()
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  console.log("editmode", editMode);
  const prodId = req.params.productId;
  Product.findAll({ where: { id: prodId } })
    .then((product) => {
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/add-product",
        editing: editMode,
        product: product[0],
      });
    })
    .catch((err) => {
      console.log("invalid product");
      return res.redirect("/");
    });
  // Product.findById(prodId, (product) => {
  //   if (!product) {
  //     console.log("invalid product");
  //     return res.redirect("/");
  //   }
  //   res.render("admin/edit-product", {
  //     //admin/edit-product => stands for which html page to go
  //     pageTitle: "Edit Product",
  //     path: "/admin/add-product",
  //     //admin/add-product => stands for which path to go
  //     editing: editMode, //query parameter
  //     product: product,
  //   });
  // });
};
exports.postEditProduct = (req, res, next) => {
  const postId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findAll({ where: { id: postId } })
    .then((product) => {
      product[0].title = updatedTitle;
      product[0].price = updatedPrice;
      product[0].description = updatedDesc;
      product[0].imageUrl = updatedImageUrl;
      product[0].save();
    })
    .then((result) => {
      console.log("Updated Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
  // const updatedProduct = new Product(
  //   postId,
  //   updatedTitle,
  //   updatedPrice,
  //   updatedImageUrl,
  //   updatedDesc
  // );
  // updatedProduct.save();
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findAll({ where: { id: productId } })
    .then((product) => {
      return product[0].destroy();
    })
    .then((result) => {
      console.log("Updated Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });

  // Product.deleteproductbyID(productId);
  // res.redirect("/admin/products");
};
