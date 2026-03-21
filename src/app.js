const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const { generalLimiter } = require("./middlewares/rateLimit");
const logger = require("./utils/logger");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

// Basic request logger for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} origin:${req.headers.origin || 'none'}`);
  next();
});

// Security middleware (disabled for local debugging)
// app.use(helmet());

// CORS configuration
app.use(cors());
app.options('*', cors());

// Request logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate limiting
app.use("/api/v1", generalLimiter);

// Swagger API Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "HireBuddy API Docs",
  }),
);

// Serve static files (uploads)
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use("/api/v1", routes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to HireBuddy API",
    version: "1.0.0",
    documentation: "/api-docs",
  });
});

// DEBUG ROUTE
app.get("/debug-route", (req, res) => {
  res.json({ success: true, message: "Debug route reachable" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
    code: "NOT_FOUND",
  });
});

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
