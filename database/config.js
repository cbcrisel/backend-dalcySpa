const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'dalcyspa',
    port: '5432'
});

module.exports={
    pool
}