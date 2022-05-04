const express = require("express");
const app = express();

const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const port = process.env.PORT;

let cors = require("cors");
let unggah = require("express-fileupload");

// // Database connection
// require("./db/conn");

// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(
    express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

app.use(cors());
app.use(unggah());
app.use(express.urlencoded({ extended: false }));
app.use("/img", express.static("storage"));

// Router
app.use(require("./router/auth"));

// Middleware
const middleware = (req, res, next) => {
    console.log("Hello my middleware");
    // Here we will add code to check whether the user is logged in or not.
    next();
};

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
