const mongoose = require("mongoose");

// define Schema
var LibrarianSchema = mongoose.Schema({
    name: String,
    id: Number,
    password: String,
});

// compile schema to model
var Librarian = mongoose.model("Librarian", LibrarianSchema, "librarian");

module.exports = Librarian;
