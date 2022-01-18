const express = require("express");
const router = express.Router();

require("../db/conn");
const Member = require("../model/memberSchema");
const Librarian = require("../model/librarianSchema");
// const Books = require("../model/booksSchema");

// Home page route
router.get("/", (req, res) => {
    res.send("Hello from the home page");
});

// Member Login route
router.post("/member", async (req, res) => {
    try {
        const { id, password } = req.body;

        if (!id || !password) {
            return res.status(422).json({ error: "Empty field found" });
        }

        const memberLogin = await Member.findOne({ id });
        if (memberLogin && memberLogin.password === password) {
            res.json({ message: "Login Successful" });
        } else {
            res.status(400).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
    }
});

// Librarian Login route
router.post("/librarian", async (req, res) => {
    try {
        const { id, password } = req.body;

        if (!id || !password) {
            return res.status(422).json({ error: "Empty field found" });
        }

        const librarianLogin = await Librarian.findOne({ id });
        if (librarianLogin && librarianLogin.password === password) {
            res.json({ message: "Login Successful" });
        } else {
            res.status(400).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
