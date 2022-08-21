// var usersList = document.getElementById("usersList");
// const user = require("../../dynamic_route/routes/admin");
var user = require("../model/user");
// const user = require("../routes/user_routes");
const axios = require("axios");

exports.getUser = (req, res, next) => {
  const data = axios
    .get("https://crudcrud.com/api/1abe3f81ce0f4516b1616bed2c7c4d3f/data")
    .then((user) => {
      res.json(user.data);
    });
  // user.findAll().then((userInfo) => {
  //   res.render("login-user", {
  //     users: userInfo,
  //     pageTitle: "Login",
  //     path: "/login-user",
  //     editing: false,
  //   });
  // });
};

exports.postUser = (req, res, next) => {
  const name = req.body.username;
  const email = req.body.mail;
  const age = req.body.age;

  obj = {
    name,
    email,
    age,
  };

  axios
    .post("https://crudcrud.com/api/1abe3f81ce0f4516b1616bed2c7c4d3f/data", obj)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.log(err));
  // user
  //   .create({
  //     name: name,
  //     email: email,
  //     age: age,
  //   })
  //   .then((result) => {
  //     console.log(result, "result");
  //     res.redirect("/login");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;

  user
    .findAll({ where: { id: userId } })
    .then((User) => {
      console.log(User[0].dataValues, "dataValues");
      User[0].dataValues.destroy();
    })
    .then((msg) => {
      console.log("user destroyed");
      res.redirect("/login");
    })
    .catch((err) => {
      console.log(err);
    });
};
// function myfun(event) {
//   event.preventDefault();
//   const name = event.target.username.value;
//   const age = event.target.age.value;
//   const mail = event.target.mail.value;

//   obj = {
//     name,
//     age,
//     mail,
//   };

//   axios
//     .post("https://crudcrud.com/api/61dfed35b1cb4b99a99eb54faeb95a22/data", obj)
//     .then((response) => console.log(response))
//     .catch((err) => console.log(err));

//   localStorage.setItem(obj.mail, JSON.stringify(obj));
//   console.log(JSON.parse(localStorage.getItem(mail)));
// }s

// window.addEventListener("DOMContentLoaded", () => {
//   const data = axios
//     .get("https://crudcrud.com/api/61dfed35b1cb4b99a99eb54faeb95a22/data")
//     .then((user) => {
//       console.log(user.data);
//       for (const key of user.data) {
//         document.getElementById("username").value = "";
//         document.getElementById("mail").value = "";
//         document.getElementById("age").value = "";

//         // const ob = JSON.parse(localStorage.getItem(key));

//         var newEle = document.createElement("li");
//         newEle.id = key._id;
//         newEle.appendChild(document.createTextNode(key.name + "-" + key.mail));
//         usersList.appendChild(newEle);

//         // delete buttun
//         var delBtn = document.createElement("button");
//         delBtn.className = "delete";
//         delBtn.setAttribute("onclick", `deleteUser('${key._id}')`);
//         delBtn.appendChild(document.createTextNode(" delete"));

//         // edit button
//         var editBtn = document.createElement("button");
//         editBtn.className = "edit";
//         editBtn.setAttribute("onclick", `editUser('${key._id}')`);
//         editBtn.appendChild(document.createTextNode(" edit"));

//         newEle.appendChild(delBtn);
//         newEle.appendChild(editBtn);
//       }
//     })
//     .catch((e) => console.log(e));
// });

// function deleteUser(id) {
//   axios
//     .delete(
//       `https://crudcrud.com/api/61dfed35b1cb4b99a99eb54faeb95a22/data/${id}`
//     )
//     .then(() => {
//       var ele = document.getElementById(id);
//       ele.remove();
//     })
//     .catch(() => console.log("can't delete user"));
// }

// function editUser(id) {
//   axios
//     .get(`https://crudcrud.com/api/61dfed35b1cb4b99a99eb54faeb95a22/data/${id}`)
//     .then((data) => {
//       var user = data.data;
//       let username = document.getElementById("username");
//       let mail = document.getElementById("mail");
//       let age = document.getElementById("age");

//       username.value = user.name;
//       mail.value = user.mail;
//       age.value = user.age;

//       deleteUser(id);
//     })
//     .catch(() => console.log("cant edit"));
// }
