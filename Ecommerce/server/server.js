const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoute = require("./routes/auth.route");
const categoryRoute = require("./routes/category.route");
const cors = require("cors");
const productRoute = require("./routes/product.route");

// config env
dotenv.config();

// connect db
connectDB();

const app = express();

// middle ware 
app.use(express.json());
app.use(cors({origin:'http://localhost:5173',credentials:true}))

app.get("/", (req, res) => {
  res.send("home page api is working");
});

// auth  middlewares
app.use("/api/v1/", authRoute);

// Category Middlewares
app.use("/api/v1/",categoryRoute)
// Product Middleware
app.use("/api/v1/",productRoute)

const PORT = process.env.PORT || 8080;
app.listen(8080, () =>
  console.log(
    `port is runningon ${process.env.DEV_MODE} monde on port ${PORT}`
    .bgGreen
    .white
  )
);
