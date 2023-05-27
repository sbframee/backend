const express = require("express");

const router = express.Router();
const Priority = require("../Models/priority");


router.get('/getPriorities', (req, res) => {
  Priority.find({}, { _id: 0, name: 1 })
  .then(priorities => res.json(priorities))
  .catch(error => console.log(error));
  });

  module.exports = router;