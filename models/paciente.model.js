var mongoose = require('mongoose');
const schema = new mongoose.Schema({
    nombre:{type:String,required:[true,'Es necesario']},
    apellidos:{type:String,required:[true,'Es necesario']},
    ci:{type:String,required:[true,'Es necesario']},
    fechaNac:{type:Date,required:[true,'Es necesario']},
    estado:Boolean,
    userMod:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    historial:[
        {
            fecha:Date,
            diagnostico:String,
            tratamiento:String,
            peso:Number
        }
    ]
},{
    collection:'paciente',
    timestamps:true
});
const  model = mongoose.model('paciente',schema);
module.exports = model;