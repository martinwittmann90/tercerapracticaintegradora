import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  username: { type: String, required: true, max: 100 },
  message: { type: String, required: true, max: 100 },
},
{ versionKey: false }
);

const MessageModel = mongoose.model("messages", chatSchema);
export default MessageModel;

