const { Router } = require("express");
const { authMiddleware, requireRole } = require("../auth/auth.middleware");
const { confirm, ngoLoans, userLoans } = require("./loan.controller");

const router = Router();

router.use(authMiddleware);

router.put("/:id/confirm",  requireRole("lender"), confirm);   // lender confirms a loan
router.get("/ngo",          requireRole("ngo"),    ngoLoans);  // NGO views all their loans
router.get("/dashboard",                           userLoans); // lender or borrower views their loans

module.exports = router;