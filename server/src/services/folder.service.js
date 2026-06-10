const {
  findCollaboratorByWorkspaceAndUser,
} = require("../repositories/collaborator.repository");
const {
  deleteFolderById,
  createFolder,
  findFolderById,
  findFoldersByWorkspaceId,
  findRootFolders,
  deleteFoldersByWorkspaceId,
  updateFolder,
} = require("../repositories/folder.repository");
const {
  deleteDocumentsByFolderId,
} = require("../repositories/document.repository");
const AppError = require("../utils/appError");

async function checkMembership({ workspaceId, userId }) {
  const collaborator = await findCollaboratorByWorkspaceAndUser({
    workspaceId,
    userId,
  });
  if (!collaborator)
    throw new AppError("Workspace not found or access denied", 403);
  return collaborator;
}

const deleteFolderService = async ({ folderId, workspaceId, userId }) => {
  const collaborator = await checkMembership({ workspaceId, userId });
  const roleHierarchy = { viewer: 0, editor: 1, owner: 2 };
  if (roleHierarchy[collaborator.role] < roleHierarchy["owner"]) {
    throw new AppError("Insufficient permission", 403);
  }
  const deletedRecords = await Promise.all([
    deleteDocumentsByFolderId(folderId),
    deleteFolderById(folderId),
  ]);

  return deletedRecords;
};

const createFolderService = async ({
  workspaceId,
  name,
  parentId,
  userId,
  order,
}) => {
  const collaborator = await checkMembership({ workspaceId, userId });
  const roleHierarchy = { viewer: 0, editor: 1, owner: 2 };
  if (roleHierarchy[collaborator.role] < roleHierarchy["editor"]) {
    throw new AppError("Insufficient permission", 403);
  }

  if (parentId != null) {
    const parent = await findFolderById(parentId);
    if (!parent) {
      throw new AppError("Parent folder not found", 404);
    }
    if (parent.workspaceId.toString() != workspaceId) {
      throw new AppError("Parent folder not in this workspace", 403);
    }
  }
  const folder = await createFolder({
    workspaceId,
    name,
    parentId: parentId || null,
    createdBy: userId,
    order: order || 0,
  });
  return folder;
};

const updateFolderService = async ({
  folderId,
  workspaceId,
  userId,
  name,
  parentId,
  order
}) => {
  const collaborator = await checkMembership({ workspaceId, userId });
  const roleHierarchy = { viewer: 0, editor: 1, owner: 2 };
  if (roleHierarchy[collaborator.role] < roleHierarchy["editor"]) {
    throw new AppError("Insufficient permission", 403);
  }
  const folder = await findFolderById(folderId);
  if (!folder) {
    throw new AppError("Folder not found", 404);
  }
  if (folder.workspaceId.toString() != workspaceId) {
    throw new AppError("Folder is not found in this workspace", 403);
  }
  if (parentId !== undefined && parentId !== null) {
    const parent = await findFolderById(parentId);
    if (!parent || parent.workspaceId.toString() !== workspaceId) {
      throw new AppError("Parent not found in this workspace", 404);
    }
  }
  const updateData = {};
  if (name != null) updateData.name = name;
  if (parentId != null) updateData.parentId = parentId;
  if (order != null) updateData.order = order;
  const updatedFolder = await updateFolder({ id: folderId, ...updateData });
  return updatedFolder;
};

const getFoldersByWorkspaceService = async ({ workspaceId, userId }) => {
  const collaborator = await checkMembership({ workspaceId, userId });
  const folders = await findFoldersByWorkspaceId(workspaceId);
  return folders;
};

module.exports = {
  deleteFolderService,
  createFolderService,
  updateFolderService,
  getFoldersByWorkspaceService,
};
