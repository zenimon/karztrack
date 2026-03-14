const CryptoJS = require("crypto-js");
const { GENESIS_HASH, RISK } = require("../config/constants");

// ─── Hash Generation ──────────────────────────────────────────────────────────

/**
 * Generates a SHA256 hash chained to the previous loan hash.
 * hash = SHA256(previousHash + loanData)
 */
function computeHash(loanData, previousHash) {
  const payload = previousHash + JSON.stringify(loanData);
  return CryptoJS.SHA256(payload).toString(CryptoJS.enc.Hex);
}

/**
 * Gets the hash of the last loan for an NGO, or GENESIS if none exists.
 */
async function getPreviousHash(LoanModel, ngoName) {
  const last = await LoanModel.findOne({ ngoName }).sort({ createdAt: -1 });
  return last ? last.hash : GENESIS_HASH;
}

// ─── Risk Scoring ─────────────────────────────────────────────────────────────

/**
 * Recalculates the risk score for a loan based on its repayment history.
 * Called after each repayment is confirmed.
 *
 * Rules:
 * - Underpayment (paid < expected): +15 points
 * - Late payment (confirmed late): +10 points
 * - Missing month (no repayment for that month): +20 points
 */
async function calculateRiskScore(loan, RepaymentModel) {
  const repayments = await RepaymentModel.find({
    loanId: loan._id,
    lenderConfirmed: true,
  });

  let score = 0;
  const paidMonths = new Set();

  for (const r of repayments) {
    paidMonths.add(r.month);

    // Underpayment check
    if (r.amountPaid < loan.monthlyPayment) {
      score += RISK.UNDERPAYMENT_PENALTY;
    }
  }

  // Missing months check — any month up to current with no verified repayment
  const currentMonth = Math.min(
    Math.ceil(
      (Date.now() - new Date(loan.createdAt).getTime()) /
        (1000 * 60 * 60 * 24 * 30)
    ),
    loan.durationMonths
  );

  for (let m = 1; m <= currentMonth; m++) {
    if (!paidMonths.has(m)) {
      score += RISK.MISSING_PAYMENT_PENALTY;
    }
  }

  return score;
}

module.exports = { computeHash, getPreviousHash, calculateRiskScore };