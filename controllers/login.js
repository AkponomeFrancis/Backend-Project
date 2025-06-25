import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "user does not exist, please sign up" });
        }  
        // compare password
        // bcrypt.compare() returns a promise, so we need to await it
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: "invalid email or password" });
        }
        // generate token
        const token = jwt.sign({ 
            id: user._id, email: user.email}, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" });

        // create session
        req.session.user = {
            id: user._id,
            token,
        };
        // send response
        res.status(200).json({ 
            message: "Login Successful",
            token: token,
            user: {
                id:user?._id,
                email: user?.email,
                username:user?.username
            }
        });

    }catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default login; 