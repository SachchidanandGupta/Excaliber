const { Router } = require("express");

const router = Router();
const {
  createWorkspaceController,
  deleteWorkspaceController,
  getUserWorkspaceController,
  getWorkspaceByIdController,
  updateWorkspaceController,
} = require("../controllers/workspace.controller");

const  authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");

router.post("/",authenticate,createWorkspaceController);
router.get("/",authenticate,getUserWorkspaceController);
router.get("/:id",authenticate,authorize("viewer"),getWorkspaceByIdController);
router.patch("/:id",authenticate,authorize("owner"),updateWorkspaceController);
router.delete("/:id",authenticate,authorize("owner"),deleteWorkspaceController);

module.exports = router;