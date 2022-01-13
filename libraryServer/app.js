const express = require("express");
const app = express();
const port = 3000;

// const { MongoClient } = require("mongodb");
// const uri =
//     "mongodb+srv://libraryuser:1gY4SSwU5GRMXsf1@librarycluster.tx9jj.mongodb.net/Library?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// client.connect((err) => {
//     const admin = client.db("admin");
//     const books = client.db("books");
//     const member = client.db("member");
//     console.log("Connected to the database");
//     client.close();
// });

const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const url = process.env.DATABASE;

// make a connection
mongoose.connect(url);

// get reference to database
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
    console.log("Connection Successful!");

    // define Schema
    var AdminSchema = mongoose.Schema({
        name: String,
        id: Number,
        password: String,
        pendingFine: Number,
        year: Number,
        email: String,
        books: String,
    });

    // compile schema to model
    var Admin = mongoose.model("Admin", AdminSchema, "admin");

    // a document instance
    var admin1 = new Admin({
        name: "Murkute",
        id: 2,
        password: "123",
        pendingFine: 1000000,
        year: 2020,
        email: "",
        books: "",
    });

    // save model to database
    admin1.save(function (err, admin) {
        if (err) return console.error(err);
        console.log(admin.name + " saved to admin.");
    });
});

// Middleware
const middleware = (req, res, next) => {
    console.log("Hello my middleware");
    // Here we will add code to check whether the user is logged in or not.
    next();
};

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
