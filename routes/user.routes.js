//package imports
import express from "express";

//module imports
import { getUsers, getSingleUser } from "../controllers/user.controllers.js";
import { protectRoute } from "../middleware/protectRoute.js";

const userRoutes = express.Router();

userRoutes.get('/getUsers', protectRoute, getUsers);
userRoutes.get('/getUser/:id', protectRoute, getSingleUser);

export {userRoutes};