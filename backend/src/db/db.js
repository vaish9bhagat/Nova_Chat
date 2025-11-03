const mongoose = require("mongoose");

function connecDB() {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("connected to db");
    }).catch((err) => {
        console.log("failed to connect to db", err);

    })
}

module.exports=connecDB;