const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");
const Cases = require("../Models/Cases");
const Firms = require("../Models/Firms");


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


module.exports = router;
