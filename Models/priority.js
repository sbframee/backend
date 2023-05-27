const mongoose = require("mongoose");


const prioritySchema = new mongoose.Schema(
  {
  name: String,
},
{
  timestamps: true,
}
);


module.exports = mongoose.model("Priority", prioritySchema);