const mongoose = require("mongoose");


const prioritySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  case_type: {
    type: String,
  },
  case_name: {
    type: String,
  },

});


module.exports = mongoose.model("Priority", prioritySchema);