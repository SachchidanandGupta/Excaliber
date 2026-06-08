const {deleteFolderService} = require("../services/folder.service");
const asyncHandler = require("../utils/asyncHandler");

const deleteFolderController = asyncHandler(async function(req,res){
    const workspaceId = req.params.id;
    const folderId = req.params.folderId;
    const userId = req.user.id;

    await deleteFolderService({workspaceId,folderId,userId});
    return res.status(200).json({
        success:true,
        message:"Folder permanently deleted"
    })
});

module.exports = { deleteFolderController}