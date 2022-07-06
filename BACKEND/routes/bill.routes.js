const billController = require("../controllers/billController");
const { bill } = require("../models");

var auth = require("../services/authenticaton");
const checkRole = require("../services/checkRole");

const router = require("express").Router();

router.post(
  "/generateReport",
  auth.authenticateToken,
  billController.generateReport
);

router.post('/getPdf', auth.authenticateToken, billController.getPdf)

module.exports = router;
