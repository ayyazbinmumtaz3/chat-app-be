import jwt from 'jsonwebtoken';

export const generateAccessToken = (data, res) => {

    const accessToken = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    });

    res.cookie("jwt", accessToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    })

    return { accessToken };
};