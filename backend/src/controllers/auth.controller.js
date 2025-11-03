const usermodel = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
    const { fullname: { firstname, lastname }, email, password } = req.body;

    const userExists = await usermodel.find({ email });

    if (!userExists) {
        return res.status(200).json({
            message: "user already exists"
        })
    }

    const hashedpassword = await bcrypt.hashSync(password, 10);

    const user = await usermodel.create({
        fullname: {
            firstname, lastname
        },
        email,
        password: hashedpassword


    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    res.status(200).json({
        message: "new user registered in successfully",
        user: {
            user,
            token:token
        }
    })



}

const loginController = async (req, res) => {
    const { email, password } = req.body;

    const user = await usermodel.findOne({ email });
    if (!user) {
        return res.status(200).json({
            message: "invalid user"
        })
    }
    const valpassword = bcrypt.compareSync(password, user.password);
    if (!valpassword) {
        return res.status(400).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    res.status(200).json({
        message: "user logged in successfully",
        token: token
    })



}

module.exports = {
    registerController,
    loginController
}