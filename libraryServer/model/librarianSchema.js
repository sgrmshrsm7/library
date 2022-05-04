const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// define Schema
var LibrarianSchema = mongoose.Schema({
    name: String,
    id: Number,
    password: String,
    email: String,
    token: String,
});

// Hashing password
LibrarianSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// Generating Token
LibrarianSchema.methods.generateAuthToken = async function () {
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
var Librarian = mongoose.model("Librarian", LibrarianSchema, "librarian");

module.exports = Librarian;
