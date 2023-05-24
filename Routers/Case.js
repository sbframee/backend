const express = require("express");
const multer = require('multer');
const router = express.Router();
const { v4: uuid } = require("uuid");
const Cases = require("../Models/Cases");
const Firms = require("../Models/Firms");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Updated destination path
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = file.originalname.split('.').pop();
    const filename = `${uniqueSuffix}.${extension}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.post('/postCase', upload.single('image'), async (req, res) => {
  try {
    const value = req.body;
    if (!value) {
      res.json({ success: false, message: 'Invalid Data' });
      return;
    }

    const case_uuid = uuid();
    const created_at = new Date().getTime();
    const image = req.file ? req.file.filename : null;

    // TODO: Replace `Firms` with your actual model for firms
    const firmData = await Firms.findOne({ firm_uuid: value.firm_uuid });
    let case_number = 1;

    if (firmData) {
      case_number = firmData.next_case_number;
      await Firms.updateOne(
        { firm_uuid: value.firm_uuid },
        { $inc: { next_case_number: 1 } }
      );
    }

    const stage = [
      {
        stage_number: value.current_stage,
        timestamp: created_at,
        user_uuid: value.created_by,
      },
    ];

    const newCase = new Cases({
      ...value,
      case_uuid,
      image,
      created_at,
      case_number,
      stage,
    });

    await newCase.save();
    res.json({ success: true, result: newCase });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

router.get("/GetCaseList", async (req, res) => {
  try {
    let data = await Cases.find({});

    if (data.length)
      res.json({ success: true, result: data.filter((a) => a.name) });
    else res.json({ success: false, message: "Name Not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});


module.exports = router;
