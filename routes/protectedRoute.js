// routes/protectedRoute.js

const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
// Protected route
// router.get("/", (req, res) => {
//   res.status(200).json({ Success: "Not Protected route accessed" });
// });
router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ Success: "Protected route accessed" });
});

module.exports = router;
