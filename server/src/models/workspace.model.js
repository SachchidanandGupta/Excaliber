const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        trim:true,
        minlength:2,
        maxlength:50
    },
    description:{
        type:String,
        default:null,
        maxlength:200
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Owner Id is required"]
    },
    icon:{
        type:String,
        default:"📁"
    },
    settings:{
        defaultAiModel:{
            type:String,
            default:"gpt-4o"
        },
        defaultGenerationType:{
            type:String,
            default:"chat"
        }
    }
},{
    timestamps:true
});

workspaceSchema.index({ownerId:1});

const workspaceModel = mongoose.model("Workspace",workspaceSchema);

module.exports = workspaceModel