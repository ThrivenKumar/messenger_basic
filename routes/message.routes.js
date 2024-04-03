//package imports
import express from "express";

//module imports
import { getMessage, sendMessage } from "../controllers/message.controllers.js";
import { protectRoute } from "../middleware/protectRoute.js";

const messageRoutes = express.Router();

messageRoutes.post("/:id", protectRoute, getMessage);
messageRoutes.post("/send/:id", protectRoute, sendMessage)


export {messageRoutes};
