var Paciente = require('../models/paciente.model');
var tabla='paciente';
index = function(req,res,next){
    Paciente.find({estado:1},(err,lista)=>{
        if(err)
            return res.render('./'+tabla+'/index',{lista:[],error:err});
        return res.render('./'+tabla+'/index',{lista:lista,error:null});
    })
}
nuevo = function(req,res,next){
    let aux= new Paciente();
    aux._id=null;
    aux.error=null;
    aux.nombre=aux.apellidos=aux.ci='';
    return res.render('./'+tabla+'/form',aux);
}
nuevoPost=function(req,res,next){
    let nuevo = new Paciente(req.body);
    nuevo.estado=1;
    nuevo.userMod=req.user._id;
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
edit= function(req,res,next){
    Paciente.findById(req.params.id,(err,dato)=>{
        if(err)
            return res.redirect('/'+tabla);
        else{
            dato.error=null;
            res.render('./'+tabla+'/form',dato);
        }
    })
}
editPost =function(req,res,next){
    let validar=new Paciente(req.body);
    if(err=validar.validateSync()){
        validar._id=null;
        validar.error=err;
        return res.render('./'+tabla+'/form',validar);
    }
    req.body.userMod=req.user._id;
    Paciente.findByIdAndUpdate(req.params.id,req.body,(err,dato)=>{
        if(err){
            req.body.error=err;
            req.body._id=req.params.id;
            res.render('./'+tabla+'/form',req.body);
        }
        return res.redirect('/'+tabla);
    })
}
borrar= function(req,res){
    
    Paciente.findByIdAndUpdate(req.params.id,
        {userMod:req.user._id,estado:0},(err,dato)=>{
        if(err){
            req.body.error=err;
           
            return res.redirect('/'+tabla);
        }
        return res.redirect('/'+tabla);
    })
}
atenderForm=function(req,res){
    Paciente.findById(req.params.id,(err,dato)=>{
        if(err)
            return res.redirect('/'+tabla);
        else{
            dato.error=null;
            res.render('./'+tabla+'/atenderFrom',dato);
        }
    })
}
atender=function(req,res){
    console.log(req.body);
    Paciente.findById(req.params.id,(err,dato)=>{
        if(err)
            return res.render('./'+tabla+'/atenderFrom',dato);
        else{
            /*historial:[
        {
            fecha:Date,
            diagnostico:String,
            tratamiento:String,
            peso:Number
        }*/
            
            dato.historial.push({fecha:new Date(),
                diagnostico:req.body.diagnostico,
                tratamiento:req.body.tratamiento,
                peso:req.body.peso
            });
            dato.save((err,dato)=>{
                if(err){
                    req.body.error=err;
                    req.body._id=eq.params.id;
                    return res.render('./'+tabla+'/atenderFrom',req.body);
                }else
                    return res.redirect('/'+tabla);
            });
        }
    })
    //res.send("2");
}
module.exports = {
    index:index,
    nuevo:nuevo,
    nuevoPost:nuevoPost,
    edit:edit,
    editPost:editPost,
    borrar:borrar,
    atenderForm:atenderForm,
    atender:atender
}