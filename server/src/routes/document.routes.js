const { Router } = require("express");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");
const {
  archiveDocumentController,
  createDocumentController,
  getDocumentByIdController,
 getDocumentsController,
  searchDocumentsController,
  updateDocumentController,
  deleteDocumentController
} = require("../controllers/document.controller");

const router = Router();

router.post("/:id/documents", authenticate, authorize("editor"), createDocumentController);
router.get("/:id/documents", authenticate, authorize("viewer"), getDocumentsController);
router.get("/:id/documents/search", authenticate, authorize("viewer"), searchDocumentsController);
router.get("/:id/documents/:docId", authenticate, authorize("viewer"), getDocumentByIdController);
router.patch("/:id/documents/:docId", authenticate, authorize("editor"), updateDocumentController);
router.delete("/:id/documents/:docId", authenticate, authorize("owner"), archiveDocumentController);
router.delete("/:id/documents/:docId/permanent",authenticate,authorize("owner"),deleteDocumentController)
module.exports = router;
