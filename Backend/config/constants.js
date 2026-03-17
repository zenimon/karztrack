module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "karztrack_secret",
  JWT_EXPIRES_IN: "7d",
  GENESIS_HASH: "GENESIS",

  RISK: {
    LATE_PAYMENT_PENALTY: 10,      // risk points added for a late payment
    UNDERPAYMENT_PENALTY: 15,      // risk points added if amount paid < expected
    MISSING_PAYMENT_PENALTY: 20,   // risk points added for a missing month
    HIGH_RISK_THRESHOLD: 50,       // score above this = high risk
  },
};