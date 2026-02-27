import fs from "fs";
import path from "path";

import Card from "../models/Card.js";
import ocrService from "../services/ocrService.js";
import generateWhatsappLink from "../utils/generateWhatsappLink.js";
import appendToSheet from "../services/googleSheetService.js";

/* =========================================
   Upload & Process Card
========================================= */
export const uploadCard = async (req, res, next) => {
  try {
    const files =
      req.files && req.files.length > 0
        ? req.files
        : req.file
        ? [req.file]
        : [];

    if (files.length === 0) {
      const error = new Error("No image uploaded");
      error.statusCode = 400;
      throw error;
    }

    const processedCards = [];

    for (const file of files) {
      const imagePath = file.path;

      /* OCR */
      const extractedData = await ocrService(imagePath);

      if (!extractedData || !extractedData.rawText) {
        continue;
      }

      console.log("📄 Extracted:", extractedData);

      /* Duplicate Check */
      let existing = null;

      if (extractedData.email || extractedData.phone) {
        existing = await Card.findOne({
          $or: [
            extractedData.email
              ? { email: extractedData.email }
              : null,
            extractedData.phone
              ? { phone: extractedData.phone }
              : null,
          ].filter(Boolean),
        });
      }

      let savedCard;

      if (existing) {
        savedCard = existing;
      } else {
        savedCard = await Card.create({
          ...extractedData,
          imageUrl: `/uploads/${path.basename(imagePath)}`,
        });

        console.log("✅ Saved in MongoDB");
      }

      /* ✅ FULL DETAILS WHATSAPP LINK */
      const whatsappLink = generateWhatsappLink(savedCard);

      /* Google Sheet Sync */
      try {
        await appendToSheet({
          ...savedCard.toObject(),
          whatsappLink,
        });
        console.log("✅ Sheet Sync Completed");
      } catch (sheetError) {
        console.error("❌ Sheet Error:", sheetError.message);
      }

      processedCards.push({
        ...savedCard.toObject(),
        whatsappLink,
      });

      /* Delete uploaded image */
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    if (processedCards.length === 1) {
      return res.status(201).json({
        success: true,
        message: "Card processed successfully",
        data: processedCards[0],
        whatsappLink: processedCards[0].whatsappLink,
      });
    }

    res.status(201).json({
      success: true,
      message: "Cards processed successfully",
      count: processedCards.length,
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
      message: "Card updated successfully",
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
    const card = await Card.findById(req.params.id);

    if (!card) {
      const error = new Error("Card not found");
      error.statusCode = 404;
      throw error;
    }

    card.isDeleted = true;
    await card.save();

    res.status(200).json({
      success: true,
      message: "Card deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};