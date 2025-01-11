const http = require("http");
const hostname = "127.0.0.1";

const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("content-Type", "text/plain");
    res.end("hello World");
  } else if (req.url === "/name") {
    res.statusCode = 200;
    res.setHeader("content-Type", "text/plain");
    res.end("hello sarthak");
  } else {
    res.statusCode = 404;
    res.setHeader("content-Type", "text/plain");
    res.end("404 : Page Not Found");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server is listening to http://${hostname}:${port}`);
});
