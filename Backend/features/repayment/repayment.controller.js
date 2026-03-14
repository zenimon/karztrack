const { confirmRepayment } = require("./repayment.service");

async function confirm(req, res) {
  try {
    const repayment = await confirmRepayment(req.params.id);
    res.json({ success: true, repayment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { confirm };
