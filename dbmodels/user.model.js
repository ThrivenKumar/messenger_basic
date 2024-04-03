import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique:true
        },
        password:{
            type: String,
            required: true,
            unique:false
        },
        userId: {
            type: Number,
            default:() => {
                return Math.floor(Math.random() * (100000 - 100 + 1)) + 100;
              },
            unique:true
        },
        gender: {
            type: String,
            required: true,
            enum:["male","female"]
        },
        profilePic:{
            type:String,
            default: ""
        }
    },//CreatedAt, updatedAt
    {timestamps: true}
);

const userModel = mongoose.model("user",UserSchema);

export {userModel};
