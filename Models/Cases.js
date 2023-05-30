const mongoose = require("mongoose");

const CasesSchema = new mongoose.Schema({
  case_uuid: {
    type: String,
  },
  order_id: {
    type: Number,
  },
  customer: {
    type: String,
  },
  priority: {
    type: String,
  },  
});

module.exports = mongoose.model("cases", CasesSchema);
