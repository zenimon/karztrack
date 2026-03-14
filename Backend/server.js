require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes      = require("./features/auth/auth.routes");
const smsRoutes       = require("./features/sms/sms.routes");
const loanRoutes      = require("./features/loan/loan.routes");
const repaymentRoutes = require("./features/repayment/repayment.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth",       authRoutes);
app.use("/api/sms",        smsRoutes);
app.use("/api/loans",      loanRoutes);
app.use("/api/repayments", repaymentRoutes);

app.get("/api/health", (_, res) => res.json({ status: "ok", app: "KarzTrack v2" }));

const PORT = process.env.PORT || 6000;

connectDB()
  .then(() => app.listen(PORT, () => console.log(`KarzTrack running on :${PORT}`)))
  .catch((err) => { console.error(err); process.exit(1); });