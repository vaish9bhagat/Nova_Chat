const express = require("express");
const authRoutes = require("./routes/authroutes");
const chatRoutes = require("./routes/chatroutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")))



const allowedOrigins = [
  "http://localhost:5173",
  "https://novachat-tclo.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);


app.use("/auth", authRoutes);
app.use("/", chatRoutes);

app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

module.exports = app;