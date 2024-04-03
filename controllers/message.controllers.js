import { conversationModel } from "../dbmodels/conversation.model.js";
import { messageModel } from "../dbmodels/message.model.js";

const sendMessage = async (req, res)=>{
    try{
        const {message} = req.body;
        const {id} = req.params;
        const senderID = req.user._id;

        let conversation = await conversationModel.findOne({
            participants: {$all: [senderID,id]}
        })
        if(!conversation){
            conversation = new conversationModel({
                participants: [senderID, id]
            })
        }
        const newMessage = new messageModel({
            senderID,
            receiverID:id,
            message
        })
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        //executes each action parallelly
        await Promise.all([newMessage.save(), conversation.save()]);
        res.status(200).send(newMessage);
    }
    catch(e){
        console.error("Error in send message controller", e.message);
        res.status(500).send({message: "Internal server error"});
    }
}


const getMessage = async (req,res)=>{
    try{
        const {id:userToChatID} = req.params;
        const senderID = req.user._id;

        const conversation = await conversationModel.findOne({
            participants: { $all: [senderID, userToChatID] }
        }).populate("messages");
        if(!conversation){
            return res.status(404).send([]);
        }
        res.status(200).send(conversation.messages);
    }
    catch(e){
        console.error("Error in get message controller", e.message);
        res.status(500).send({message: "Internal server error"});
    }
}
export {sendMessage, getMessage};
