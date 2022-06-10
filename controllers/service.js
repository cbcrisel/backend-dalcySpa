const {response, request} = require('express');

const {pool}= require('../database/config');



const getTurnsOfAService= async(req=request,res=response)=>{
    try {
        const {id_servicio}=req.params;
        const query = await pool.query(`SELECT descripcion,hora_inicio,hora_fin,id_servicio,id_turno,nombre
                                        FROM turno,turno_servicio,servicio
                                        WHERE turno.id=turno_servicio.id_turno and servicio.id=turno_servicio.id_servicio and servicio.id=${id_servicio}`);
        res.json({
            message: 'Turnos obtenidos',
            body: {
                turns: query.rows
            }
        });
    } catch (error) {
        console.log(error);
        res.json({message:error});
    }
}



module.exports={
    getTurnsOfAService
}