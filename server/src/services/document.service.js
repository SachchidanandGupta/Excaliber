const {
  findCollaboratorByWorkspaceAndUser,
} = require("../repositories/collaborator.repository");
const {
  createDocument,
  findDocumentsByWorkspaceId,
  findDocumentsByFolderId,
  findDocumentById,
  updateDocument,
  searchDocuments,
  archiveDocument
} = require("../repositories/document.repository");
const { findFolderById } = require("../repositories/folder.repository");
const AppError = require("../utils/appError");

const createDocumentService = async ({
  workspaceId,
  userId,
  title,
  content,
  type,
  folderId,
  tags,
}) => {
  const collaborator = await findCollaboratorByWorkspaceAndUser({
    workspaceId,
    userId,
  });
  if (!collaborator) {
    throw new AppError("Workspace not found or access denied", 403);
  }
  if (folderId) {
    const folder = await findFolderById(folderId);
    if (!folder) {
      throw new AppError("Folder not found", 404);
    }
  }
  const document = await createDocument({
    workspaceId,
    folderId,
    title,
    content,
    type,
    tags,
    createdBy: userId,
  });
  return document;
};

const getDocumentsByWorkspaceService = async ({ workspaceId, userId }) => {
  const collaborator = await findCollaboratorByWorkspaceAndUser({
    workspaceId,
    userId,
  });
  if (!collaborator) {
    throw new AppError("Workspace not found or access denied", 403);
  }
  const document = await findDocumentsByWorkspaceId(workspaceId);
  return document;
};

const getDocumentsByFolderService = async ({
  workspaceId,
  userId,
  folderId,
}) => {
  const collaborator = await findCollaboratorByWorkspaceAndUser({
    workspaceId,
    userId,
  });
  if (!collaborator) {
    throw new AppError("Workspace not found or access denied", 403);
  }
  const documents = await findDocumentsByFolderId({ workspaceId, folderId });
  return documents;
};

const getDocumentByIdService = async ({ documentId, userId, workspaceId }) => {
  const collaborator = await findCollaboratorByWorkspaceAndUser({
    workspaceId,
    userId,
  });
  if (!collaborator) {
    throw new AppError("Workspace not found or access denied", 403);
  }

  const document = await findDocumentById(documentId);
  if (!document) {
    throw new AppError("Document not found", 404);
  }
  if (document.workspaceId.toString() !== workspaceId) {
    throw new AppError("Document isn't part of this workspace", 403);
  }
  return document;
};

const updateDocumentService = async ({
  documentId,
  userId,
  workspaceId,
  title,
  content,
  folderId,
  tags,
  isArchived,
}) => {
  const collaborator = await findCollaboratorByWorkspaceAndUser({
    workspaceId,
    userId,
  });
  if (!collaborator) {
    throw new AppError("Workspace not found or access denied", 403);
  }
  const document = await findDocumentById(documentId);
  if (!document) {
    throw new AppError("Document not founded", 404);
  }
  const roleHierarchy = { viewer: 0, editor: 1, owner: 2 };
  if (roleHierarchy[collaborator.role] < roleHierarchy["editor"]) {
    throw new AppError("Insufficient permissions", 403);
  }
  const updatedDocument = await updateDocument({
    id: documentId,
    title,
    content,
    folderId: folderId,
    tags,
    isArchived,
  });
  return updatedDocument;
};

const searchDocumentsService = async ({ workspaceId, userId, query }) => {
  const collaborator = await findCollaboratorByWorkspaceAndUser({
    workspaceId,
    userId,
  });
  if (!collaborator) {
    throw new AppError("Workspace not found or access denied", 403);
  }
  if (!query) {
    throw new AppError("Search query is required", 400);
  }
  const documents = await searchDocuments({ workspaceId, query });
  return documents;
};

const archiveDocumentService = async({ documentId, workspaceId, userId }) =>{
    const collaborator = await findCollaboratorByWorkspaceAndUser({
    workspaceId,
    userId,
  });
  if (!collaborator) {
    throw new AppError("Workspace not found or access denied", 403);
  }
  const roleHierarchy = { viewer: 0, editor: 1, owner: 2 };
  if (roleHierarchy[collaborator.role] < roleHierarchy["owner"]) {
    throw new AppError("Insufficient permissions", 403);
  }
  const document = await findDocumentById(documentId);
  if(!document){
      throw new AppError("document not founded",404);
    }
    const updatedDocument = await archiveDocument(documentId);
    return updatedDocument;
}

module.exports = {
  createDocumentService,
  getDocumentsByWorkspaceService,
  getDocumentsByFolderService,
  getDocumentByIdService,
  updateDocumentService,
  searchDocumentsService,
  archiveDocumentService
};
