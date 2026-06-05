const express = require("express");
const corsDetail = require("./config/cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const workspaceRoutes = require("./routes/workspace.routes");
const { errorHandler } = require("./middlewares/errorHandler");
const app = express();
app.use(corsDetail);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/health", (req, res) => res.json({ message: "Server is healthy" }));
app.use("/api/auth", authRoutes);
app.use("/api/workspaces",workspaceRoutes);
app.use(errorHandler);

module.exports = app;
