const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  ngoName:           { type: String, required: true },
  borrowerName:      { type: String, required: true },
  lenderName:        { type: String, required: true },
  amount:            { type: Number, required: true },
  interest:          { type: Number, required: true }, // % per annum
  durationMonths:    { type: Number, required: true },
  monthlyPayment:    { type: Number, required: true },
  borrowerConfirmed: { type: Boolean, default: true }, // true on creation (borrower sent the SMS)
  lenderConfirmed:   { type: Boolean, default: false },
  status:            { type: String, enum: ["pending", "verified"], default: "pending" },
  riskScore:         { type: Number, default: 0 },
  hash:              { type: String, required: true },
  previousHash:      { type: String, required: true },
  rawSms:            { type: String },
  createdAt:         { type: Date, default: Date.now },
});

module.exports = mongoose.model("Loan", loanSchema);