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
const Questions = require("../model/quesSchema");
const UnQuestions = require("../model/unanswered");
const nodemailer = require("nodemailer");

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

        // console.log(req.rootUser);

        const booksIssued = req.rootUser.booksIssued;

        const rtags = new Set();
        for (var i = 0; i < booksIssued.length; i++) {
            rtags.add(booksIssued[i].tag);
        }

        var rbooks;

        await Books.find(
            { tag: { $in: Array.from(rtags) } },
            function (err, docs) {
                if (!err) {
                    rbooks = docs;
                } else {
                    throw err;
                }
            }
        )
            .clone()
            .catch((err) => {
                console.log(err);
                return res.status(404).json({ error: "Book not found" });
            });

        res.json({ user: req.rootUser, rbooks: rbooks });
    } catch (error) {
        console.log(error);
    }
});

// Reissue

router.post("/member/reissue", authenticate, async (req, res) => {
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
                if (bookExist && bookExist.status == true) {
                    booksIssued = userExist.booksIssued;

                    for (let i = 0; i < booksIssued.length; i++) {
                        if (booksIssued[i].id == bookid) {
                            booksIssued[i].duedate = new Date(
                                Date.now() + 12096e5
                            );
                            const result = await Member.updateOne(
                                { id },
                                { $set: { booksIssued: booksIssued } }
                            );
                            return res
                                .status(200)
                                .json({ message: "Book issued" });
                        }
                    }
                } else {
                    return res.status(422).json({ error: "Book not found" });
                }
                // const result = await Member.updateOne(
                //     { id },
                //     { $set: { pendingFine: newfine } }
                // );
            } catch (error) {
                console.log(error);
            }
            return res.status(422).json({ error: "Error :(" });
        } else {
            return res.status(404).json({ error: "ID not found" });
        }
    } catch (error) {
        console.log(error);
    }
});

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
        try {
            Questions.find({}, (err, ques) => {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).json(ques);
                }
            });
        } catch (error) {
            console.log(error);
            res.status(400).json("Error");
        }
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
    const { id, name, edition, author, publication } = req.body;

    // Checking if any field is empty
    if (!id || !name || !edition || !author || !publication) {
        return res.status(422).json({ error: "Empty field found" });
    }

    try {
        const userExist = await Books.findOne({ id });
        if (userExist) {
            return res.status(422).json({ error: "Book ID already exists" });
        }

        const book = new Books({
            id: id,
            qrdata: "qr" + id.toString(),
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
                            tag: bookExist.tag,
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

function editDistDP(str1, str2) {
    var m = str1.length;
    var n = str2.length;
    var dp = new Array(m + 1);

    for (var i = 0; i < m + 1; i++) {
        dp[i] = new Array(n + 1);
    }

    for (var i = 0; i < m + 1; i++) {
        for (var j = 0; j < n + 1; j++) {
            if (i == 0) {
                dp[i][j] = j;
            } else if (j == 0) {
                dp[i][j] = i;
            } else if (str1[i] == str2[j]) {
                dp[i][j] = dp[i - 1][j - 1] - 100;
            } else {
                dp[i][j] =
                    1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
            }
            if (
                i > 1 &&
                j > 1 &&
                str1[i - 1] == str2[j - 2] &&
                str1[i - 2] == str2[j - 1]
            )
                dp[i][j] = Math.min(dp[i][j], 1 + dp[i - 2][j - 2]);
        }
    }
    // console.log(str1, str2, dp[m][n]);
    return dp[m][n];
}

// Librarian Searchbook
router.post("/search/searchbook", async (req, res) => {
    // console.log(req.body);
    var { name } = req.body;

    // Checking if any field is empty
    if (!name) {
        return res.status(422).json({ error: "Empty field found" });
    }

    name = name.toUpperCase();

    // await Books.find({ name }, function (err, docs) {
    //     if (!err) {
    //         // console.log(docs);
    //         return res.status(200).json(docs);
    //     } else {
    //         throw err;
    //     }
    // })
    //     .clone()
    //     .catch((err) => {
    //         console.log(err);
    //     });

    await Books.find({}, function (err, docs) {
        if (!err) {
            var mincost = Infinity;
            var champak = [];

            for (var i = 0; i < docs.length; i++) {
                var dist = editDistDP(docs[i].name.toString(), name.toString());
                if (dist < mincost) {
                    mincost = dist;
                    champak = [docs[i]];
                } else if (dist == mincost) {
                    champak.push(docs[i]);
                }
            }
            return res.status(200).json(champak);
        } else {
            throw err;
        }
    })
        .clone()
        .catch((err) => {
            console.log(err);
            return res.status(404).json({ error: "Book not found" });
        });

    // return res.status(404).json({ error: "Book not found" });
    // return res.status(422).json({ error: "Not found" });
});

router.post("/addquestion", authenticate, async (req, res) => {
    // console.log(req.body);
    const { id, ques } = req.body;

    // Checking if any field is empty
    if (!id || !ques) {
        return res.status(422).json({ error: "Empty field found" });
    }

    try {
        const question = new UnQuestions({
            studid: id,
            ques: ques,
        });

        await question.save();
        res.status(201).json({
            message: "Question posted successfully",
        });
    } catch (error) {
        console.log(error);
    }
});

// Librarian FAQ
router.get("/librarian/answerfaq", authenticatelib, async (req, res) => {
    try {
        const { id } = req.body;

        // const memberLogin = await Member.findOne({ id });
        try {
            UnQuestions.find({}, (err, ques) => {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).json(ques);
                }
            });
        } catch (error) {
            console.log(error);
            res.status(400).json("Error");
        }
    } catch (error) {
        console.log(error);
    }
});

router.post("/librarian/answerfaq", authenticatelib, async (req, res) => {
    // console.log(req.body);
    const { ques, ans } = req.body;

    // Checking if any field is empty
    if (!ques || !ans) {
        return res.status(422).json({ error: "Empty field found" });
    }

    try {
        const question = new Questions({
            ques: ques,
            ans: ans,
        });

        await question.save();
        await UnQuestions.deleteOne({ ques: ques });
        res.status(201).json({
            message: "Question posted successfully",
        });
    } catch (error) {
        console.log(error);
    }
});

//////////////////////////////////////////////////////// Search by image
const Tesseract = require("tesseract.js");
const fs = require("fs");

const capturedImage = async (req, res, next) => {
    try {
        const path = "./storage/ocr_image.jpeg"; // destination image path
        let imgdata = req.body.img; // get img as base64
        const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, ""); // convert base64
        fs.writeFileSync(path, base64Data, { encoding: "base64" }); // write img file

        Tesseract.recognize("http://localhost:5000/img/ocr_image.jpeg", "eng", {
            logger: (m) => console.log(m),
        }).then(({ data: { text } }) => {
            console.log(text);
            return res.send({
                image: imgdata,
                path: path,
                text: text,
            });
        });
    } catch (e) {
        next(e);
    }
};
router.post("/capture", capturedImage);

