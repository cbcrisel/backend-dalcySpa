
const {response, request} = require('express');

const {pool}= require('../database/config');


const postCategory  = async(req, res) => {
    try {
        const {id, nombre} = req.body;

        const queryCategory = await pool.query(`insert into categoria(nombre) values ('${nombre}')`);

        res.json({
            message: 'Categoria Registrada!',
            body: {
                categoria: req.body
            }
        });
    } catch (error) {
        console.log(error);
        res.json({message: error});
    }
}

const getCateogies = async(req, res) => {
    try {
        const queryGetCategories = await pool.query('select id,nombre from categoria');
        console.log( queryGetCategories.rows)
        res.json(
            {
                message: 'Categorias',
                body: {
                    categorias: queryGetCategories.rows
                }
            }
        );
    } catch (error) {
        console.log(error);
        res.json({
            message: error
        });
    }
}


module.exports = {
    postCategory, getCateogies
}