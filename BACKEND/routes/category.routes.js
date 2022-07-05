const categoryController = require("../controllers/categoryController");

var auth = require("../services/authenticaton");
const checkRole = require("../services/checkRole");

const router = require("express").Router();

router.post("/add", auth.authenticateToken, checkRole.checkRole, categoryController.addCategory)
router.get("/get", auth.authenticateToken, checkRole.checkRole, categoryController.getAllCategory)
router.post("/update", auth.authenticateToken, checkRole.checkRole, categoryController.updateCategory)

module.exports = router;
