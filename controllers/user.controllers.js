//module imports
import { userModel } from "../dbmodels/user.model.js";

//returns all users except loggedin user
const getUsers= async(req,res)=>{
    try{
        const userID = req.user._id; //loggedin user _id
        const filteredUsers = await userModel.find({ _id:{ $ne: userID } });
        res.status(200).send(filteredUsers);
    }
    catch(e){
        console.error("Error in get all users controller", e.message);
        res.status(500).send({message: "Internal server error"});
    }
}

//returns single user based on their _id
const getSingleUser= async(req,res)=>{
    try{
        const {id: userID} = req.params; //_id of the user to be searched
        const filteredUser = await userModel.findById(userID).select("-password");
        res.status(200).send(filteredUser);
    }
    catch(e){
        console.error("Error in get single user controller", e.message);
        res.status(500).send({message: "Internal server error"});
    }
}

export {getUsers, getSingleUser};