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

const postService = async(req, res) => {
    try {
        const {nombre, id_categoria} = req.body;

        const queryCategory = await pool.query(`select id from categoria where id=${id_categoria}`);

        if(queryCategory.rows.length > 0){
            const queryService = await pool.query(`insert into servicio(nombre,id_categoria) values ('${nombre}','${id_categoria}')`);
            res.json({
                message: 'Servicio Registrado',
                body: {
                    servicio: req.body
                }
            });
        }else{
            res.json({
                message: 'Id de Categoria no encontrado!'
            });
        }
    } catch (error) {
        console.log(error);
        res.json({message: error});
    }
}

const getServicesByCategory = async(req=request,res=response) => {
  try {
    const {id_categoria}=req.body;
    const query = await pool.query(`SELECT id,nombre FROM servicio WHERE id_categoria=${id_categoria}`);
    res.json({
        message: 'Servicios encontrados',
        body: {
            services: query.rows
        }
    });

  } catch (error) {
    console.log(error);
    res.json({message:error});
  }    
}


module.exports={
    getTurnsOfAService, postService,getServicesByCategory
}