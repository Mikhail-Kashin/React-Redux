const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');
const bodyParser = require("body-parser");


const routes = require('./routes');


const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//turning on cors only if in dev.
if(!isProduction){
  app.use(cors());
}
//disabling contentSecurity but keeping other feautures.
app.use(helmet({
  contentSecurityPolicy: false
}));
//setting csurf to use cookies.
app.use(csurf({cookie: {secure: isProduction, sameSite: isProduction && "Lax", httpOnly: true} }));
app.use(routes);


//The "catch all" for unhandled requests, then forwards it to handler.
app.use((_req, _res, next) => {
  const err = new Error('The requested resource(s) couldn\'t be found.');
  err.title = 'Resource Not Found';
  err.errors = ['The requested resource(s) couldn\'t be found.'];
  err.status = 404;
  next(err);
});

//Sequelize error handler
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

// Formates all errors before returning a JSON with messages.
// Also makes sure to send it only if not in production else NULL
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});




module.exports = app;
