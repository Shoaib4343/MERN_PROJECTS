const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const route = require("./routes/auth.route");

// config env
dotenv.config();

// connect db
connectDB();

const app = express();

// middle ware 
app.use(express.json());

app.get("/", (req, res) => {
  res.send("home page api is working");
});

// middlewares
app.use("/api/v1/", route);

const PORT = process.env.PORT || 8080;
app.listen(8080, () =>
  console.log(
    `port is runningon ${process.env.DEV_MODE} monde on port ${PORT}`
    .bgGreen
    .white
  )
);
