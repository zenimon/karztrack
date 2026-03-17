const mongoose = require("mongoose");

const repaymentSchema = new mongoose.Schema({
  loanId:            { type: mongoose.Schema.Types.ObjectId, ref: "Loan", required: true },
  month:             { type: Number, required: true }, // e.g. 1, 2, 3 ... durationMonths
  amountPaid:        { type: Number, required: true },
  borrowerConfirmed: { type: Boolean, default: true }, // true on creation (borrower sent SMS)
  lenderConfirmed:   { type: Boolean, default: false },
  status:            { type: String, enum: ["pending", "verified"], default: "pending" },
  createdAt:         { type: Date, default: Date.now },
});

module.exports = mongoose.model("Repayment", repaymentSchema);