const fs = require("fs");

const requestHandler = (request, response) => {
  const url = request.url;
  const method = request.method;

  if (url === "/") {
    response.write("<html>");
    response.write(
      "<body><form action='/message' method='POST'><input type='text' name='msg'/><button>send</button></form></body>"
    );
    response.write("</html>");

    return response.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    request.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return request.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(message);

      fs.writeFile("msg.txt", message, (err) => {
        response.statusCode = 302;
        response.setHeader = ("Location", "/");
        return response.end();
      });
    });
  }
};

// module.exports =  requestHandler;

module.exports = {
  handler: requestHandler,
  someText: "text changed to check nodemon",
};

// module.exports.handler = requestHandler
