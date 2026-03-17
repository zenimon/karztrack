const Repayment = require("../../models/repayment.model");
const Loan = require("../../models/loan.model");
const { calculateRiskScore } = require("../../shared");

/**
 * Creates a repayment record from borrower's SMS.
 * borrowerConfirmed = true, lenderConfirmed = false, status = "pending"
 */
async function createRepayment({ loanId, month, amountPaid }) {
  const loan = await Loan.findById(loanId);
  if (!loan) throw new Error("Loan not found");
  if (loan.status !== "verified") throw new Error("Loan must be verified before recording repayments");

  // Prevent duplicate repayment for same month
  const existing = await Repayment.findOne({ loanId, month });
  if (existing) throw new Error(`Repayment for month ${month} already exists`);

  const repayment = await Repayment.create({
    loanId,
    month,
    amountPaid,
    borrowerConfirmed: true,
    lenderConfirmed: false,
    status: "pending",
  });

  return repayment;
}

/**
 * Lender confirms a repayment → status becomes "verified".
 * Risk score is recalculated after confirmation.
 */
async function confirmRepayment(repaymentId) {
  const repayment = await Repayment.findById(repaymentId);
  if (!repayment) throw new Error("Repayment not found");
  if (repayment.lenderConfirmed) throw new Error("Repayment already confirmed");

  repayment.lenderConfirmed = true;
  repayment.status = "verified";
  await repayment.save();

  // Recalculate risk score on the parent loan
  const loan = await Loan.findById(repayment.loanId);
  loan.riskScore = await calculateRiskScore(loan, Repayment);
  await loan.save();

  return repayment;
}

module.exports = { createRepayment, confirmRepayment };