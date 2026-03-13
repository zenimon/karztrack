const Loan = require("../../models/loan.model");
const { computeHash, getPreviousHash } = require("../../shared");

/**
 * Creates a new loan record with:
 * - borrowerConfirmed = true (borrower sent the SMS)
 * - lenderConfirmed = false (lender must confirm via dashboard)
 * - status = "pending"
 * - hash chained to previous loan in same NGO
 */
async function createLoan({ ngoName, borrowerName, lenderName, amount, interest, durationMonths, monthlyPayment, rawSms }) {
  const previousHash = await getPreviousHash(Loan, ngoName);
  const loanData     = { ngoName, borrowerName, lenderName, amount, interest, durationMonths, monthlyPayment };
  const hash         = computeHash(loanData, previousHash);

  const loan = await Loan.create({
    ngoName,
    borrowerName,
    lenderName,
    amount,
    interest,
    durationMonths,
    monthlyPayment,
    borrowerConfirmed: true,
    lenderConfirmed: false,
    status: "pending",
    hash,
    previousHash,
    rawSms,
  });

  return loan;
}

/**
 * Lender confirms the loan → status becomes "verified"
 */
async function confirmLoan(loanId) {
  const loan = await Loan.findById(loanId);
  if (!loan) throw new Error("Loan not found");
  if (loan.lenderConfirmed) throw new Error("Loan already confirmed");

  loan.lenderConfirmed = true;
  loan.status = "verified";
  await loan.save();

  return loan;
}

/**
 * Returns all loans for a given NGO, with repayment counts.
 */
async function getLoansByNgo(ngoName) {
  return Loan.find({ ngoName }).sort({ createdAt: -1 });
}

/**
 * Returns all loans where the lender name matches — for lender dashboard.
 */
async function getLoansByLender(lenderName) {
  return Loan.find({ lenderName }).sort({ createdAt: -1 });
}

/**
 * Returns all loans where the borrower name matches — for borrower dashboard.
 */
async function getLoansByBorrower(borrowerName) {
  return Loan.find({ borrowerName }).sort({ createdAt: -1 });
}

module.exports = { createLoan, confirmLoan, getLoansByNgo, getLoansByLender, getLoansByBorrower };