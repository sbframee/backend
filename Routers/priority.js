const express = require("express");

const router = express.Router();
const Priority = require("../Models/priority");


router.get('/getPriorities', (req, res) => {
  Priority.find({}, { _id: 0, name: 1 })
  .then(priorities => res.json(priorities))
  .catch(error => console.log(error));
  });

  router.get('/getCaseType', (req, res) => {
    Priority.find({}, { _id: 0, case_type: 1 })
      .then(priorities => res.json(priorities.map(priority => priority.case_type)))
      .catch(error => console.log(error));
  });

  router.get('/getCaseName', (req, res) => {
    Priority.find({}, { _id: 0, case_name: 1 })
      .then(priorities => res.json(priorities.map(priority => priority.case_name)))
      .catch(error => console.log(error));
  });
  
  

  module.exports = router;