const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");
require("./config/env");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);
app.use("/api/uploads", express.static(path.join(process.cwd(), "uploads/resumes")));
// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});
module.exports = app;
