const express = require("express");

const router = express.Router();
const Country = require("../Models/country");


router.get('/getCountries', (req, res) => {
  Country.find({}, { _id: 0, name: 1 })
  .then(countries => res.json(countries))
  .catch(error => console.log(error));
  });

  module.exports = router;