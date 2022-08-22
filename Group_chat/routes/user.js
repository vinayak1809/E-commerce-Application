const express = require("express");

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

const router = express.Router();
router.get("/login", (req, res, next) => {
  console.log(localStorage._keys);
  res.send(
    `<form onsubmit="" action='/login' method='POST'><input type='text' value='username' name='username'/><button>Login</button></form>`
  );
});

router.post("/login", (req, res, next) => {
  const user = req.body;
  localStorage.setItem(user.username);
  res.redirect("/");
});

router.get("/", (req, res, next) => {
  res.send(
    `<form action='/' onsubmit="" method='POST'>
    <input name='username' id='username' value=${localStorage._keys}>
    <input type='text' id="msg" name='msg'/>
    <button>Message</button>
    </form>`
  );
});

router.get("/messages", (req, res, next) => {
  const store = localStorage._keys;

  const a = store;
  const b = localStorage.getItem(store);
  console.log(a, b);
  res.send(`<p>${a}:${b}</p>`);
});

router.post("/", (req, res, next) => {
  const msg = req.body;
  console.log(`${msg.username}:${msg.msg}`);
  localStorage.setItem(msg.username, msg.msg);
});

module.exports = router;
