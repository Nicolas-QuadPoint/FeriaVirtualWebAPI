//Importing modules
const ora = require('oracledb');
const dotenv = require('dotenv');
const DBConnector = require('./dbconnector');

//Configuring enviromental values
dotenv.config();

//Check for early errors
if(dotenv.error){
    throw dotenv.error;
}

//Con esto, los resultados serán mostrados como JSON
ora.outFormat = ora.OUT_FORMAT_OBJECT;

// Create connection to database
const oraconfig = {
    user          : process.env.DB_USER,
    password      : process.env.DB_USER_PASSWD,
    connectString : process.env.DB_SERVER
};

   
class OraDBConnector extends DBConnector{

    static dbTypes = {
        CHAR : ora.DB_TYPE_CHAR,
        INT : ora.DB_TYPE_NUMBER,
        VARCHAR : ora.DB_TYPE_VARCHAR,
        DATE : ora.DB_TYPE_DATE,
        DATETIME : ora.DB_TYPE_DATE,
        TIMESTAMP : ora.DB_TYPE_TIMESTAMP,
        IN : ora.BIND_IN,
        OUT : ora.BIND_OUT,
        INOUT : ora.BIND_INOUT
    };
    
    newConnection(callbackToSQL){
    
        try {
    
            this.conn = ora.getConnection(oraconfig,callbackToSQL);
    
    
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

module.exports = OraDBConnector;