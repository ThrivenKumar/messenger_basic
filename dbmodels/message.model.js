import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
    {
        senderID: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        },
        receiverID: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        message: {
            type: String,
            required: true
        }
    },//CreatedAt, updatedAt
    { timestamps: true }
);

const messageModel = mongoose.model("message", messageSchema);

export {messageModel};