const express = require("express");
const router = express.Router();

require("../db/conn");
const Member = require("../model/memberSchema");
const Librarian = require("../model/librarianSchema");
const Books = require("../model/booksSchema");

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

// Librarian update fine
router.post("/librarian/updatefine", async (req, res) => {
    // console.log(req.body);
    const { id, newfine } = req.body;

    // Checking if any field is empty
    if (!id || !newfine) {
        return res.status(422).json({ error: "Empty field found" });
    }

    try {
        const userExist = await Member.findOne({ id });
        if (userExist) {
            // update fine
            try {
                const result = await Member.updateOne(
                    { id },
                    { $set: { pendingFine: newfine } }
                );
                // console.log(result);
            } catch (error) {
                console.log(error);
            }

            res.status(200).json({ message: "Fine updated" });
        } else {
            return res.status(404).json({ error: "ID not found" });
        }
    } catch (error) {
        console.log(error);
    }
});

// Librarian update fine
router.post("/librarian/add", async (req, res) => {
    // console.log(req.body);
    const { id, qrdata, name, edition, author, publication } = req.body;

    // Checking if any field is empty
    if (!id || !qrdata || !name || !edition || !author || !publication) {
        return res.status(422).json({ error: "Empty field found" });
    }

    try {
        const userExist = await Books.findOne({ id });
        if (userExist) {
            return res.status(422).json({ error: "Book ID already exists" });
        }

        const book = new Books({
            id: id,
            qrdata: qrdata,
            name: name,
            edition: edition,
            author: author,
            publication: publication,
            status: false,
        });

        await book.save();
        res.status(201).json({
            message: "Book registered successfully",
        });
    } catch (error) {
        console.log(error);
    }
});

// Librarian update fine
router.post("/searchbook", async (req, res) => {
    // console.log(req.body);
    const { name } = req.body;

    // Checking if any field is empty
    if (!name) {
        return res.status(422).json({ error: "Empty field found" });
    }

    try {
        Books.find({ name }, function (err, docs) {
            if (!err) {
                // console.log(docs);
                res.status(200).json(docs);
            } else {
                throw err;
            }
        });
    } catch (error) {
        console.log(error);
    }
});

// Librarian update student info
router.post("/librarian/update", async (req, res) => {
    // console.log(req.body);
    const { id, newpass } = req.body;

    // Checking if any field is empty
    if (!id || !newpass) {
        return res.status(422).json({ error: "Empty field found" });
    }

    try {
        const userExist = await Member.findOne({ id });
        if (userExist) {
            // update fine
            try {
                const result = await Member.updateOne(
                    { id },
                    { $set: { password: newpass } }
                );
                // console.log(result);
            } catch (error) {
                console.log(error);
            }

            res.status(200).json({ message: "Password updated" });
        } else {
            return res.status(404).json({ error: "ID not found" });
        }
    } catch (error) {
        console.log(error);
    }
});

// Return book

module.exports = router;