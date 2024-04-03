import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
        participants:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"user"
            }
        ],
        messages:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"message",
                default:[]
            }
        ]
    },//CreatedAt, updatedAt
    {timestamps:true}
);

const conversationModel = mongoose.model("conversation", conversationSchema);

export {conversationModel};