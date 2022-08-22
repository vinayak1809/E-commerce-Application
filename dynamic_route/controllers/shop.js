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
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          console.log(products, products);
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: products[0],
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
  // res.render("shop/cart", {
  //   path: "/cart",
  //   pageTitle: "Your Cart",
  // });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  let newQuan = 1;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuant = product.cartItem.quantity;
        newQuan = oldQuant + 1;
        return product;
      }
      return Product.findAll({ where: { id: prodId } });
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuan },
      }); //addProduct is for many-many reltionship
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
  // Product.findById(prodId, (product) => {
  //   console.log(product, "product");
  //   Cart.addProduct(prodId, product.price);
  // });
  // res.redirect("/cart");
};

exports.deleteFromCart = (req, res, next) => {
  const prodId = req.body.productId;
  let newQuan;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product.cartItem.quantity == 1) {
        product.cartItem.destroy();
        res.redirect("/cart");
      } else if (product) {
        const oldQuant = product.cartItem.quantity;
        newQuan = oldQuant - 1;
        return product;
      }
      return Product.findAll({ where: { id: prodId } });
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuan },
      }); //addProduct is for many-many reltionship
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
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
