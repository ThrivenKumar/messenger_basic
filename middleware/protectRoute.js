import jwt from "jsonwebtoken";
import { userModel } from "../dbmodels/user.model.js";

const protectRoute = async (req, res, next)=>{
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).send({message: "Unauthorized - No token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).send({message: "Unauthorized - Invalid token"});
        }

        const user = await userModel.findById(decoded.userID).select("-password");
        if(!user){
            return res.status(404).send({message: "User not found"});
        }

        req.user = user;

        next();
    }
    catch(e){
        console.error("Error in protectRoute middleware: ", e.message);
        res.status(500).send({message: "Internal server error"});
    }

}

export {protectRoute};