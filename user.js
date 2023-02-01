const express = require("express");
const user = express.Router();

user.get('/name', (req, res)=>{
  res.status(200).json({
    FirstName: 'Mahima',
    LastName: 'Hemachandra',
  });
});

module.exports = user;
