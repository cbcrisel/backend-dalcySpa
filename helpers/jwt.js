const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const {pool}= require('../database/config');

const generateJWT = ( id = 0 ) => {

    return new Promise( (resolve, reject) => {

        const payload = { id };

        jwt.sign( payload, process.env.SECRETPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })
}

module.exports={
    generateJWT
}