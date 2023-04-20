// var express = require('express');
import express from 'express';
var router = express.Router();

export const testAPI = router.get("/",function(req,res,next){
    res.set('Content-Type', 'image/jpeg')
    res.send("");
});

// module.exports = router;
