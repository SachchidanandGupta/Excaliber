const {
  deleteFolderService,
  createFolderService,
  getFoldersByWorkspaceService,
  updateFolderService,
} = require("../services/folder.service");
const asyncHandler = require("../utils/asyncHandler");

const deleteFolderController = asyncHandler(async function (req, res) {
  const workspaceId = req.params.id;
  const folderId = req.params.folderId;
  const userId = req.user.id;

  await deleteFolderService({ workspaceId, folderId, userId });
  return res.status(200).json({
    success: true,
    message: "Folder permanently deleted",
  });
});

const createFolderController = asyncHandler(async function (req, res) {
  const workspaceId = req.params.id;
  const userId = req.user.id;
  const { name, parentId, order } = req.body;
  const folder = await createFolderService({
    workspaceId,
    userId,
    name,
    parentId,
    order,
  });
  return res.status(201).json({
    success: true,
    folder,
  });
});

const updateFolderController = asyncHandler(async function (req, res) {
  const workspaceId = req.params.id;
  const userId = req.user.id;
  const folderId = req.params.folderId;
  const { name, parentId, order } = req.body;
  const updatedFolder = await updateFolderService({
    folderId,
    workspaceId,
    userId,
    name,
    parentId,
    order,
  });
  return res.status(200).json({
    success: true,
    updatedFolder,
  });
});

const getFoldersController = asyncHandler(async function (req, res) {
  const workspaceId = req.params.id;
  const userId = req.user.id;
  const folders = await getFoldersByWorkspaceService({ workspaceId, userId });
  return res.status(200).json({
    success: true,
    folders,
  });
});
module.exports = {
  deleteFolderController,
  createFolderController,
  getFoldersController,
  updateFolderController,
};
