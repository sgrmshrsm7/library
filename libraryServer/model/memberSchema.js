const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// define Schema
var MemberSchema = mongoose.Schema({
    id: Number,
    password: String,
    name: String,
    booksIssued: Array,
    pendingFine: Number,
    yearOfJoining: Number,
    email: String,
    token: String,
});

// Hashing password
MemberSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// Generating Token
MemberSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.token = token;
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
};

// compile schema to model
var Member = mongoose.model("Member", MemberSchema, "member");

module.exports = Member;
