const mongoose = require("mongoose");

// define Schema
var QuesSchema = mongoose.Schema({
    studid: Number,
    ques: String,
    ans: String,
});

// compile schema to model
var Questions = mongoose.model("Questions", QuesSchema, "questions");

module.exports = Questions;
