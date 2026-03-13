const { Router } = require("express");
const { authMiddleware, requireRole } = require("../auth/auth.middleware");
const { confirm } = require("./repayment.controller");

const router = Router();
router.use(authMiddleware);
router.put("/:id/confirm", requireRole("lender"), confirm);

module.exports = router;