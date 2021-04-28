//Importing modules
import { config as _config, error } from 'dotenv';
import { Connection } from 'tedious';
import { Request } from 'tedious';
import { TYPES } from 'tedious';
import { sendDbResponse, buildRow, buildOutputParam } from '../utilities/utilities.js';
import DBConnector from './dbconnector';

//Configuring enviromental values
_config();

//Check for early errors
if(error){
    throw error;
}

// Create connection to database
// Para conectarme a localhost, debo tener iniciado el servicio sqlserver browser!!!
const config = {
    authentication: {
        options: {
        userName: process.env.DB_USER,
        password: process.env.DB_USER_PASSWD
        },
        type: "default"
    },
    server: process.env.DB_SERVER,
    options: {
        database: process.env.DB_NAME,
        instanceName: process.env.DB_INSTANCE_NAME,
        encrypt: false
    }
};

class SQLServerDBConnector extends DBConnector {

    static dbTypes = {

        NUMBER : TYPES.Numeric,
        INT: TYPES.Int,
        VARCHAR : TYPES.VarChar,
        CHAR : TYPES.Char,
        DATE : TYPES.Date,
        DATETIME : TYPES.DateTime,
        TIMESTAMP : TYPES.DateTime
    
    };

    //Generate a new connection
    newConnection(callbackToSQL){

        var conn = new Connection(config);
    
        // Attempt to connect and execute queries if connection goes through
        conn.on("connect", e => {
            
            //Hay un error en la conexion?
            if (e) {
                
                console.error('connect error: ' + e.message);

            } else {

                console.log('Conectado!');

                //Se comprueba el callback, y se ejecuta!
                if(callbackToSQL){
                    
                    callbackToSQL(conn);

                } 
                //No hay callback, entonces cerramos la conexion
                else {

                    conn.close();

                }
            }
        });
    
        //Conectamos y recien ahí se pueden hacer las peticiones!
        conn.connect();
    }

    //This closes the connection
    closeConnection(){
        this.conn.close();
    }

    //Funcion que ejecuta un 'procedimiento almacenado'
    executeStoredProcedure(spName,params,options,callback){

        this.newConnection(
            
            (connection) => {

                var newdata = [];
                var outputvalData = [];
                
                //Se crea la petición
                var request = new Request(spName, function (e, rowCount) {
                    sendDbResponse(e, rowCount, newdata,outputvalData, callback);
                });
                
                //Agrega los parámetros a la función/procedimiento
                params.in.forEach(param => {
                    request.addParameter(param.name, param.type, param.val);
                });

                //Agrega parámetros de salida (opcional)
                params.out.forEach(param =>{
                    request.addOutputParameter(param.name,param.type,param.val);
                });

                //Se ejecuta cada vez que haya que procesar una fila de resultados
                request.on('row', function (columns) {
                    buildRow(columns, newdata);
                });
               
                //Se ejectua cada vez que aparezca un valor del tipo output
                request.on('returnValue', function(parameterName, value, metadata) {

                    buildOutputParam( outputvalData, { name:parameterName, val:value } );
                    console.log('output variable: name: %s - value: %s',parameterName,value);

                });
                
                //Se ejecuta cuando la instrucción haya terminado
                request.on('doneInProc', function (rowCount, more, rows) {
                    
                    //Ya no hay nada mas que hacer?
                    if(more == false){
                        
                        this.closeConnection();
                    
                    }
                    //Hay datos que entregar 
                    else {

                        dataset.push(data);
                        data = [];

                    }

                });
            
                //Se llama al procedimiento!
                connection.callProcedure(request);

            }

        );

    }
}
      
export default SQLServerDBConnector;