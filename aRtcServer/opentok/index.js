'use strict';

var express = require('express');
var router = express.Router();
var OpenTok = require('opentok');

var opentok = new OpenTok(API_KEY, API_SECRET);


router.get('/rtc', function(req, res) {
  
});

router.get('/token', function(req, res) {
  

  res.send('About birds');
});

module.exports = router;