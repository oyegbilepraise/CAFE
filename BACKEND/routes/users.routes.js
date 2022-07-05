const userController = require("../controllers/userController");

var auth = require("../services/authenticaton");
const checkRole = require("../services/checkRole")

const router = require("express").Router();

router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);
router.get("/get-all-user", auth.authenticateToken, checkRole.checkRole, userController.getAllUsers);
router.patch(
  "/update-user-status",
  auth.authenticateToken,
  userController.updateUser
);

module.exports = router;