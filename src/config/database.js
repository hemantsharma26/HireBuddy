const mongoose = require("mongoose");
const config = require('./index');
const logger = require("../utils/logger");

const connectDatabase = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(config.database.uri, options);

    logger.info("✅ MongoDB connected successfully");
    logger.info(`📊 Database: ${mongoose.connection.name}`);

    // Handle connection events
    mongoose.connection.on("disconnected", () => {
      logger.warn("⚠️ MongoDB disconnected");
    });

    mongoose.connection.on("error", (err) => {
      logger.error("❌ MongoDB connection error:", err);
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      logger.info("MongoDB connection closed due to app termination");
      process.exit(0);
    });
  } catch (error) {
    logger.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
