var express = require('express');
var router =  express.Router();
var control = require('../controllers/compra.controller');
var acceso =require('../middleware/acceso');
router.get('/',acceso,control.index);
router.get('/nuevo',acceso,control.nuevo);
router.post('/nuevo',acceso,control.nuevoPost);
module.exports = router;