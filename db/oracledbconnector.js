//Importing modules
import { outFormat, OUT_FORMAT_OBJECT, DB_TYPE_CHAR, DB_TYPE_NUMBER, DB_TYPE_VARCHAR, DB_TYPE_DATE, DB_TYPE_TIMESTAMP, BIND_IN, BIND_OUT, BIND_INOUT, getConnection } from 'oracledb';
import { config, error as _error } from 'dotenv';
import DBConnector from './dbconnector';

//Configuring enviromental values
config();

//Check for early errors
if(_error){
    throw _error;
}

//Con esto, los resultados serán mostrados como JSON
outFormat = OUT_FORMAT_OBJECT;

// Create connection to database
const oraconfig = {
    user          : process.env.DB_USER,
    password      : process.env.DB_USER_PASSWD,
    connectString : process.env.DB_SERVER
};

   
class OraDBConnector extends DBConnector{

    static dbTypes = {
        CHAR : DB_TYPE_CHAR,
        INT : DB_TYPE_NUMBER,
        VARCHAR : DB_TYPE_VARCHAR,
        DATE : DB_TYPE_DATE,
        DATETIME : DB_TYPE_DATE,
        TIMESTAMP : DB_TYPE_TIMESTAMP,
        IN : BIND_IN,
        OUT : BIND_OUT,
        INOUT : BIND_INOUT
    };
    
    newConnection(callbackToSQL){
    
        try {
    
            this.conn = getConnection(oraconfig,callbackToSQL);
    
    
        } catch(e) {
    
            console.error(error.errorNum,error.message)
    
        }
        
    }

    closeConnection(){

        try {
            
            this.conn.close();

        } catch(e){

            console.error("Un error en OracleDBConnector!: %s",e.message);

        }
    
    }

    executeStoredProcedure(spName,params,options,callback){
    
        this.newConnection(
    
            (e,connection) => {
    
                var data = [];
                var dataset = [];
                var resultset = 0;
                var strparams = "";
                
                //Iterando por items del objeto
                //https://attacomsian.com/blog/javascript-iterate-objects
                for (const key in params) {
                    strparams = strparams.concat(`:${key},`);
                }

                //Quito la coma al final del string en caso de
                //https://stackoverflow.com/a/36630251
                strparams = strparams.replace(/.$/,"");                

                console.log(`Params: ${strparams}`);
                
                //Se ejecuta la accion
                //Aqui uso interpolacion de cadenas para simular un tipico bloque de ejecucion
                //https://www.w3docs.com/snippets/javascript/how-to-do-string-interpolation-in-javascript.html
                connection.execute(
                   `BEGIN
                        ${spName}(${strparams});
                    END;`,
                    params,
                    options,
                    callback
                );
    
            }
        );
        
    }

    executeQuery(query, params, options, callback){
    
        this.newConnection(
    
            (e,connection) => {
    
                var data = [];
                var dataset = [];
                var resultset = 0;
                var strparams = "";
                
                //Iterando por items del objeto
                //https://attacomsian.com/blog/javascript-iterate-objects
                for (const key in params) {
                    strparams = strparams.concat(`:${key},`);
                }

                //Quito la coma al final del string en caso de
                //https://stackoverflow.com/a/36630251
                strparams = strparams.replace(/.$/,"");                

                console.log(`Params: ${strparams}`);

                //Se ejecuta la accion
                connection.execute(query,params,options,callback);
    
            }
        );
    
    }
    
}

export default OraDBConnector;