const { Router } = require("express");
const {
  registerController,
  loginController,
  refreshController,
  logOutController,
  getMeController,
} = require("../controllers/auth.controller");
const { registerValidator, loginValidator } = require("../validators/auth.validators");
const authenticate = require("../middlewares/authenticate");
const validate = require("../middlewares/validate");

const router = Router();

router.post("/register", registerValidator, validate,registerController);
router.post("/login",loginValidator,validate,loginController);
router.post("/refresh",refreshController);
router.post("/logout",authenticate,logOutController);
router.get("/get-me",authenticate,getMeController);


module.exports = router