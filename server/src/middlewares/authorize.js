const {findCollaboratorByWorkspaceAndUser} = require("../repositories/collaborator.repository");
const AppError = require("../utils/appError");

function authorize(role){
    return async function(req,res,next){
        const workspaceId = req.params.id;
        const userId = req.user.id;
        const collaborator = await findCollaboratorByWorkspaceAndUser({workspaceId,userId});
        if(!collaborator){
            throw new AppError("Access Denied ",403);
        }

        const roleHierarchy  = {
            viewer : 0,
            editor:1,
            owner:2
        }
        if(roleHierarchy[collaborator.role] < roleHierarchy[role]){
            throw new AppError("Insufficient permission",403);
        }
        req.collaborator = collaborator;
        next(); 
    }
}

module.exports = authorize