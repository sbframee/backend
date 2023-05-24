const express = require("express");

const router = express.Router();
const State = require("../Models/state");


router.get('/getStates', (req, res) => {
    const { country } = req.query;
    State.find({ country }, { _id: 0, name: 1 })
      .then(states => res.json(states))
      .catch(error => console.log(error));
  });

  module.exports = router;