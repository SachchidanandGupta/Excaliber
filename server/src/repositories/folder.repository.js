const folderModel = require("../models/folder.model");

async function createFolder({ workspaceId, name, parentId, createdBy, order }) {
  const folder = await folderModel.create({
    workspaceId,
    name,
    parentId,
    createdBy,
    order,
  });
  return folder;
}

async function findFoldersByWorkspaceId(workspaceId) {
  const folder = await folderModel.find({workspaceId});
  return folder;
}

async function findFolderById(id) {
  const folder = await folderModel.findById(id);
  return folder;
}

async function updateFolder({ id, name, parentId ,order}) {
  const folder = await folderModel.findByIdAndUpdate(
    id,
    {
      name: name,
      parentId: parentId,
      order:order
    },
    {
      new:true
    },
  );
  return folder;
}

async function deleteFolderById(id) {
  const folder = await folderModel.findByIdAndDelete(id);
  return folder;
}

async function findRootFolders(workspaceId) {
  const folder = await folderModel.find({workspaceId , parentId: null });
  return folder;
}

module.exports = {
  createFolder,
  findFolderById,
  deleteFolderById,
  findFoldersByWorkspaceId,
  updateFolder,
  findRootFolders
};
