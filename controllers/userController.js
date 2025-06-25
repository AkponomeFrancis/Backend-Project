import User from "../models/Users.js";

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(400).json({ error: "User Not Found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateProfile = async (req, res) => {
    const { userName, email } = req.body;
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(400).json({ error: "User Not Found" });
        }

        if (userName) {
             user.userName = userName;
        }
        if (email) {
             user.email = email;
        }
        await user.save();

        res.status(201).json({
            message: "Profile Updated",
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getProfile, updateProfile };