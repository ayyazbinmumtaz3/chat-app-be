import cloudinary from "../configs/cloudinary.js";
import { UserModel } from "../models/index.js";
import { comparePassword, hashPassword } from "../utils/app.js";
import { generateAccessToken } from "../utils/jwt.utils.js";

export const signup = async (req, res) => {

    const { email, password, fullName } = req.body;

    try {
        const userExist = await UserModel.exists({ email });

        if (userExist) return res.status(403)
            .json({ message: "Email already exists" });

        const hashedPassword = await hashPassword(password);

        const newUser = await UserModel.create({
            email,
            password: hashedPassword,
            fullName
        })

        if (newUser) {
            return res.status(201).json({
                user: newUser,
                ...generateAccessToken(newUser.toObject(), res)
            })

        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
    }

}

export const login = async (req, res) => {
    // res.send("login route");
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(409).json({ message: "User does not exist!" });
        };

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Provided password is incorrect!" });
        }

        generateAccessToken(user.toObject(), res)

        res.status(200)
            .json({
                message: "Login Successful",
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePic: user.profilePic
            })

    } catch (error) {
        return res.status(500).json(error);
    }

}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        return res.status(200).json(error)
    }
}

export const updateUser = async (req, res) => {
    const { profilePic } = req.body;
    const userId = req.user._id;

    try {
        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" })
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await UserModel.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });

        res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json(error)

    }

}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        return res.status(500).json(error)
    }
}