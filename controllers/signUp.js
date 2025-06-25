import User from "../models/Users.js";
import bcrypt from "bcryptjs";
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ message: "user already exist, login instead" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    // save user
    await newUser.save();
    res.status(201).json({ message: "user has been registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};


export default signup