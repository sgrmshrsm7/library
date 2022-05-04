const mongoose = require("mongoose");

// define Schema
var Unanswered = mongoose.Schema({
    studid: Number,
    ques: String,
});

// compile schema to model
var UnQuestions = mongoose.model("UnQuestions", Unanswered, "unquestions");

module.exports = UnQuestions;
