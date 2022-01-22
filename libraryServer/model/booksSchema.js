const mongoose = require("mongoose");

// define Schema
var BooksSchema = mongoose.Schema({
    id: Number,
    qrdata: String,
    name: String,
    edition: Number,
    author: String,
    publication: String,
    status: Boolean,
});

// compile schema to model
var Books = mongoose.model("Books", BooksSchema, "books");

module.exports = Books;
