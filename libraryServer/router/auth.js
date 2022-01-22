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
            res.json({
                message: "Login Successful, Welcome " + memberLogin.name,
            });
        } else {
            res.status(400).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
    }
});

// Member home
router.get("/member/home", async (req, res) => {
    try {
        const { id } = req.body;

        const memberLogin = await Member.findOne({ id });
        res.json(memberLogin);
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

// Librarian add student

// Register route
router.post("/register", async (req, res) => {
    // console.log(req.body);
    const { id, name, password, yearOfJoining, email } = req.body;

    // Checking if any field is empty
    if (!id || !name || !password || !yearOfJoining || !email) {
        return res.status(422).json({ error: "Empty field found" });
    }

    try {
        const userExist = await Member.findOne({ id });
        if (userExist) {
            return res.status(422).json({ error: "ID already exists" });
        }

        const user = new Member({
            id: id,
            name: name,
            password: password,
            booksIssued: [],
            pendingFine: 0,
            yearOfJoining: yearOfJoining,
            email: email,
        });

        await user.save();
        res.status(201).json({
            message: "User registered successfully",
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
