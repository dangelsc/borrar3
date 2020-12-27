var mongoose = require('mongoose');
const schema = new mongoose.Schema({
    proveedor:{type:String,required:[true,'Es necesario']},
    fecha:{type:Date,required:[true,'Es necesario']},
    total:{type:Number,required:[true,'Es necesario']},
    estado:Boolean,
    userMod:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    detalle:[
        {
            cant:Number,
            precio:Number,
            producto:{type:mongoose.Schema.Types.ObjectId,ref:'producto'},
            importe:Number
        }
    ]
},{
    collection:'compra',
    timestamps:true
});
const  model = mongoose.model('compra',schema);
module.exports = model;