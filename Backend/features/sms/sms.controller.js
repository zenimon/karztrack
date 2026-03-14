const { parseSMS } = require("./sms.service");
const { createLoan } = require("../loan/loan.service");
const { createRepayment } = require("../repayment/repayment.service");

async function receive(req, res) {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "No message provided" });

    const parsed = parseSMS(message);
    if (!parsed.success) return res.status(422).json({ error: parsed.error });

    if (parsed.type === "loan") {
      const loan = await createLoan({ ...parsed.data, rawSms: message });
      return res.status(201).json({ success: true, type: "loan", loan });
    }

    if (parsed.type === "repayment") {
      const repayment = await createRepayment({ ...parsed.data, rawSms: message });
      return res.status(201).json({ success: true, type: "repayment", repayment });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { receive };