var Compra = require('../models/compra.model');
var Producto = require('../models/producto.model');
var tabla='compra';
index = function(req,res,next){
    Compra.find({estado:1},(err,lista)=>{
        if(err)
            return res.render('./'+tabla+'/index',{lista:[],error:err});
        return res.render('./'+tabla+'/index',{lista:lista,error:null});
    })
}
nuevo = async function(req,res,next){
    let aux= new Compra();
    aux._id=null;
    aux.error=null;
    try{
        aux.productos= await Producto.find({estado:1});
    }catch(err){
        aux.productos=[];
    }
    console.log(aux.productos);
    //aux.nombre=aux.apellidos=aux.ci='';
    return res.render('./'+tabla+'/form',aux);
}
nuevoPost=function(req,res,next){
    let nuevo = new Compra(req.body);
    nuevo.estado=1;
    nuevo.userMod=req.user._id;
    ////???????
    nuevo.save((err,dato)=>{
        if(err)
        {
            nuevo.error=err;
            nuevo._id=null;
            res.render('./'+tabla+'/form',nuevo);
        }
        if(dato)
            return res.redirect('/'+tabla);
        else{
            nuevo.error='Paso algo';
            res.render('./'+tabla+'/form',nuevo);
        }
            
    });
}
module.exports = {
    index:index,
    nuevo:nuevo,
    nuevoPost:nuevoPost,
 
}