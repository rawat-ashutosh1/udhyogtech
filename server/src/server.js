const app = require("./app");
const pool = require("./config/database");
const { PORT } = require("./config/env");
(async () => {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log("✅ MySQL connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB connection failed", err);
  }
})();
