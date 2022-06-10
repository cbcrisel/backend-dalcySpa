const {response, request} = require('express');

const {pool}= require('../database/config');


const postAppointment= async(req=request,res=response)=>{
    try {
        const {descripcion,id_turno,id_user,id_esteticista,id_servicio}=req.body;
        const id_cliente = await pool.query(`SELECT cliente.id_persona as id_cliente FROM cliente,persona,usuario WHERE usuario.id_persona=persona.id and cliente.id_persona=persona.id and usuario.id=${id_user}`);
        const query = await pool.query(`INSERT INTO cita(descripcion,fecha,id_turno,id_cliente,id_esteticista,id_servicio) VALUES('${descripcion}',CURRENT_DATE,${id_turno},${id_cliente.rows[0].id_cliente},${id_esteticista},${id_servicio})`);
        res.json({
            message: 'Cita creada',
            body: {
                appointment: req.body
            }
        });
    } catch (error) {
        console.log(error);
        res.json({message:error});
    }
}

const getAppointmentsOfAnUser= async(req=request,res=response)=>{
    try {
        const {id_user}=req.body;
        const id_cliente = await pool.query(`SELECT cliente.id_persona as id_cliente FROM cliente,persona,usuario WHERE usuario.id_persona=persona.id and cliente.id_persona=persona.id and usuario.id=${id_user}`);
        const query = await pool.query(`SELECT c.id,c.descripcion,c.fecha, t.hora_inicio, s.nombre 
                                        FROM cita as c,turno as t,servicio as s,turno_servicio as ts
                                        WHERE c.id_servicio=ts.id_servicio and ts.id_servicio=s.id and c.id_turno=ts.id_turno and ts.id_servicio=t.id and c.id_cliente=${id_cliente.rows[0].id_cliente}`);
        res.json({
            message: 'Citas encontradas',
            body: {
                appointments: query.rows
            }
        });
    } catch (error) {
        console.log(error);
        res.json({message:error});
    }
}

module.exports={
    postAppointment,getAppointmentsOfAnUser
}