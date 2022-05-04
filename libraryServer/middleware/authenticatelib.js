const jwt = require("jsonwebtoken");
const Librarian = require("../model/librarianSchema");

const authenticatelib = async (req, res, next) => {
    try {
        // const token = req.cookies.jwtoken;
        const token = req.headers.cookie.substring(8);

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await Librarian.findOne({
            _id: verifyToken._id,
            token: token,
        });
        if (!rootUser) {
            throw new Error("User Not Found");
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch (error) {
        res.status(401).send("Unauthorized: No token provided");
        console.log(error);
    }
};

module.exports = authenticatelib;
