const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const secret = process.env.JWT_SECRET || "karztrack_secret";
    console.log("VERIFYING WITH SECRET:", secret);
    console.log("TOKEN:", token.substring(0, 20) + "...");
    req.user = jwt.verify(token, secret);
    console.log("USER:", req.user);
    next();
  } catch (err) {
    console.error("JWT ERROR:", err.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

function requireRole(...roles) {
  return function(req, res, next) {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access restricted to: " + roles.join(", ") });
    }
    next();
  };
}

module.exports = { authMiddleware, requireRole };
