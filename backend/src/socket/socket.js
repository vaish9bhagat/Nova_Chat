const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const usermodel = require("../models/user.models");
const { generateContent, genrateVector } = require("../services/ai.service");
const messagemodel = require("../models/message.model");
const { createMemory, queryMemory } = require("../services/vector.service");




const socketserver = async (httpServer) => {


    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.use(async (socket, next) => {
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
        if (!cookies.token) {
            next(new Error("token does not found"));

        }
        try {
            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
            const user = await usermodel.findById(decoded.id);
            socket.user = user;
            next();

        } catch (error) {
            next(new Error("invalid token"));
            console.log(error)

        }


    })

    io.on("connection", (socket) => {
        console.log("user connected");

        socket.on("ai-message", async (messagepayload) => {

            const [message, vector] = await Promise.all([
                await messagemodel.create({
                    user: socket.user.id,
                    chat: messagepayload.chat,
                    content: messagepayload.content,
                    role: "user"
                }),

                await genrateVector(messagepayload.content)
            ])








            await createMemory({
                vector: vector,
                messageId: message._id,
                metadata: {
                    user: socket.user.id,
                    chat: messagepayload.chat,
                    text: messagepayload.content
                }
            })

            const [memory, chathistory] = await Promise.all([
                await queryMemory({
                    queryvector: vector,
                    limit: 3,
                    metadata: {}
                }),
                ((await messagemodel.find({ chat: messagepayload.chat }).sort({ createdAt: -1 }).limit(4).lean()).reverse()
                )

            ])


            const stm = chathistory.map(item => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }]
                }


            })
            const ltm = [{
                role: "user",
                parts: [{
                    text: `
                    these are some message from recent chats, use them to generate reponse
                    ${memory.map(item => item.metadata.text).join("\n")}

                    `}]
            }]




            const response = await generateContent([...ltm, ...stm]);
            socket.emit("ai-response", response);

            const [responseMessage, responseVector] = await Promise.all([
                await messagemodel.create({
                    chat: messagepayload.chat,
                    user: socket.user.id,
                    content: response,
                    role: "model"
                }),
                await genrateVector(response)
            ])

            await createMemory({
                vector: responseVector,
                messageId: responseMessage._id,
                metadata: {
                    user: socket.user.id,
                    chat: messagepayload.chat,
                    text: response
                }
            })


        })
    });

}

module.exports = socketserver;