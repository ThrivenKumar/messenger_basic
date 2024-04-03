import { userModel } from "../dbmodels/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

async function signup(req, res){
    const {username, pwd, gender} = req.body;
    console.log(req.body);
    try{
        if(username && pwd){
            const isUserExists = await userModel.findOne({username:username}).exec();
            if(!isUserExists){
                const profilePicGender = gender === "male" ? `boy`:`girl`;
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(pwd, salt);
                const profilePicURL = `https://avatar.iran.liara.run/public/${profilePicGender}?username=${username}`;
                const user = new userModel({username:username, password: hashedPassword, gender:gender, profilePic: profilePicURL });
                if(user){
                    generateTokenAndSetCookie(user._id,res);
                    await user.save();
                    res.status(201).send({
                        _id:user?._id,
                        username: user.username,
                        gender: user.gender,
                        profilePic: user.profilePic
                    });
                }else{
                    res.status(400).send({message:"Invalid user data"})
                }
            }else{
                res.status(400).send({message:"User already exists"})
            }
        }
    }
    catch(e){
        console.error("Error in signup controller", e.message);
        res.status(500).send({message: "Internal server error"})
    }
}

async function login (req, res){
    const {username, pwd} = req.body;
    try{
        const user = await userModel.findOne({username:username}).exec();
        const passwordMatch = await bcrypt.compare(pwd, user?.password || "");
        if(!user || !passwordMatch ){
            res.status(401).send({message: "Invalid username or password"});
        }
        else{
            generateTokenAndSetCookie(user?._id,res);
            res.status(200).send({
                _id:user?._id,
                username: user.username,
                gender: user.gender,
                profilePic: user.profilePic    
            })
        }
    }
    catch(e){
        console.error("Error in login controller", e.message);
        res.status(500).send({message:"Internal server error"});
    }
}

function logout(req, res){
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).send({message: "Logged out successfully"});
    }
    catch(e){
        console.error("Error in logout controller", e.message);
        res.status(500).send({message: "Internal server error"});
    }
}

export { signup, login, logout };