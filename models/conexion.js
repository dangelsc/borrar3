const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/consultorio',{useNewUrlParser:true});
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error')) ;
db.once('open',()=>{
    console.log('db esta bien');
})
mongoose.set('debug', true);
module.exports  = mongoose;