var express = require('express');
var router = express.Router();
var passport=require('passport');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/login', passport.authenticate('local',{
  successRedirect:'/paciente',
  failureRedirect:'/login'
}));
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/login');
});
module.exports = router;
