const collaboratorModel = require("../models/collaborator.model");

async function createCollaborator({ workspaceId, userId, role, invitedBy }) {
  const collaborator = await collaboratorModel.create({
    workspaceId,
    userId,
    role,
    invitedBy,
  });
  return collaborator;
}

async function findCollaboratorByWorkspaceAndUser({ workspaceId, userId }) {
  const collaborator = await collaboratorModel.findOne({
    workspaceId: workspaceId,
    userId: userId,
  });
  return collaborator;
}

async function findCollaboratorAllByWorkspaceId(workspaceId) {
  const collaborator = await collaboratorModel
    .find({ workspaceId: workspaceId })
    .populate("userId");
  return collaborator;
}

async function findAllCollaboratorsByUserId(userId) {
  const collaborator = await collaboratorModel
    .find({ userId: userId })
    .populate("workspaceId");
  return collaborator;
}

async function updateCollaboratorRole({ id, role }) {
  const collaborator = await collaboratorModel.findByIdAndUpdate(
    id,
    {
      role: role,
    },
    {
      new: true
    },
  );
  return collaborator;
}

async function removeCollaborator(id) {
  const collaborator = await collaboratorModel.findByIdAndDelete(id);
  return collaborator;
}

async function deleteCollaboratorByWorkspaceId(workspaceId){
  const collaborators = await collaboratorModel.deleteMany({workspaceId});
  return collaborators;
}

module.exports = {
  createCollaborator,
  findCollaboratorAllByWorkspaceId,
  findCollaboratorByWorkspaceAndUser,
  findAllCollaboratorsByUserId,
  updateCollaboratorRole,
  removeCollaborator,
  deleteCollaboratorByWorkspaceId
};
