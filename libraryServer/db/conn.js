// const url = process.env.DATABASE;

// // make a connection
// mongoose.connect(url);

// // get reference to database
// var db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error:"));

// db.once("open", function () {
//     console.log("Connection Successful!");

//     // define Schema
//     var AdminSchema = mongoose.Schema({
//         name: String,
//         id: Number,
//         password: String,
//         pendingFine: Number,
//         year: Number,
//         email: String,
//         books: String,
//     });

//     // compile schema to model
//     var Admin = mongoose.model("Admin", AdminSchema, "admin");

//     // a document instance
//     var admin1 = new Admin({
//         name: "Murkute",
//         id: 2,
//         password: "123",
//         pendingFine: 1000000,
//         year: 2020,
//         email: "",
//         books: "",
//     });

//     // save model to database
//     admin1.save(function (err, admin) {
//         if (err) return console.error(err);
//         console.log(admin.name + " saved to admin.");
//     });
// });

const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose
    .connect(DB)
    .then(() => {
        console.log("Connection successful");
    })
    .catch((err) => {
        console.log("Connection failed");
        console.log(err);
    });
