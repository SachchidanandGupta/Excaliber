const documentModel = require("../models/document.model");

async function createDocument({
  workspaceId,
  folderId,
  title,
  content,
  type,
  generatedFrom,
  tags,
  createdBy,
}) {
  const document = await documentModel.create({
    workspaceId,
    folderId,
    title,
    content,
    type,
    generatedFrom,
    tags,
    createdBy,
  });
  return document;
}

async function findDocumentById(id) {
  const document = await documentModel.findById(id);
  return document;
}

async function findDocumentsByWorkspaceId(workspaceId) {
  const document = await documentModel.find({ workspaceId, isArchived: false });
  return document;
}

async function findDocumentsByFolderId({ workspaceId, folderId }) {
  const documents = await documentModel.find({
    workspaceId,
    folderId,
    isArchived: false,
  });
  return documents;
}

async function updateDocument({
  id,
  title,
  content,
  folderId,
  tags,
  isArchived,
}) {
  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (content !== undefined) updateData.content = content;
  if (folderId !== undefined) updateData.folderId = folderId;
  if (tags !== undefined) updateData.tags = tags;
  if (isArchived !== undefined) updateData.isArchived = isArchived;

  const updatedDocument = await documentModel.findByIdAndUpdate(
    id,
    updateData,
    { new: true },
  );
  return updatedDocument;
}

async function archiveDocument(id) {
  const updatedDocument = await documentModel.findByIdAndUpdate(
    id,
    { isArchived: true },
    { new: true },
  );
  return updatedDocument;
}

async function deleteDocument(id) {
  const deletedDocument = await documentModel.findByIdAndDelete(id);
  return deletedDocument;
}

async function searchDocuments({ workspaceId, query }) {
  const documents = await documentModel
    .find(
      { workspaceId, isArchived: false, $text: { $search: query } },
      { score: { $meta: "textScore" } },
    )
    .sort({ score: { $meta: "textScore" } });

  return documents;
}

module.exports = {
  createDocument,
  findDocumentById,
  findDocumentsByWorkspaceId,
  findDocumentsByFolderId,
  updateDocument,
  archiveDocument,
  deleteDocument,
  searchDocuments,
};
