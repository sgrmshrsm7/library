const express = require("express");
const app = express();

const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const port = process.env.PORT;

// // Database connection
// require("./db/conn");

app.use(express.json());

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
