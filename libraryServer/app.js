const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const memberURL =
    "mongodb+srv://libraryuser:1gY4SSwU5GRMXsf1@librarycluster.tx9jj.mongodb.net/member?retryWrites=true&w=majority";

const booksURL =
    "mongodb+srv://libraryuser:1gY4SSwU5GRMXsf1@librarycluster.tx9jj.mongodb.net/books?retryWrites=true&w=majority";

const adminURL =
    "mongodb+srv://libraryuser:1gY4SSwU5GRMXsf1@librarycluster.tx9jj.mongodb.net/admin?retryWrites=true&w=majority";

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://libraryuser:<password>@librarycluster.tx9jj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const memberClient = new MongoClient(memberURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const booksClient = new MongoClient(booksURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const adminClient = new MongoClient(adminURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

memberClient.connect((err) => {
    const collection = memberClient.db("member").collection("devices");
    // perform actions on the collection object
    console.log("Connected to member database");

    // Defining schema for the collection
    const memberSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        id: Number,
        password: String,
        pendingFine: Number,
        year: Number,
        email: String,
        books: String,
    });

    // Defining model for the collection: Creating the collection.
    const Member = new mongoose.model("Member", memberSchema);

    // Create or Insert document
    const member = new Member({
        name: "John",
        id: 1,
        password: "123",
        pendingFine: 0,
        year: 2020,
        email: "",
        books: "",
    });
    // Saving it in the database.
    member.save(function (err, results) {
        console.log(results._id);
    });

    memberClient.close();
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
