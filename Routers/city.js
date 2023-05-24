const express = require("express");

const router = express.Router();
const City = require("../Models/city");


router.get('/getCities', (req, res) => {
    const { country, state } = req.query;
    City.find({ country, state }, { _id: 0, name: 1 })
      .then(cities => res.json(cities))
      .catch(error => console.log(error));
  });

  module.exports = router;