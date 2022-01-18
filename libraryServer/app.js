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

////////////////////////////////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {
    res.send("Hello from the home page");
});

app.get("/member", (req, res) => {
    res.send("Hello from the member page");
});

app.get("/librarian", (req, res) => {
    res.send("Hello from the librarian page");
});

app.get("/librarian/home", (req, res) => {
    res.send("Hello from the libhome page");
});

app.get("/register", (req, res) => {
    res.send("Hello from the register page");
});

app.get("/member/home", (req, res) => {
    res.send("Hello from the memhome page");
});

app.get("/member/search", (req, res) => {
    res.send("Hello from the memsearch page");
});

app.get("/member/reissue", (req, res) => {
    res.send("Hello from the reissue page");
});

app.get("/librarian/search", (req, res) => {
    res.send("Hello from the libsearch page");
});

app.get("/librarian/update", (req, res) => {
    res.send("Hello from the update page");
});

app.get("/librarian/add", (req, res) => {
    res.send("Hello from the add page");
});

app.get("/librarian/updatefine", (req, res) => {
    res.send("Hello from the update fine page");
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
