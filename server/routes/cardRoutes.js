import express from "express";
import rateLimit from "express-rate-limit";

import uploadMiddleware from "../middleware/uploadMiddleware.js";

import {
  uploadCard,
  getAllCards,
  updateCard,
  deleteCard
} from "../controllers/cardController.js";

const router = express.Router();

/* =========================================
   Upload Specific Rate Limiter
========================================= */
const uploadLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many upload attempts. Please try again later."
  }
});

/* =========================================
   Routes
========================================= */

/**
 * @route   POST /api/cards/upload
 * @desc    Upload & Scan Multiple Business Cards
 */
router.post(
  "/upload",
  uploadLimiter,
  uploadMiddleware.array("cards", 10),   // ✅ MULTIPLE FILE SUPPORT
  uploadCard
);

/**
 * @route   GET /api/cards
 */
router.get("/", getAllCards);

/**
 * @route   PUT /api/cards/:id
 */
router.put("/:id", updateCard);

/**
 * @route   DELETE /api/cards/:id
 */
router.delete("/:id", deleteCard);

export default router;