const { Router} = require("express");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");
const {deleteFolderController} = require("../controllers/folder.controller");
const router = Router();

router.delete("/:id/folders/:folderId",authenticate,authorize("owner"),deleteFolderController);

module.exports = router;