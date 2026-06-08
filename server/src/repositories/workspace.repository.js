const workspaceModel = require("../models/workspace.model");
const AppError = require("../utils/appError");

async function createWorkspace({ name, description, icon, ownerId }) {
  const workspace = await workspaceModel.create({
    name,
    description,
    icon,
    ownerId,
  });
  return workspace;
}

async function findWorkspaceById(id) {
  const workspace = await workspaceModel.findById(id);
  return workspace;
}

async function updateWorkspace({ id, name, description, icon, settings }) {
  const workspace = await workspaceModel.findByIdAndUpdate(
    id,
    {
      name: name,
      description: description,
      icon:icon,
      settings:settings
    },
    {
      new :true,
    },
  );
  return workspace;
}

async function deleteWorkspace(id) {
  const workspace = await workspaceModel.findByIdAndDelete(id);
  return workspace;
}

module.exports = {
  createWorkspace,
  findWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
};
