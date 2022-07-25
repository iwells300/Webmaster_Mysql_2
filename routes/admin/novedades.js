var express=require('express');
var router=express.Router();
var moment=require('moment');

router.use(function(req,res,next){
    if(!req.session.vistas){
      req.session.vistas={};
    }
    if(!req.session.vistas[req.originalUrl]){
      req.session.vistas[req.originalUrl]=1;
    }else{
      req.session.vistas[req.originalUrl]++;
    }
    console.log(req.session.vistas);
    next();
  })

router.get('/',function(req,res,next){
    
    if(req.session.vistas[req.originalUrl]==1){
        cantidadVeces='vez';
    }else{
        cantidadVeces='veces';
    }
    
    nombre=req.session.nombre;
    nombre=nombre.charAt(0).toUpperCase() + nombre.slice(1);

    res.render('admin/novedades',{
        layout:'admin/layout',
        usuario:nombre,
        saludo:req.session.saludo,
        vistas:req.session.vistas[req.originalUrl],
        tiempo:req.session.tiempo,
        cantidadVeces:cantidadVeces       
    });
});

module.exports=router;