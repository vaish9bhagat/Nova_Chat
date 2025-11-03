const chatmodel = require("../models/chat.model");
const messageModel = require("../models/message.model")

const chatController = async (req, res) => {
    const user = req.user;
    const { title } = req.body;

    const chat = await chatmodel.create({
        user: user.id,
        title
    })

    return res.json({
        message: "new chat is created successfully",
        chat: {
            user: chat.user,
            title: chat.title,
            _id: chat._id
        }
    })
}

const getChats = async (req, res) => {
    const user = req.user;
    const chats = await chatmodel.find({ user: user._id });

    res.status(200).json({
        message: "Chats retrieved successfully",
        chats: chats.map(chat => ({
            _id: chat._id,
            title: chat.title,
            lastActivity: chat.lastActivity,
            user: chat.user
        }))
    });

}
const getMessages = async (req, res) => {

    const { chatId } = req.params;
    const messages = await messageModel.find({ chat: chatId })
        .sort({ createdAt: 1 })


    return res.json({
        success: true,
        messages: messages
    })


};
const deleteChat = async (req, res) => {
    const { chatId } = req.params;
    const chat = await chatmodel.deleteOne({ _id: chatId })
    const delmessages = await messageModel.deleteMany({ chat: chatId });
    const allChats = await chatmodel.find();

    return res.json({
        chats: allChats
    })
}


module.exports = { chatController, getChats, getMessages, deleteChat }