router.post("/upload", (req, res) => {
    if (req.files) {
        console.log(req.files);
        var unggahFile = req.files.file;
        var namaFile = unggahFile.name;
        unggahFile.mv("./storage/" + namaFile, (err) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                // console.log(namaFile)
                // res.send(namaFile)
                Tesseract.recognize(`./storage/${namaFile}`, "eng", {
                    logger: (m) => console.log(m),
                })
                    .then(({ data: { text } }) => {
                        console.log(text);

                        return res.send({
                            image: `http://localhost:5000/img/${namaFile}`,
                            path: `http://localhost:5000/img/${namaFile}`,
                            text: text,
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
    }
});

// Librarian Searchbook
router.post("/search/searchbookimg", async (req, res) => {
    // console.log(req.body);
    var { name } = req.body;

    // Checking if any field is empty
    if (!name) {
        return res.status(422).json({ error: "Empty field found" });
    }

    name = name.toUpperCase();

    await Books.find({}, function (err, docs) {
        if (!err) {
            var mincost = Infinity;
            var champak = [];

            for (var i = 0; i < docs.length; i++) {
                var dist = editDistDP(docs[i].name.toString(), name.toString());
                if (dist < mincost) {
                    mincost = dist;
                    champak = [docs[i]];
                } else if (dist == mincost) {
                    champak.push(docs[i]);
                }
            }
            return res.status(200).json(champak);
        } else {
            throw err;
        }
    })
        .clone()
        .catch((err) => {
            console.log(err);
            return res.status(404).json({ error: "Book not found" });
        });

    // return res.status(404).json({ error: "Book not found" });
    // return res.status(422).json({ error: "Not found" });
});

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const sendNotification = async (email, body) => {
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "libraryvnit@outlook.com",
            pass: "saras12345",
        },
    });

    const options = {
        // It should be a string of sender email
        from: "libraryvnit@outlook.com",

        // Comma Separated list of mails
        to: email,

        // Subject of Email
        subject: "Book Reissue Reminder",

        // This would be the text of email body
        text: body,
    };

    transporter.sendMail(options, function (error, info) {
        if (error) throw Error(error);
        console.log("Email Sent Successfully");
        console.log(info);
    });
    await sleep(5000);
};

const checkToRemind = async () => {
    var today = new Date(Date.now());

    console.log("Today is " + today);
    console.log(typeof today);

    await Member.find({}, function (err, docs) {
        if (!err) {
            users = docs;
            var booleya;
            var chappu = "";
            users.forEach((user) => {
                booleya = true;
                var books = user.booksIssued;
                // var duebooks = "Books to be reissued: \n";
                for (var i = 0; i < books.length && booleya; i++) {
                    var diff = Math.abs(
                        new Date(today) - new Date(books[i].duedate)
                    );
                    console.log("diff is " + diff);
                    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
                    console.log("diffDays is " + diffDays);
                    // if (diffDays <= 100) {
                    //     duebooks +=
                    //         "Name: " +
                    //         books[i].name +
                    //         ", Due Date: " +
                    //         books[i].duedate.toString().substring(0, 10) +
                    //         "\n";
                    // }
                    if (diffDays <= 2) {
                        booleya = false;
                        if (chappu == "") chappu = user.email;
                        else chappu += "," + user.email;
                    }
                }
                console.log(chappu);
            });
            if (chappu != "") {
                sendNotification(
                    chappu,
                    `Dear student,
                    This is a reminder that one or more of your books are due renewal. Renew/Return your book(s) to avoid late fine.
                    To check your due dates of books visit: "http://localhost:3000/member/home"`
                );
            }
        } else {
            throw err;
        }
    })
        .clone()
        .catch((err) => {
            console.log(err);
            return res.status(404).json({ error: "Book not found" });
        });
};

setInterval(checkToRemind, 86400000);

module.exports = router;
