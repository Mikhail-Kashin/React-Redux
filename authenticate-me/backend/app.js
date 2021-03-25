const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const routes = require('./routes');


const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());


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

module.exports = app;
