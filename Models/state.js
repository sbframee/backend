const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema(
  {
  name: String,
  country: String,
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("State", stateSchema);