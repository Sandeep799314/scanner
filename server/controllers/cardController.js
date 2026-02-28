import fs from "fs";
import path from "path";
import { v2 as cloudinary } from 'cloudinary';

import Card from "../models/Card.js";
import ocrService from "../services/ocrService.js";
import generateWhatsappLink from "../utils/generateWhatsappLink.js";
import appendToSheet from "../services/googleSheetService.js";

/* =========================================
   Upload & Process Multiple Cards
========================================= */
export const uploadCard = async (req, res, next) => {
  
  /* =========================================
     🔥 CLOUDINARY DYNAMIC CONFIGURATION
     इसे फंक्शन के अंदर रखने से 'api_key' एरर खत्म हो जाएगा
  ========================================= */
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  // Debug: चेक करने के लिए कि क्या कीज फंक्शन के अंदर मिल रही हैं
  console.log("🔍 Checking Keys inside uploadCard:", process.env.CLOUDINARY_API_KEY ? "✅ KEY FOUND" : "❌ KEY NOT FOUND");

  try {
    const files = req.files || [];

    if (files.length === 0) {
      const error = new Error("No image uploaded");
      error.statusCode = 400;
      throw error;
    }

    const processedCards = [];

    for (const file of files) {
      const imagePath = file.path;

      try {
        /* ===============================
           1. OCR PROCESSING
        =============================== */
        const extractedData = await ocrService(imagePath);

        if (!extractedData || !extractedData.rawText) {
          if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
          continue;
        }

        /* ===============================
           2. UPLOAD TO CLOUDINARY
        =============================== */
        console.log("📤 Uploading to Cloudinary...");
        const uploadResponse = await cloudinary.uploader.upload(imagePath, {
          folder: "card_scanner_uploads",
        });
        
        const publicImageUrl = uploadResponse.secure_url;
        console.log("✅ Cloudinary URL:", publicImageUrl);

        /* ===============================
           3. DUPLICATE CHECK & SAVE
        =============================== */
        let existing = null;
        if (extractedData.email || extractedData.phone) {
          existing = await Card.findOne({
            $or: [
              extractedData.email ? { email: extractedData.email } : null,
              extractedData.phone ? { phone: extractedData.phone } : null,
            ].filter(Boolean),
          });
        }

        let savedCard;
        if (existing) {
          savedCard = existing;
          savedCard.imageUrl = publicImageUrl;
          await savedCard.save();
        } else {
          savedCard = await Card.create({
            ...extractedData,
            imageUrl: publicImageUrl, 
          });
          console.log("✅ Saved in MongoDB");
        }

        /* ===============================
           4. GENERATE WHATSAPP LINK & SHEET SYNC
        =============================== */
        const whatsappLink = generateWhatsappLink(savedCard);

        try {
          // यहाँ हम imageUrl भी भेज रहे हैं ताकि शीट में इमेज दिखे
          await appendToSheet({
            ...savedCard.toObject(),
            whatsappLink,
            imageUrl: publicImageUrl 
          });
          console.log("✅ Google Sheet Sync Completed");
        } catch (sheetError) {
          console.error("❌ Sheet Error:", sheetError.message);
        }

        processedCards.push({
          ...savedCard.toObject(),
          whatsappLink,
        });

      } catch (processingError) {
        console.error("❌ Processing Error:", processingError.message);
      }

      /* ===============================
         DELETE LOCAL UPLOADED IMAGE
      =============================== */
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    /* ===============================
       RESPONSE HANDLING
    =============================== */
    return res.status(201).json({
      success: true,
      message: "Processing completed",
      data: processedCards,
    });

  } catch (error) {
    console.error("❌ Upload Error:", error.message);
    next(error);
  }
};


/* =========================================
   Get All Cards (Soft Delete Safe)
========================================= */
export const getAllCards = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const skip = (page - 1) * limit;

    const query = {
      isDeleted: { $ne: true },
      ...(search && { $text: { $search: search } }),
    };

    const [cards, total] = await Promise.all([
      Card.find(query)
        .sort({ createdAt: -1 })
        .skip(Number(skip))
        .limit(Number(limit)),
      Card.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
      data: cards,
    });
  } catch (error) {
    next(error);
  }
};


/* =========================================
   Update Card
========================================= */
export const updateCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      const error = new Error("Card not found");
      error.statusCode = 404;
      throw error;
    }

    Object.assign(card, req.body);
    const updated = await card.save();

    res.status(200).json({
      success: true,
      data: updated,
      whatsappLink: generateWhatsappLink(updated),
    });
  } catch (error) {
    next(error);
  }
};


/* =========================================
   Soft Delete Card
========================================= */
export const deleteCard = async (req, res, next) => {
  try {
    await Card.findByIdAndUpdate(req.params.id, { isDeleted: true });
    res.status(200).json({
      success: true,
      message: "Card deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};