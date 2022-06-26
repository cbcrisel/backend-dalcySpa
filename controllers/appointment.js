const {response, request} = require('express');


const {pool}= require('../database/config');
const { agendarCita } = require('../helpers/email');


const postAppointment= async(req=request,res=response)=>{
    try {
        const {descripcion,id_turno,fecha,id_user,id_esteticista,id_servicio}=req.body;
        const queryTurno= await pool.query(`SELECT hora_inicio FROM turno WHERE id=${id_turno}`);
        const queryServicio= await pool.query(`SELECT nombre FROM servicio WHERE id=${id_servicio}`);
        const queryEsteticista= await pool.query(`SELECT persona.nombre FROM esteticista,persona WHERE persona.id=esteticista.id_persona and esteticista.id_persona=${id_esteticista}`);
        const id_cliente = await pool.query(`SELECT usuario.usuario, persona.nombre ,cliente.id_persona as id_cliente FROM cliente,persona,usuario WHERE usuario.id_persona=persona.id and cliente.id_persona=persona.id and usuario.id=${id_user}`);
        const query = await pool.query(`INSERT INTO cita(descripcion,fecha,id_turno,id_cliente,id_esteticista,id_servicio) VALUES('${descripcion}','${fecha}',${id_turno},${id_cliente.rows[0].id_cliente},${id_esteticista},${id_servicio})`);
        var citaInformation= new Object();
        citaInformation.id_turno= queryTurno.rows[0].hora_inicio;
        citaInformation.id_servicio= queryServicio.rows[0].nombre;
        citaInformation.id_esteticista= queryEsteticista.rows[0].nombre;
        citaInformation.fecha=fecha;
        const email= agendarCita(citaInformation,id_cliente.rows[0]);
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
                                        WHERE c.id_servicio=ts.id_servicio and ts.id_servicio=s.id and c.id_turno=ts.id_turno and ts.id_turno=t.id and c.id_cliente=${id_cliente.rows[0].id_cliente}`);
        
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

const getAppointmentsOfAnEsteticista=async(req=request, res=response)=>{
    try {
        const {id_user}=req.body
        const id_esteticista= await pool.query(`SELECT esteticista.id_persona as id_esteticista FROM esteticista,persona,usuario WHERE usuario.id_persona=persona.id and esteticista.id_persona=persona.id and usuario.id=${id_user}`)
        console.log('hola',id_esteticista.rows[0].id_esteticista);
        const query = await pool.query(`SELECT c.id,c.descripcion,c.fecha, t.hora_inicio, s.nombre 
                                        FROM cita as c,turno as t,servicio as s,turno_servicio as ts
                                        WHERE c.id_servicio=ts.id_servicio and ts.id_servicio=s.id and c.id_turno=ts.id_turno and ts.id_turno=t.id and c.id_cliente=${id_esteticista.rows[0].id_esteticista}`);
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
    postAppointment,getAppointmentsOfAnUser, getAppointmentsOfAnEsteticista
}