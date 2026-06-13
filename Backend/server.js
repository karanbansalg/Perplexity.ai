import dotenv from "dotenv/config"
import app from "./src/app.js";
import { connectDB } from "./src/config/database.js";
import http from 'http'
import { initSocket } from "./src/sockets/server.socket.js";
// Load environment variables


const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app)

initSocket(httpServer)

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/perplexity";

// Connect to database and start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB(MONGODB_URI);
    console.log("✓ Database connected successfully");

    // Start Express server
    httpServer.listen(PORT, () => {
      console.log(`✓ Server is running on port ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("✗ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("✗ Unhandled Rejection:", err);
  process.exit(1);
});
