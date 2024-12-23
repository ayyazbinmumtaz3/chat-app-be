import jwt from "jsonwebtoken";
import { UserModel } from "../models/index.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(404).send('No auth token provided');

    const token = authHeader.split(' ')[1];

    try {

        const data = jwt.verify(token, process.env.JWT_SECRET);

        req.user = data;

        next();

    } catch (error) {
        res.status(404).json({ error });
    }
}

export const protectRoute = async (req, res, next) => {

    try {
        const token = req.cookies.jwt;
        console.log(token)
        if (!token) {
            return res.status(401).json({ message: "Unauthorized! No token provided" });
        }

        const isValid = jwt.verify(token, process.env.JWT_SECRET)

        console.log(isValid);

        if (!isValid) {
            return res.status(401).json({ message: "Unauthorized! Invalid token" });
        }

        const user = await UserModel.findById(isValid._id).select("-password");

        console.log({ user })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;

        next();

    } catch (error) {

        res.status(500).json(error)

    }
}