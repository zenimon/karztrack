/**
 * Parses two types of SMS messages:
 *
 * LOAN SMS:
 *   "Rahul borrowed 5000 from Amit at 12% for 6 months paying 900/month NGO:HelpTrust"
 *
 * REPAYMENT SMS:
 *   "REPAY LoanID:abc123 Month:3 Amount:900"
 */

function parseLoanSMS(text) {
  const s = text.trim();

  const ngoMatch      = s.match(/NGO:(\S+)/i);
  const interestMatch = s.match(/([\d.]+)\s*%/);
  const durationMatch = s.match(/(\d+)\s*months?/i);
  const monthlyMatch  = s.match(/paying\s+([\d,]+)/i);
  const fromPattern   = s.match(/^([A-Za-z]+)\s+(?:borrowed|took)\s+([\d,]+)\s+from\s+([A-Za-z]+)/i);
  const toPattern     = s.match(/^([A-Za-z]+)\s+owes\s+([\d,]+)\s+to\s+([A-Za-z]+)/i);
  const match         = fromPattern || toPattern;

  const ngoName       = ngoMatch?.[1]    ?? null;
  const interest      = interestMatch    ? parseFloat(interestMatch[1])              : null;
  const durationMonths = durationMatch   ? parseInt(durationMatch[1])                : null;
  const monthlyPayment = monthlyMatch    ? parseFloat(monthlyMatch[1].replace(/,/g, "")) : null;
  const borrowerName  = match?.[1]       ?? null;
  const amount        = match            ? parseFloat(match[2].replace(/,/g, ""))    : null;
  const lenderName    = match?.[3]       ?? null;

  if (!ngoName || !interest || !durationMonths || !monthlyPayment || !borrowerName || !amount || !lenderName) {
    return {
      success: false,
      error: 'Could not parse loan SMS. Expected: "<Borrower> borrowed <amount> from <Lender> at <rate>% for <months> months paying <monthly>/month NGO:<ID>"',
    };
  }

  return { success: true, type: "loan", data: { ngoName, borrowerName, lenderName, amount, interest, durationMonths, monthlyPayment } };
}

function parseRepaySMS(text) {
  const s = text.trim();

  const loanIdMatch = s.match(/LoanID:(\S+)/i);
  const monthMatch  = s.match(/Month:(\d+)/i);
  const amountMatch = s.match(/Amount:([\d,]+)/i);

  const loanId     = loanIdMatch?.[1] ?? null;
  const month      = monthMatch  ? parseInt(monthMatch[1])                    : null;
  const amountPaid = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, "")) : null;

  if (!loanId || !month || !amountPaid) {
    return {
      success: false,
      error: 'Could not parse repayment SMS. Expected: "REPAY LoanID:<id> Month:<n> Amount:<amount>"',
    };
  }

  return { success: true, type: "repayment", data: { loanId, month, amountPaid } };
}

function parseSMS(text) {
  const upper = text.trim().toUpperCase();
  if (upper.startsWith("REPAY")) return parseRepaySMS(text);
  return parseLoanSMS(text);
}

module.exports = { parseSMS };