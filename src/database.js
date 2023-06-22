const mysql = require('mysql');
const {database} = require('./keys');
const {promisify} = require('util');


const  pool = mysql.createPool(database);
pool.getConnection((err, connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error("Conexion perdida con la base de datos");
        }
         if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error("Tiempo expirado de intentos de conexion con la base de datos");
        }
         if(err.code === 'ERCONNREFUSED'){
            console.error("Conexion Rechazada");
        }
         
    }

    if(connection) connection.release();
    console.log("Base de datos conectada");

    return;
});


//Promesas a la BD
pool.query = promisify(pool.query);
module.exports = pool;