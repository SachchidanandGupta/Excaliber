const mongoose = require("mongoose");

const collaboratorSchema = new mongoose.Schema({
    workspaceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Workspace",
        required:[true,"Workspace Id is required"]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User Id is required"]
    },
    role:{
        type:String,
        enum:["owner","editor","viewer"],
        required:[true,"role is required"]
    },
    invitedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:["pending","accepted","decliend"],
        default:"accepted"
    },
    invitedAt:{
        type:Date,
        default:Date.now
    },
    acceptedAt:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
});


collaboratorSchema.index({workspaceId:1,userId:1},{unique:true});

const collaboratorModel = mongoose.model("Collaborator",collaboratorSchema);

module.exports = collaboratorModel