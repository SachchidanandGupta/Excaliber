const {
  createWorkspace,
  findWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
} = require("../repositories/workspace.repository");
const {
  findFoldersByWorkspaceId,
} = require("../repositories/folder.repository");
const {
  createCollaborator,
  findAllCollaboratorsByUserId,
  findCollaboratorByWorkspaceAndUser,
} = require("../repositories/collaborator.repository");
const AppError = require("../utils/appError");

const createWorkspaceService = async ({ name, description, icon, ownerId }) => {
  const workspace = await createWorkspace({ name, description, icon, ownerId });
  await createCollaborator({
    workspaceId: workspace._id,
    userId: ownerId,
    role: "owner",
    invitedBy: ownerId,
  });

  return workspace;
};

const getUserWorkspaceService = async (userId) => {
  const collaborator = await findAllCollaboratorsByUserId(userId);
  const workspaces = collaborator.map((item) => ({
    workspace: {
      id: item.workspaceId._id,
      name: item.workspaceId.name,
      description: item.workspaceId.description,
      icon: item.workspaceId.icon,
    },
    role: item.role,
  }));
  return workspaces;
};

const getWorkspaceByIdService = async ({ workspaceId, userId }) => {
  const collaborator = await findCollaboratorByWorkspaceAndUser({
    workspaceId,
    userId,
  });
  if (!collaborator) {
    throw new AppError("Workspace not found or access denied", 403);
  }
  const workspace = await findWorkspaceById(workspaceId);
  if (!workspace) {
    throw new AppError("Workspace not found", 404);
  }
  const folder = await findFoldersByWorkspaceId(workspaceId);
  return {
    workspace,
    folder,
    role: collaborator.role,
  };
};

const updateWorkspaceService = async ({
  workspaceId,
  userId,
  name,
  description,
  icon,
  settings,
}) => {
  const collaborator = await findCollaboratorByWorkspaceAndUser({
    workspaceId,
    userId,
  });
  if (!collaborator) {
    throw new AppError("Workspace not found or access denied", 403);
  }
  if (collaborator.role !== "owner") {
    throw new AppError("Only owners can update workspace", 403);
  }

  const updateData = {};
  if (workspaceId !== undefined) updateData.id = workspaceId;
  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  if (icon !== undefined) updateData.icon = icon;
  if (settings !== undefined) updateData.settings = settings;
  const updatedWorkspace = await updateWorkspace(updateData);
  return updatedWorkspace;
};

const deleteWorkspaceService = async ({ workspaceId, userId }) => {
  const collaborator = await findCollaboratorByWorkspaceAndUser({
    workspaceId,
    userId,
  });
  if (!collaborator) {
    throw new AppError("Workspace not found or access denied", 403);
  }
  if (collaborator.role !== "owner") {
    throw new AppError("Only owners can delete workspace", 403);
  }

  const deletedWorkspace = await deleteWorkspace(workspaceId);
  return deletedWorkspace;
};

module.exports = {
  createWorkspaceService,
  getUserWorkspaceService,
  getWorkspaceByIdService,
  updateWorkspaceService,
  deleteWorkspaceService,
};
