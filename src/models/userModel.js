import mongoose from "mongoose";

const { Schema } = mongoose

const userSchema = new Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: {
            type: String,
        },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true },
);

export const UserModel = mongoose.model('users', userSchema);