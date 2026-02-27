import dotenv from "dotenv"
import mongoose from "mongoose"
import app from "./app.js"

/* =========================================
   Load Environment Variables
========================================= */
dotenv.config({ path: "./.env" })

console.log("✅ ENV Loaded")
console.log("📌 GOOGLE_SHEET_ID:", process.env.GOOGLE_SHEET_ID)
console.log("📌 MONGO_URI Exists:", !!process.env.MONGO_URI)

/* =========================================
   Basic Config
========================================= */
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not defined in .env")
  process.exit(1)
}

/* =========================================
   Handle Uncaught Exceptions
========================================= */
process.on("uncaughtException", err => {
  console.error("💥 UNCAUGHT EXCEPTION")
  console.error(err.name, err.message)
  process.exit(1)
})

/* =========================================
   MongoDB Connection
========================================= */
mongoose.set("strictQuery", true)

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      autoIndex: true
    })

    console.log("✅ MongoDB Connected Successfully")
  } catch (error) {
    console.error("❌ MongoDB Connection Failed")
    console.error(error.message)
    process.exit(1)
  }
}

/* =========================================
   Start Server
========================================= */
const startServer = async () => {
  await connectDB()

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
  })

  /* =========================================
     Handle Unhandled Promise Rejections
  ========================================= */
  process.on("unhandledRejection", err => {
    console.error("💥 UNHANDLED REJECTION")
    console.error(err.message)

    server.close(() => {
      process.exit(1)
    })
  })

  /* =========================================
     Graceful Shutdown (CTRL + C)
  ========================================= */
  process.on("SIGINT", async () => {
    console.log("🛑 Graceful Shutdown Initiated")

    await mongoose.connection.close()

    server.close(() => {
      console.log("🔒 Server closed properly")
      process.exit(0)
    })
  })
}

startServer()