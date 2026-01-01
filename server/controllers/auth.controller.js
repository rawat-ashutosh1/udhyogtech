const pool = require("../src/config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../src/config/env");
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email=? AND is_active=1",
    [email]
  );
  if (!rows.length)
    return res.status(401).json({ message: "Invalid credentials" });
  const user = rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
    },
  });
};
