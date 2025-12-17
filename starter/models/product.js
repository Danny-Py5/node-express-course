const mongoose = require("mongoose");

// rules and structure of product documents
const productSchema = new mongoose.Schema({
  name: {
    required: [true, "must provide product name"],
    type: String,
  },
  price: {
    required: [true, "product must have a price"],
    type: Number,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
    // enum: ["ikea", "Liddy", "caressa", "marcos"],
  },
});

// middleware for writing to mongoose
const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
