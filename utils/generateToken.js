import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userID, res)=>{
    const token = jwt.sign({userID}, process.env.JWT_SECRET,{
        expiresIn: "1d"
    });

    res.cookie("jwt",token,{
        maxAge: 1 * 24 * 60 * 60 * 1000, // in milliseconds
        httpOnly: true, // prevent XSS (cross site scripting) attacks
        sameSite: "strict", // prevent CSRF (cross-site request forgery) attacks
        secure: process.env.NODE_ENV === 'production'
    })
}

export {generateTokenAndSetCookie};