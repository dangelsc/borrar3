var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var mongoose = require('./models/conexion');

var User=require('./models/user.model.js');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var compraRouter = require('./routes/compra');
var pacienteRouter = require('./routes/paciente');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs',require('ejs-locals'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'juan*-*/AasdasAJHKJasdasdas+',
  saveUninitialized:true,
  resave:true
}));

var passport=require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username,password,done){
    console.log('llego aqui',username,password);
    User.findOne({login:username},(err,user)=>{
      if(err)return done(err);
      console.log('llego aqui',err);
      if(!user)return done(null,false);
      /*var salt = bcrypt.genSaltSync(10);
      hash = bcrypt.hashSync(password, salt);
      console.log("password encrypt");
      console.log(hash);*/

      if(!bcrypt.compareSync(password,user.password))
        return done(null,false);
      return done(null,user);
    })
  }
));
passport.serializeUser((user,done)=>{
  done(null,user._id);
})
passport.deserializeUser((id,done)=>{
  User.findById(id,(err,user)=>{
    done(null,user)
  })
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/paciente',pacienteRouter);
app.use('/compra',compraRouter);


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

module.exports = app;
