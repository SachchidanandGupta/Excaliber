const asyncHandler = require("../utils/asyncHandler");
const {
  createDocumentService,
  getDocumentsByWorkspaceService,
  getDocumentsByFolderService,
  getDocumentByIdService,
  updateDocumentService,
  archiveDocumentService,
  searchDocumentsService,
  deleteDocumentService
} = require("../services/document.service");
const AppError = require("../utils/appError");

const createDocumentController = asyncHandler(async function (req, res) {
  const { title, content, type, folderId, tags } = req.body;
  const workspaceId = req.params.id;
  const userId = req.user.id;
  const document = await createDocumentService({
    workspaceId,
    userId,
    title,
    content,
    type,
    folderId,
    tags,
  });
  return res.status(201).json({
    success: true,
    document,
  });
});

const getDocumentsController = asyncHandler(async function (req, res) {
  const workspaceId = req.params.id;
  const userId = req.user.id;
  const folderId = req.query.folderId;
  if (folderId) {
    const documents = await getDocumentsByFolderService({
      workspaceId,
      userId,
      folderId,
    });
    return res.status(200).json({
      success: true,
      documents,
    });
  } else {
    const documents = await getDocumentsByWorkspaceService({
      workspaceId,
      userId,
    });
    return res.status(200).json({
      success: true,
      documents,
    });
  }
});

const getDocumentByIdController = asyncHandler(async function (req, res) {
  const workspaceId = req.params.id;
  const documentId = req.params.docId;
  const userId = req.user.id;
  const document = await getDocumentByIdService({
    documentId,
    workspaceId,
    userId,
  });
  return res.status(200).json({
    success: true,
    document,
  });
});

const updateDocumentController = asyncHandler(async function (req, res) {
  const workspaceId = req.params.id;
  const documentId = req.params.docId;
  const userId = req.user.id;
  const { title, content, folderId, tags, isArchived } = req.body;

  const updatedDocument = await updateDocumentService({
    documentId,
    userId,
    workspaceId,
    title,
    content,
    folderId,
    tags,
    isArchived,
  });

  return res.status(200).json({
    success: true,
    updatedDocument,
  });
});

const archiveDocumentController = asyncHandler(async function (req, res) {
  const workspaceId = req.params.id;
  const documentId = req.params.docId;
  const userId = req.user.id;
  const role = req.collaborator.role;
  if (role !== "owner") {
    throw new AppError("Insufficient permission", 403);
  }
  const updatedDocument = await archiveDocumentService({
    documentId,
    workspaceId,
    userId,
  });
  return res.status(200).json({
    success: true,
    updatedDocument,
  });
});

const searchDocumentsController = asyncHandler(async function (req, res) {
  const workspaceId = req.params.id;
  const query = req.query.q;
  const userId = req.user.id;
  const documents = await searchDocumentsService({
    workspaceId,
    userId,
    query,
  });
  return res.status(200).json({
    success: true,
    documents,
  });
});

const deleteDocumentController = asyncHandler(async function (req,res){
    const workspaceId = req.params.id;
    const documentId = req.params.docId;
    const userId = req.user.id;

  const deletedDocument =   await deleteDocumentService({ documentId, workspaceId, userId });
  return res.status(200).json({
    success: true,
     message: "Document permanently deleted"
  });
})

module.exports = {
  createDocumentController,
   getDocumentsController,
  getDocumentByIdController,
  updateDocumentController,
  archiveDocumentController,
  searchDocumentsController,
  deleteDocumentController
};
