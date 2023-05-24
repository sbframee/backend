const mongoose = require("mongoose");

const CasesSchema = new mongoose.Schema({
  case_uuid: {
    type: String,
  },
  name: {
    type: String,
  },
  mobileno: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  image: {
    type: String,
  },
  created_by: {
    type: String,
  },
  created_at: {
    type: Number,
  },
 firm_uuid: {
    type: String,
  },
  current_stage: {
    type: Number,
  },
  stage: {
    type: String,
  },
  case_number: {
    type: Number,
  },
  stage: [
    {
      stage_number: {
        type: Number,
      },
      timestamp: {
        type: Number,
      },
      user_uuid: {
        type: String,
      },
    },
  ],
  
});

module.exports = mongoose.model("cases", CasesSchema);
