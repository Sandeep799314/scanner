import mongoose from "mongoose"

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 120,
      index: true,
      default: ""
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      // 🔥 match को हटा दिया गया है क्योंकि OCR कई बार अधूरा ईमेल निकालता है 
      // जिससे "Invalid email format" एरर आता था।
      index: true,
      default: ""
    },

    phone: {
      type: String,
      trim: true,
      index: true,
      default: ""
    },

    company: {
      type: String,
      trim: true,
      maxlength: 150,
      index: true,
      default: ""
    },

    designation: {
      type: String,
      trim: true,
      default: ""
    },

    website: {
      type: String,
      trim: true,
      default: ""
    },

    address: {
      type: String,
      trim: true,
      default: ""
    },

    imageUrl: {
      type: String,
      required: true
    },

    rawText: {
      type: String
    },

    source: {
      type: String,
      enum: ["upload", "manual", "import", "api"],
      default: "upload"
    },

    tags: [
      {
        type: String,
        trim: true
      }
    ],

    isDeleted: {
      type: Boolean,
      default: false,
      index: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

/* =========================================
   Text Index (For Search Optimization)
========================================= */
cardSchema.index({
  name: "text",
  email: "text",
  company: "text",
  phone: "text"
})

/* =========================================
   Virtual Field: Clean Phone Number
========================================= */
cardSchema.virtual("cleanPhone").get(function () {
  if (!this.phone) return ""
  return this.phone.replace(/\D/g, "")
})

/* =========================================
   Global Query Filter (Soft Delete Support)
========================================= */
cardSchema.pre(/^find/, function () {
  this.where({ isDeleted: false })
})

const Card = mongoose.model("Card", cardSchema)

export default Card