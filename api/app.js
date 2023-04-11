// var createError = require('http-errors');
import createError from 'http-errors';
// var express = require('express');
import express from 'express';
// var path = require('path');
import path from 'path';
// var cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser';
// var logger = require('morgan');
import logger from 'morgan';
// var cors = require('cors');
import cors from 'cors';


//define routers
// var indexRouter = require('./routes/index');
import { index } from './routes/index.js';
// var usersRouter = require('./routes/users');
import { users } from './routes/users.js';
// testAPIRouter = require('./routes/testAPI');
import { testAPI } from './routes/testAPI.js';
// testGetImage = require('./routes/getImage');
import { getImage } from './routes/getImage.js';
// var publicDir = require('path').join(__dirname,'/public');
// import publicDir from "./public";
import { getScans } from './routes/getScans.js';
import { getPlantJson } from './routes/getPlantJson.js';


//define cronjobs
import { initScheduledJobs } from './scheduledFunctions/initScheduledJobs.js';

var app = express();

// Call scheduled job functions
initScheduledJobs();

// view engine setup
app.set('views', './views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./public'));

// route endpoints
app.use('/', index);
app.use('/users', users);
app.use('/testAPI', testAPI);
app.use('/getImage', getImage);
app.use("/getScans", getScans);
app.use('/getPlantJson', getPlantJson);

// app.use(express.static('./public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
export default app;