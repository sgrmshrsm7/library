const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const authenticatelib = require("../middleware/authenticatelib");

require("../db/conn");
const Member = require("../model/memberSchema");
const Librarian = require("../model/librarianSchema");
const Books = require("../model/booksSchema");

// Home page route
router.get("/", (req, res) => {
    res.send("Hello from the home page");
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Member
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Member Login route
router.post("/member", async (req, res) => {
    try {
        const { id, password } = req.body;

        if (!id || !password) {
            return res.status(422).json({ error: "Empty field found" });
        }

        const memberLogin = await Member.findOne({ id });
        if (memberLogin) {
            const isMatch = await bcrypt.compare(
                password,
                memberLogin.password
            );

            if (isMatch) {
                const token = await memberLogin.generateAuthToken();
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true,
                });
                res.json({
                    message: "Login Successful, Welcome " + memberLogin.name,
                });
            } else {
                return res.status(422).json({ error: "Wrong Password" });
            }
        } else {
            res.status(400).json({ error: "User not found" });
        }
    } catch (error) {
        console.log(error);
    }
});

// Member home
router.get("/member/home", authenticate, async (req, res) => {
    try {
        const { id } = req.body;

        // const memberLogin = await Member.findOne({ id });
        res.json(req.rootUser);
    } catch (error) {
        console.log(error);
    }
});

// Reissue
router.get("/member/reissue", authenticate, async (req, res) => {
    try {
        const { id } = req.body;

        // const memberLogin = await Member.findOne({ id });
        res.json(req.rootUser);
    } catch (error) {
        console.log(error);
    }
});

