const { Router } = require("express");
const { authMiddleware } = require("../auth/auth.middleware");
const { receive } = require("./sms.controller");

const router = Router();

// Any authenticated user can send an SMS
router.post("/receive", authMiddleware, receive);

module.exports = router;