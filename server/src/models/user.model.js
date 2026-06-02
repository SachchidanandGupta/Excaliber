const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    passwordHash:{
        type:String,
        required:true,
        select:false
    },
    avatarUrl:{
        type:String,
        default:null
    },
    refreshTokens:{
        type:[String],
        default:[],
        select:false
    }
},{
    timestamps:true
});


const userModel = mongoose.model("User",userSchema);

module.exports = userModel;