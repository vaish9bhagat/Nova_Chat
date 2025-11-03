require("dotenv").config();
const app = require("./src/app");
const connecDB = require("./src/db/db");
const httpServer = require("http").createServer(app);
const socketserver = require("./src/socket/socket");

connecDB();
socketserver(httpServer);

httpServer.listen(3000, () => {
    console.log("server is running port 3000");
})