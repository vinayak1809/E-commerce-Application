const http = require("http");

//below line works like import
const routes = require("./index");

const server = http.createServer(routes.handler);
console.log(routes.someText);
server.listen(2000);
