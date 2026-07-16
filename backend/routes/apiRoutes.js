const express = require("express");

const router = express.Router();

const apiController = require("../controllers/apiController");

// ==========================================
// HEALTH
// ==========================================

router.get("/health", apiController.health);

// ==========================================
// DEVICES
// ==========================================

router.get("/devices", apiController.getDevices);

module.exports = router;