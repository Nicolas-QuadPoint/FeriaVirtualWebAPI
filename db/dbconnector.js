class DBConnector {

    static dbTypes = {

        NUMBER : "NUMBER",
        INT: "INT",
        VARCHAR : "VARCHAR",
        CHAR : "CHAR",
        DATE : "DATE",
        DATETIME : "DATETIME",
        TIMESTAMP : "TIMESTAMP"
    
    };

    //Conexion BD
    constructor(){
        this.conn = '';
    }

    //Generate a new connection
    newConnection(callbackToSQL){
        this.conn = 'Connection';
    }

    //This closes the connection
    closeConnection(){
        console.log('DBConnector.closeConnection');
    }

    //Funcion que ejecuta un 'procedimiento almacenado'
    executeStoredProcedure(spName,params,options,callback){
        console.log('DBConnector.executeStoredProcedure');
    }

    //Funcion que ejecuta una 'consulta'
    executeQuery(query,params,options,callback){
        console.log('DBConnector.executeQuery');
    }

}



module.exports = DBConnector;