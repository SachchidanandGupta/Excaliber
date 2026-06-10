const { Router } = require("express");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");
const {
  deleteFolderController,
  createFolderController,
  getFoldersController,
  updateFolderController,
} = require("../controllers/folder.controller");
const router = Router();

router.post(
  "/:id/folders",
  authenticate,
  authorize("editor"),
  createFolderController,
);
router.get(
  "/:id/folders",
  authenticate,
  authorize("viewer"),
  getFoldersController,
);
router.patch(
  "/:id/folders/:folderId",
  authenticate,
  authorize("editor"),
  updateFolderController,
);
router.delete(
  "/:id/folders/:folderId",
  authenticate,
  authorize("owner"),
  deleteFolderController,
);
module.exports = router;
