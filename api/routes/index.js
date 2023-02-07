// var express = require('express');
import express from 'express';
var router = express.Router();

/* GET home page. */
export const index = router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// module.exports = router;
