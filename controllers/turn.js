
const {response, request} = require('express');

const {pool} = require('../database/config');

const postTurn = async(req, res) => {
    try {
        const {descripcion, hora_inicio, hora_fin} = req.body;

        const queryTurn = await pool.query(`insert into turno(descripcion,hora_inicio,hora_fin) values ('${descripcion}','${hora_inicio}','${hora_fin}')`)

        res.json({
            message: 'Turno Registrado',
            body: {
                turno: req.body
            }
        });
    } catch (error) {
        console.log(error);
        res.json({message: error});
    }
}

const getTurns = async(req, res) => {
    try {
        const queryTurns = await pool.query('select id,descripcion,hora_inicio,hora_fin from turno');

        res.json({
            message: 'Turnos',
            body: {
                turnos: queryTurns.rows
            }
        });
    } catch (error) {
        console.log(error);
        res.json({message: error});
    }
}
module.exports = {
    postTurn, getTurns
};