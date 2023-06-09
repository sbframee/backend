const mongoose = require("mongoose");

const CasesSchema = new mongoose.Schema({
  case_uuid: {
    type: String,
  },
  order_id: {
    type: Number,
  },
  customer_uuid: {
    type: String,
  },
  priority: {
    type: String,
  },  
  case_type: {
    type: String,
  },
  case_name: {
    type: String,
  }
});

module.exports = mongoose.model("cases", CasesSchema);
