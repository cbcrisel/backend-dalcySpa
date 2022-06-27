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

const getObservationByAppointment=async(req=request, res=response)=>{
    try {
        const {id_cita}=req.params;
        console.log(id_cita)
        const query = await pool.query(`SELECT s.id,s.diagnostico, s.descripcion,p.nombre, p.apellido,e.id_persona,c.id as id_cita
                                        FROM seguimiento_cita as s, cita as c, esteticista as e, persona as p
                                        WHERE s.id_cita=c.id and s.id_cita=${id_cita} and e.id_persona=p.id and c.id_esteticista=e.id_persona`)
        res.json({
            message: 'Seguimientos obtenidos',
            body: {
                observations: query.rows
            }
        });
    } catch (error) {
        console.log(error);
        res.json({message:error});
    }
}


module.exports={
    postObservation,getObservationByAppointment
}