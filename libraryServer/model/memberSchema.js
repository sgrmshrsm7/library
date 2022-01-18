const mongoose = require("mongoose");

// define Schema
var MemberSchema = mongoose.Schema({
    id: Number,
    password: String,
    name: String,
    books: String,
    pendingFine: Number,
    year: Number,
    email: String,
});

// compile schema to model
var Member = mongoose.model("Member", MemberSchema, "member");

module.exports = Member;
