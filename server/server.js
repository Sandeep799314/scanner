/* =========================================
   1. LOAD ENV VARIABLES FIRST
   (इसे सबसे ऊपर रखना ज़रूरी है)
========================================= */
import dotenv from "dotenv";
dotenv.config(); 

/* =========================================
   2. IMPORTS AFTER ENV LOADING
========================================= */
import mongoose from "mongoose";
import app from "./app.js";

/* =========================================
   3. DEBUG LOGS
========================================= */
console.log("✅ Environment Variables Initialized");
console.log("📌 GOOGLE_SHEET_ID:", process.env.GOOGLE_SHEET_ID ? "Found" : "❌ MISSING");
console.log("📌 CLOUDINARY_KEY:", process.env.CLOUDINARY_API_KEY ? "Found" : "❌ MISSING");
console.log("📌 MONGO_URI Exists:", !!process.env.MONGO_URI);

/* =========================================
   4. BASIC CONFIG & ERROR CHECK
========================================= */
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI not defined in .env file");
  process.exit(1);
}

/* =========================================
   5. HANDLE UNCAUGHT EXCEPTIONS
========================================= */
process.on("uncaughtException", (err) => {
  console.error("💥 UNCAUGHT EXCEPTION! Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

/* =========================================
   6. MONGODB CONNECTION
========================================= */
mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      autoIndex: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

/* =========================================
   7. START SERVER
========================================= */
const startServer = async () => {
  // Connect to Database
  await connectDB();

  // Start Express App
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
  });

  /* =========================================
     HANDLE UNHANDLED REJECTIONS
  ========================================= */
  process.on("unhandledRejection", (err) => {
    console.error("💥 UNHANDLED REJECTION! Shutting down...");
    console.error(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });

  /* =========================================
     GRACEFUL SHUTDOWN (CTRL + C)
  ========================================= */
  process.on("SIGINT", async () => {
    console.log("🛑 SIGINT RECEIVED. Graceful Shutdown Initiated.");
    await mongoose.connection.close();
    server.close(() => {
      console.log("🔒 Server and Database connections closed.");
      process.exit(0);
    });
  });
};

startServer();