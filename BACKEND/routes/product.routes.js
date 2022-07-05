const productController = require("../controllers/productController");

var auth = require("../services/authenticaton");
const checkRole = require("../services/checkRole");

const router = require("express").Router();

router.post(
  "/add",
  auth.authenticateToken,
  checkRole.checkRole,
  productController.addProduct
);
router.get(
  "/get",
  auth.authenticateToken,
  checkRole.checkRole,
  productController.getProduct
);
router.get(
  "/getByCategory/:id",
  auth.authenticateToken,
  checkRole.checkRole,
  productController.getByCategory
);
router.get(
  "/getById/:id",
  auth.authenticateToken,
  checkRole.checkRole,
  productController.getById
);
router.patch(
  "/update",
  auth.authenticateToken,
  checkRole.checkRole,
  productController.updateProduct
);

router.delete(
  "/delete/:id",
  auth.authenticateToken,
  checkRole.checkRole,
  productController.deleteProduct
);

router.patch(
  "/updateStatus",
  auth.authenticateToken,
  checkRole.checkRole,
  productController.updateProductStatus
);

module.exports = router;
