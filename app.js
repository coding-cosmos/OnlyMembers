import pkg from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

import passportConfig from './config/passport.js';

const {createHttpError:createError} = pkg;
const __dirname = import.meta.dirname;

const app = express();
dotenv.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Auth Setup
app.use(session({secret:process.env.SECRET,resave:false,saveUninitialized:false}));
app.use(passport.session());
passportConfig(passport);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

export default app;
