import mongoose from "mongoose";

const { Schema } = mongoose

const messageSchema = new Schema(
    {
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
        receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
        message: { type: String },
        image: {
            type: String,
        },
    },
    { timestamps: true },
);

export const MessageModel = mongoose.model('messages', messageSchema);