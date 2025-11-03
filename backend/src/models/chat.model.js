const mongoose = require("mongoose");

const chatschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        required: true
    },
    lastActivity: {
        type: Date,
        time: Date.now
    }
}, {
    timestamps: true
})

const chatmodel = mongoose.model("chat", chatschema);
module.exports = chatmodel;