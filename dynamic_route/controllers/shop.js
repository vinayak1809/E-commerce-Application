const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });

  //pure mysql
  //   Product.fetchAll()
  //     .then(([rows, fieldData]) => {
  //       // console.log(fieldData, "fielddata");
  //       res.render("shop/product-list", {
  //         prods: rows,
  //         pageTitle: "All Products",
  //         path: "/products",
  //       });
  //     })
  //     .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({ where: { id: prodId } })
    .then((product) => {
      res.render("shop/product-detail", {
        product: product[0],
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => "");
  //in-built findbyid is not working
  // Product.findById(prodId) //findById => builtin-method
  //   .then((product) => {
  //     //pure mysql
  //     console.log(product, "product");
  //     res.render("shop/product-detail", {
  //       product: product, //pure mysql => product[0]
  //       pageTitle: product.title,
  //       path: "/products",
  //     });
  //   })
  //   .catch((err) => "");
};

exports.getIndex = (req, res, next) => {
  //findAll method is in-built method provided by sequelize database
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
  //pure mysql
  // Product.fetchAll((products) => {
  //   res.render("shop/index", {
  //     prods: products,
  //     pageTitle: "Shop",
  //     path: "/",
  //   });
  // });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    console.log(product, "product");
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
