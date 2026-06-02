const mongoose = require("mongoose");
const env = require("./env");

function connectToDB() {
    mongoose.connect(env.mongo.uri).then(()=>{
        console.log("Connected with mongoDB Database");
    }).catch(err=>{
        console.error("Connection failed",err);
        process.exit(1);
    })
}

module.exports = {connectToDB}