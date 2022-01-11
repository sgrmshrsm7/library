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

// const url =
//     "mongodb+srv://libraryuser:1gY4SSwU5GRMXsf1@librarycluster.tx9jj.mongodb.net/Library?retryWrites=true&w=majority";

const url =
    "mongodb+srv://libraryuser:1gY4SSwU5GRMXsf1@librarycluster.tx9jj.mongodb.net/Library?retryWrites=true&w=majority";

mongoose.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database connected!");
    // dbo = db("Library");
    db.collection("admin").insertOne(
        {
            name: "Murkute",
            id: 2,
            password: "123",
            pendingFine: 1000000,
            year: 2020,
            email: "",
            books: "",
        },
        function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        }
    );
    db.close();
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

// member
