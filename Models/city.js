const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: String,
    state: String,
    country: String,
  },
  {
    timestamps: true,
  }
  );

  module.exports = mongoose.model("City", citySchema);
