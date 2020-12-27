var mongoose = require('mongoose');
const schema = new mongoose.Schema({
    nombre:{type:String,required:[true,'Es necesario']},
    precio:{type:String,required:[true,'Es necesario']},
    cantidad:{type:String,required:[true,'Es necesario']},
    estado:Boolean,
    userMod:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
},{
    collection:'producto',
    timestamps:true
});
const  model = mongoose.model('producto',schema);
module.exports = model;