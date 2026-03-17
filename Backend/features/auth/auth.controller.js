const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../../config/constants");

function signToken(user) {
  return jwt.sign(
    { userId: user._id, name: user.name, role: user.role, ngoName: user.ngoName },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

async function register(req, res) {
  try {
    const { name, email, password, role, ngoName } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "name, email, password, role are required" });
    }
    if (role === "ngo" && !ngoName) {
      return res.status(400).json({ error: "ngoName is required for NGO accounts" });
    }
    if (await User.findOne({ email })) {
      return res.status(409).json({ error: "Email already registered" });
    }
    const user = await User.create({ name, email, password, role, ngoName });
    res.status(201).json({ token: signToken(user), name: user.name, role: user.role, ngoName: user.ngoName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ token: signToken(user), name: user.name, role: user.role, ngoName: user.ngoName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { register, login };
