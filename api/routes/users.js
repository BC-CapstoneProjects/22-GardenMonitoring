// var express = require('express');
import express from 'express';
var router = express.Router();

/* GET users listing. */
export const users = router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// module.exports = router;