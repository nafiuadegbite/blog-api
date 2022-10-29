const http = require("http");
const app = require("./app");

const PORT = 8000;
const server = http.createServer(app);

const startServer = () => {
  server.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
  });
};


startServer();