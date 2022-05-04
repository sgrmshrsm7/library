const jwt = require("jsonwebtoken");
// const User = require("../model/userSchema");
const Member = require("../model/memberSchema");

const authenticate = async (req, res, next) => {
    try {
        // const token = req.cookies.jwtoken;
        const token = req.headers.cookie.substring(8);

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await Member.findOne({
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

module.exports = authenticate;
