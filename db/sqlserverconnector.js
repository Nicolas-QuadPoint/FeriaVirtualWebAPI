//Importing modules
const dotenv = require('dotenv');
const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const utility = require('./utility/utility');

//Configuring enviromental values
dotenv.config();

//Check for early errors
if(dotenv.error){
    throw dotenv.error;
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

function sqlServerConnector(){

    var self = this;

    this.spGetExecute = (qry, callback) => {
        
        this.newConnection(
            (connection) => {

                var data = [];
                var dataset = [];
                var resultset = 0;

                //Se crea la petición
                request = new Request(qry, function (err, rowCount) {
                    utility.sendDbResponse(err, rowCount, dataset, callback);
            
                });
                
                //Se ejecuta cada vez que haya que procesar una fila de resultados
                request.on('row', function (columns) {
                    utility.buildRow(columns, data);
            
                });
                
                //Se ejecuta cuando la instrucción haya terminado
                request.on('doneInProc', function (rowCount, more, rows) {

                    //Ya no hay nada mas que hacer?
                    if(more == false){
                        
                        connection.close();
                    
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
    
    this.spPostExecute = (qry, params, callback) => {
        
        this.newConnection(
            
            (connection) => {

                var newdata = [];
                var outputvalData = [];
                
                //Se crea la petición
                var request = new Request(qry, function (err, rowCount) {
                    utility.sendDbResponse(err, rowCount, newdata,outputvalData, callback);
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
                    utility.buildRow(columns, newdata);
                });
               
                //Se ejectua cada vez que aparezca un valor del tipo output
                request.on('returnValue', function(parameterName, value, metadata) {

                    utility.buildOutputParam( outputvalData, { name:parameterName, val:value } );
                    console.log('output variable: name: %s - value: %s',parameterName,value);

                });
                
                //Se ejecuta cuando la instrucción haya terminado
                request.on('doneInProc', function (rowCount, more, rows) {
                    
                    //Ya no hay nada mas que hacer?
                    if(more == false){
                        connection.close();
                    }

                });
            
                //Se llama al procedimiento!
                connection.callProcedure(request);

            }
        );
        
    }
    
    this.queryGetExecute = (qry, params, isMultiSet, callback) => {
        
        this.newConnection(
            
            (connection) =>{

                var data = [];
                var dataset = [];
                var resultset = 0;
                
                //Se crea la petición
                var request = new Request(qry, function (err, rowCount) {
                    utility.sendDbResponse(err, rowCount, dataset, callback);
            
                });
                
                //Agrega los parámetros a la función/procedimiento
                params.forEach(param => {
                    request.addParameter(param.name, param.type, param.val);
                });
                
                //Se ejecuta cada vez que haya que procesar una fila de resultados
                request.on('row', function (columns) {
                    utility.buildRow(columns, data);
                });
                
                //Se ejecuta cuando la instrucción haya terminado
                request.on('doneInProc', function (rowCount, more, rows) {

                    //Es tabla?
                    if (isMultiSet == false) {
                        dataset = data;
                    }
                    //Ya no hay nada mas que hacer?
                    else if(more == false){
                        connection.close();
                    }
                    //Hay datos que entregar
                    else {
                        dataset.push(data);
                        data = [];
                    }
                    
                });

            
                connection.execSql(request);

            }
        );

    }
    
    this.queryExecute = (qry, params, isMultiSet, callback) => {
        
        this.newConnection(

            (connection) => {

                var data = [];
                var dataset = [];
                var resultset = 0;
                
                //Se crea la petición
                request = new Request(qry, function (err, rowCount) {
                    utility.sendDbResponse(err, rowCount, dataset, callback);
                });
                
                //Agrega los parametros a la consulta
                params.forEach(param => {
                    request.addParameter(param.name, param.type, param.val);
                });

                //Gestiona el fin de la petición
                request.on('done', function (rowCount, more, rows) { 

                    if(more == false){
                        connection.close();
                    }

                });
            
                //Ejecutamos la consulta
                connection.execSql(request);

            }
        );

    }
      
    this.newConnection = (callbackToSQL) => {
    
        var c = new Connection(config);
    
        // Attempt to connect and execute queries if connection goes through
        c.on("connect", err => {
            
            //Hay un error en la conexion?
            if (err) {
                
                console.error('connect error: ' + err.message);

            } else {

                console.log('Conectado!');

                //Se comprueba el callback, y se ejecuta!
                if(callbackToSQL){
                    
                    callbackToSQL(c);

                } 
                //No hay callback, entonces cerramos la conexion
                else {

                    c.close();

                }
            }
        });
    
        //Conectamos y recien ahí se pueden hacer las peticiones!
        c.connect();
    }

    this.closeConnection = () => {

        this.conn.close();

    }

    //Retornamos el objeto para funciones encadenadas
    return this;
}

module.exports = sqlServerConnector;