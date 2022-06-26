const {response, request} = require('express');


const {pool}= require('../database/config');


const postObservation=async(req=request, res=response)=>{
    try {
        const {descripcion,diagnostico, id_cita}=req.body
        const query= await pool.query(`INSERT INTO seguimiento_cita(diagnostico,descripcion,id_cita) VALUES('${diagnostico}','${descripcion}','${id_cita}')`)
        res.json({
            message:'Seguimiento Creado',
            body:{
                seguimiento:req.body
            }
        })
    } catch (error) {
        console.log(error);
        res.json({message:error});
    }
}


module.exports={
    postObservation
}