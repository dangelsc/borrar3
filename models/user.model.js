var mongoose = require('mongoose');
const schema = new mongoose.Schema({
    nombre:{type:String,required:[true,'Es necesario']},
    login:{type:String,required:[true,'Es necesario']},
    password:{type:String,required:[true,'Es necesario']},
    estado:Boolean,
    userMod:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
},{
    collection:'user',
    timestamps:true
});
const  model = mongoose.model('user',schema);
module.exports = model;