// FAQ
router.get("/faq", authenticate, async (req, res) => {
    try {
        const { id } = req.body;

        // const memberLogin = await Member.findOne({ id });
        res.json(req.rootUser);
    } catch (error) {
        console.log(error);
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Librarian
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Librarian Login route
router.post("/librarian", async (req, res) => {
    try {
        const { id, password } = req.body;

        if (!id || !password) {
            return res.status(422).json({ error: "Empty field found" });
        }

        const librarianLogin = await Librarian.findOne({ id });
        if (librarianLogin) {
            const isMatch = await bcrypt.compare(
                password,
                librarianLogin.password
            );
            if (isMatch) {
                const token = await librarianLogin.generateAuthToken();
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true,
                });
                res.status(200).json({ message: "Login Successful" });
            } else {
                return res.status(422).json({ error: "Wrong Password" });
            }
        } else {
            res.status(400).json({ error: "Librarian not found" });
        }
    } catch (error) {
        console.log(error);
    }
});

// Librarian home
router.get("/librarian/home", authenticatelib, async (req, res) => {
    try {
        const { id } = req.body;

        // const memberLogin = await Member.findOne({ id });
        res.json(req.rootUser);
    } catch (error) {
        console.log(error);
    }
});

// Librarian add student
router.post("/register", authenticatelib, async (req, res) => {
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

router.get("/register", authenticatelib, async (req, res) => {
    try {
        const { id } = req.body;

        // const memberLogin = await Member.findOne({ id });
        res.json(req.rootUser);
    } catch (error) {
        console.log(error);
    }
});

// Librarian update fine
router.post("/librarian/updatefine", authenticatelib, async (req, res) => {
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

router.get("/librarian/updatefine", authenticatelib, async (req, res) => {
    try {
        const { id } = req.body;

        // const memberLogin = await Member.findOne({ id });
        res.json(req.rootUser);
    } catch (error) {
        console.log(error);
    }
});

// Librarian Add book
router.post("/librarian/add", authenticatelib, async (req, res) => {
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

router.get("/librarian/add", authenticatelib, async (req, res) => {
    try {
        const { id } = req.body;

        // const memberLogin = await Member.findOne({ id });
        res.json(req.rootUser);
    } catch (error) {
        console.log(error);
    }
});

// Librarian update student info
router.post("/librarian/update", authenticatelib, async (req, res) => {
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
                    { $set: { password: await bcrypt.hash(newpass, 12) } }
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

router.get("/librarian/update", authenticatelib, async (req, res) => {
    try {
        const { id } = req.body;

        // const memberLogin = await Member.findOne({ id });
        res.json(req.rootUser);
    } catch (error) {
        console.log(error);
    }
});

// Return book
router.post("/librarian/returnbook", authenticatelib, async (req, res) => {
    // console.log(req.body);
    const { id, bookid } = req.body;
    let flag = false;
    // Checking if any field is empty
    if (!id || !bookid) {
        return res.status(422).json({ error: "Empty field found" });
    }

    try {
        const userExist = await Member.findOne({ id });
        if (userExist) {
            // update fine
            try {
                booksIssued = userExist.booksIssued;

                for (let i = 0; i < booksIssued.length; i++) {
                    if (booksIssued[i].id == bookid) {
                        const result1 = await Books.updateOne(
                            { id: bookid },
                            { $set: { status: false } }
                        );
                        booksIssued.splice(i, 1);
                        const result = await Member.updateOne(
                            { id },
                            { $set: { booksIssued: booksIssued } }
                        );
                        return res
                            .status(200)
                            .json({ message: "Book returned" });
                    }
                }
            } catch (error) {
                console.log(error);
            }
            return res
                .status(422)
                .json({ error: "Book already issued or does not exist" });
        } else {
            return res.status(404).json({ error: "ID not found" });
        }
    } catch (error) {
        console.log(error);
    }
});

router.get("/librarian/returnbook", authenticatelib, async (req, res) => {
    try {
        const { id } = req.body;

        // const memberLogin = await Member.findOne({ id });
        res.json(req.rootUser);
    } catch (error) {
        console.log(error);
    }
});

// Issue book
router.post("/librarian/issuebook", authenticatelib, async (req, res) => {
    // console.log(req.body);
    const { id, bookid } = req.body;
    // Checking if any field is empty
    if (!id || !bookid) {
        return res.status(422).json({ error: "Empty field found" });
    }
    try {
        const userExist = await Member.findOne({ id });
        if (userExist) {
            // update fine
            try {
                const bookExist = await Books.findOne({ id: bookid });
                if (bookExist) {
                    console.log(bookExist);
                    if (bookExist.status == false) {
                        newbook = {
                            id: bookExist.id,
                            qrdata: bookExist.qrdata,
                            name: bookExist.name,
                            edition: bookExist.edition,
                            author: bookExist.author,
                            publication: bookExist.publication,
                            duedate: new Date(Date.now() + 12096e5),
                        };

                        const result1 = await Books.updateOne(
                            { id: bookid },
                            { $set: { status: true } }
                        );

                        const result = await Member.updateOne(
                            { id },
                            { $push: { booksIssued: newbook } }
                        );

                        res.status(200).json({ message: "Book issued" });
                    } else {
                        res.status(404).json({
                            message: "Book already issued",
                        });
                    }
                } else {
                    res.status(404).json({ error: "Book ID not found" });
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            return res.status(404).json({ error: "Student ID not found" });
        }
    } catch (error) {
        console.log(error);
    }
});

router.get("/librarian/issuebook", authenticatelib, async (req, res) => {
    try {
        const { id } = req.body;

        // const memberLogin = await Member.findOne({ id });
        res.json(req.rootUser);
    } catch (error) {
        console.log(error);
    }
});

// Member Logout

router.post("/member/logout", async (req, res) => {
    // console.log(req.body);
    const { id } = req.body;

    // Checking if any field is empty
    if (!id) {
        return res.status(422).json({ error: "Empty field found" });
    }

    try {
        const userExist = await Member.findOne({ id });
        if (userExist) {
            // update fine
            try {
                const result = await Member.updateOne(
                    { id },
                    { $set: { token: "" } }
                );
            } catch (error) {
                console.log(error);
            }
            res.clearCookie("jwtoken", { path: "/" });
            res.status(200).json({ message: "Logged out" });
        } else {
            return res.status(404).json({ error: "ID not found" });
        }
    } catch (error) {
        console.log(error);
    }
});

// Librarian Logout

router.post("/librarian/logout", async (req, res) => {
    // console.log(req.body);
    const { id } = req.body;

    // Checking if any field is empty
    if (!id) {
        return res.status(422).json({ error: "Empty field found" });
    }

    try {
        const userExist = await Librarian.findOne({ id });
        if (userExist) {
            try {
                const result = await Librarian.updateOne(
                    { id },
                    { $set: { token: "" } }
                );
            } catch (error) {
                console.log(error);
            }
            res.clearCookie("jwtoken", { path: "/" });
            res.status(200).json({ message: "Logged out" });
        } else {
            return res.status(404).json({ error: "ID not found" });
        }
    } catch (error) {
        console.log(error);
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Librarian Searchbook
router.post("/search/searchbook", async (req, res) => {
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

module.exports = router;
