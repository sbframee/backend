const mongoose = require("mongoose");

const CasesSchema = new mongoose.Schema({
  order_id: {
    type: String,
  },
  customer: {
    type: String,
  },
  priority: {
    type: String,
  },  
});

module.exports = mongoose.model("cases", CasesSchema);
