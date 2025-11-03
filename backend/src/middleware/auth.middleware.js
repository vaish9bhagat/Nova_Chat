const jwt = require("jsonwebtoken");
const usermodel = require("../models/user.models");


const authmiddleware = async (req, res, next) => {
    const { token } = req.cookies;


    if (!token) {
        return res.status(400).json({
            message: "token not found,login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await usermodel.findById(decoded.id);
        req.user = user;
        next();

    } catch (error) {
        return res.status(400).json({
            message: "invalid token"
        })

    }
}

module.exports = authmiddleware;