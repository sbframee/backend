const mongoose = require("mongoose");

const CustomersSchema = new mongoose.Schema({
  customer_name: {
    type: String,
  },
  customer_gender: {
    type: String,
  },
  customer_uuid: {
    type: String,
  },
  dob: {
    type: String,
  },
  address: {
    type: String,
  },
  mobile: {
    type: Number,
  },
});

module.exports = mongoose.model("customers", CustomersSchema);
