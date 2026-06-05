const asyncHandler = require("../utils/asyncHandler");
const {
  createWorkspaceService,
  getUserWorkspaceService,
  deleteWorkspaceService,
  getWorkspaceByIdService,
  updateWorkspaceService,
} = require("../services/workspace.service");

const createWorkspaceController = asyncHandler(async function (req, res) {
  const { name, description, icon } = req.body;
  const ownerId = req.user.id;
  const workspace = await createWorkspaceService({ name, description, icon, ownerId });
  return res.status(201).json({
    success: true,
    workspace,
  });
});

const getUserWorkspaceController = asyncHandler(async function (req, res) {
  const userId = req.user.id;
  const workspaces = await getUserWorkspaceService(userId);
  return res.status(200).json({
    success: true,
    workspaces,
  });
});

const getWorkspaceByIdController = asyncHandler(async function (req, res) {
  const workspaceId = req.params.id;
  const userId = req.user.id;
  const {workspace,folder,role} = await getWorkspaceByIdService({ workspaceId, userId });
  return res.status(200).json({
    success: true,
    workspace,
    folder,
    role,
  });
});

const updateWorkspaceController = asyncHandler(async function (req, res) {
  const workspaceId = req.params.id;
  const userId = req.user.id;
  const { name, description, icon, settings } = req.body;
  const updatedWorkspace = await updateWorkspaceService({
    workspaceId,
    userId,
    name,
    description,
    icon,
    settings,
  });
  return res.status(200).json({
     success:true,
     updatedWorkspace
  })
});

const deleteWorkspaceController = asyncHandler(async function(req,res){
    const workspaceId = req.params.id;
    const userId = req.user.id;
    const deletedWorkspace = await deleteWorkspaceService({workspaceId,userId});
    return res.status(200).json({
        success:true,
        deletedWorkspace
    })
})

module.exports = {
    deleteWorkspaceController,
    getUserWorkspaceController,
    updateWorkspaceController,
    createWorkspaceController,
    getWorkspaceByIdController
}