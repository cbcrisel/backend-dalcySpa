const {Pool} = require('pg');

const pool = new Pool({
    host: 'ec2-18-204-142-254.compute-1.amazonaws.com',
    user: 'hxcwnrhyvsdmmc',
    password: 'c903af0ccab79a0b5230450d092c27e342c09e60045cb9e9408f20c7c48c32d1',
    database: 'dcj4h6maqchj12',
    port: '5432',
    ssl: {
        rejectUnauthorized: false
      }
});

module.exports={
    pool
}