const {findCollaboratorByWorkspaceAndUser} = require("../repositories/collaborator.repository");
const {deleteFolderById} = require("../repositories/folder.repository");
const {deleteDocumentsByFolderId} = require("../repositories/document.repository");
const AppError = require("../utils/appError");
const deleteFolderService = async({ folderId, workspaceId, userId }) =>{
   const collaborator = await findCollaboratorByWorkspaceAndUser({workspaceId,userId});
   if(!collaborator){
    throw new AppError("Workspace not found or access denied", 403);
   }
   const roleHierarchy = {viewer:0,editor:1,owner:2};
   if(roleHierarchy[collaborator.role]<roleHierarchy["owner"]){
    throw new AppError("Insufficient permission",403);
   }
    const deletedRecords = await Promise.all([
       deleteDocumentsByFolderId(folderId),
      deleteFolderById(folderId),
   ]) 

   return deletedRecords;
}

module.exports = {
    deleteFolderService
}