const bcrypt = require('bcryptjs');
const {response, request} = require('express');

const {pool}= require('../database/config');
const { generateJWT } = require('../helpers/jwt');

const postUserE= async(req=request,res=response)=>{
    try {
        console.log(req.body);
        const {ci,nombre,apellido,telefono,usuario,password}=req.body;
        const id_rol= await pool.query(`SELECT id FROM rol WHERE nombre='esteticista'`);
        const salt = bcrypt.genSaltSync();


        let pswd = bcrypt.hashSync(password,salt); 
        console.log("hola");
        const queryP = await pool.query( `INSERT INTO persona(ci,nombre,apellido,telefono) VALUES('${ci}','${nombre}','${apellido}','${telefono}') returning id`);

        const queryE = await pool.query( `INSERT INTO esteticista(id_persona) VALUES(${queryP.rows[0].id}) `);

        const queryU = await pool.query( `INSERT INTO usuario(usuario,password,id_rol,id_persona) VALUES('${usuario}','${pswd}',${id_rol.rows[0].id},${queryP.rows[0].id})`); 
        res.json({
            message: 'Usuario creado',
            body: {
                usuario: req.body
            }
        });
    } catch (error) {
        console.log(error);
        res.json({message:error});
    }
    
}

const postUserC= async(req=request,res=response)=>{
    try {
        console.log(req.body);
        const {ci,nombre,apellido,telefono,usuario,password}=req.body;
        const id_rol= await pool.query(`SELECT id FROM rol WHERE nombre='cliente'`);
        const salt = bcrypt.genSaltSync();

        let pswd = bcrypt.hashSync(password,salt); 
        const queryP = await pool.query( `INSERT INTO persona(ci,nombre,apellido,telefono) VALUES('${ci}','${nombre}','${apellido}','${telefono}') returning id`);
        const queryE = await pool.query( `INSERT INTO cliente(id_persona) VALUES(${queryP.rows[0].id}) `);

        const queryU = await pool.query( `INSERT INTO usuario(usuario,password,id_rol,id_persona) VALUES('${usuario}','${pswd}',${id_rol.rows[0].id},${queryP.rows[0].id})`); 
        res.json({
            message: 'Usuario creado',
            body: {
                usuario: req.body
            }
        });
    } catch (error) {
        console.log(error);
        res.json({message:error});
    }
    
}

const login= async(req=request,res=response)=>{
    const {usuario,password}=req.body;
    try {
        const user= await pool.query('SELECT * FROM usuario WHERE usuario.usuario=$1',[usuario]);
        if(user.rowCount==0){
            return res.status(400).json({
                msg:'Usuario no es correctos - correo'
            });
        }
        const validPassword= bcrypt.compareSync(password,user.rows[0].password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Contraseña no es correcta - password'
            });
        }
        const token = await generateJWT(user.rows[0].id);
        const rol= await pool.query('SELECT * FROM rol WHERE id=$1',[user.rows[0].id_rol]);
        const logged={};
        logged.id_rol=user.rows[0].id_rol;
        logged.id_persona=user.rows[0].id_persona;
        logged.usuario=user.rows[0].usuario;
        logged.nombre_rol=rol.rows[0].nombre;
        
        res.json({
            logged,
            token
         })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Server Error'
        })
    }
}

module.exports={
    postUserE,postUserC,login
}