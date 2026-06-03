const mongoose = require("mongoose");

const folderSchema  = new mongoose.Schema({
    workspaceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Workspace",
        required:[true,"Workspace Id is required"]
    },
    name:{
        type:String,
        trim:true,
        required:[true,"Folder name is requred"]
    },
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Folder",
        default:null
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User is required"]
    },
    order:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

folderSchema.index({workspaceId:1,parentId:1});

const folderModel = mongoose.model("Folder",folderSchema);

module.exports = folderModel