const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");
const Cases = require("../Models/Cases");
const Firms = require("../Models/Firms");
const Customers = require("../Models/Customers");


router.post('/postCase',  async (req, res) => {
  try {
    let value = req.body;
    if (!value) res.json({ success: false, message: "Invalid Data" });
    value = { ...value, case_uuid: uuid() };

    let response = await Cases.create(value);
    if (response) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Cases Not created" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

router.get("/GetCaseList", async (req, res) => {
  try {
    let data = await Cases.find({});

    if (data.length)
      res.json({ success: true, result: data.filter((a) => a.order_id) });
    else res.json({ success: false, message: "Name Not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

router.get("/latest", async (req, res) => {
  try {
    const latestOrder = await Cases.findOne().sort({ order_id: -1 }).limit(1);
    if (!latestOrder) {
      // No orders found
      return res.status(404).json({ error: "No orders found." });
    }

    res.json({ latestOrderID: latestOrder.order_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
});

router.get('/GetCaseDetails/:selectedOrderId', async (req, res) => {
  const selectedOrderId = req.params.selectedOrderId;

  try {
    // Fetch the case details from the database based on the selectedOrderId
    const caseDetails = await Cases.findOne({ order_id: selectedOrderId }).exec();

    if (!caseDetails) {
      return res.status(404).json({ error: 'Case details not found' });
    }

    // Fetch the customer details based on the retrieved customer_uuid
    const customerDetails = await Customers.findOne({ customer_uuid: caseDetails.customer_uuid }).exec();

    if (!customerDetails) {
      return res.status(404).json({ error: 'Customer details not found' });
    }

    // Include the customer_uuid and other case details in the response
    const response = {
      order_id: caseDetails.order_id,
      customer_uuid: caseDetails.customer_uuid,
      customer_name: customerDetails.customer_name,
      mobile: customerDetails.mobile,
      // Include other case details as needed
    };

    // Send the case details as the response
    res.json({ result: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put("/putCases/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { case_type, case_name } = req.body;
    
    if (!case_type || !case_name) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }
    
    const response = await Cases.updateOne(
      { order_id: orderId },
      { $set: { case_type, case_name } }
    );
    
    if (response.nModified === 1) {
      res.json({ success: true, message: "Case updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Case not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update case", error: err.message });
  }
});



module.exports = router;
