import mongoose from "mongoose"

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 120,
      index: true
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
      index: true
    },

    phone: {
      type: String,
      trim: true,
      index: true
    },

    company: {
      type: String,
      trim: true,
      maxlength: 150,
      index: true
    },

    designation: {
      type: String,
      trim: true
    },

    website: {
      type: String,
      trim: true
    },

    address: {
      type: String,
      trim: true
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
   Mongoose v7 Safe Version
========================================= */
cardSchema.pre(/^find/, function () {
  this.where({ isDeleted: false })
})

/* =========================================
   Clean JSON Output
========================================= */
cardSchema.methods.toJSON = function () {
  const obj = this.toObject()
  return obj
}

const Card = mongoose.model("Card", cardSchema)

export default Card