const { confirmLoan, getLoansByNgo, getLoansByLender, getLoansByBorrower } = require("./loan.service");
const Repayment = require("../../models/repayment.model");

async function confirm(req, res) {
  try {
    const loan = await confirmLoan(req.params.id);
    res.json({ success: true, loan });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function ngoLoans(req, res) {
  try {
    const loans = await getLoansByNgo(req.user.ngoName);
    const loansWithRepayments = await Promise.all(
      loans.map(async (loan) => {
        const repayments = await Repayment.find({ loanId: loan._id }).sort({ month: 1 });
        return { ...loan.toObject(), repayments };
      })
    );
    res.json(loansWithRepayments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function userLoans(req, res) {
  try {
    let loans = [];
    if (req.user.role === "lender") {
      loans = await getLoansByLender(req.user.name);
    } else if (req.user.role === "borrower") {
      loans = await getLoansByBorrower(req.user.name);
    } else {
      return res.status(403).json({ error: "Use /ngo endpoint for NGO accounts" });
    }
    const loansWithRepayments = await Promise.all(
      loans.map(async (loan) => {
        const repayments = await Repayment.find({ loanId: loan._id }).sort({ month: 1 });
        return { ...loan.toObject(), repayments };
      })
    );
    res.json(loansWithRepayments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { confirm, ngoLoans, userLoans };
