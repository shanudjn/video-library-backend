const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const { User } = require('../models/user.model');



const register = async (req, res) => {
    const { username, email, password } = req.body.user;

    try {
        const newUser = await new User({ username: username, email: email, password: password });
        const salt = await bcrypt.genSalt(10);

        newUser.password = await bcrypt.hash(newUser.password, salt);


        await newUser.save();

        res.status(201).json({ success: true, newUser })
    } catch (error) {
        res.status(501).json({ success: false, message: "Sign Up Failed", error: error.message })
    }

}

const login = async (req, res) => {
    const { username, password } = req.body.user;
    const secret = process.env['SECRET'];

    try {
        const user = await User.findOne({ username });

        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '24h' })
                return res.status(200).json({ success: true, message: "Login Successfull", username, token })
            }
        }
        res.status(400).json({ success: false, message: "User not registered", });

    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error: error.message })
    }
}

const getUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById({ _id: userId });
        res.status(200).json({ success: true, user })
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to get user data", error: error.message })
    }


}

module.exports = { register, login, getUserDetails }