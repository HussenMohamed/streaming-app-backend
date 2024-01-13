const express = require("express");
const router = express.Router();
// Protected route
router.get("/", require("../controllers/refreshTokenController"));

module.exports = router;
