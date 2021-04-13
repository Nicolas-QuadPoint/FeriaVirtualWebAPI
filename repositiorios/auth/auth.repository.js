const { json } = require('express');
const ConexionBD = require('../../db/sqlserverconnector');
const TYPES = require('tedious').TYPES;
const genericResponse = require('../../shared/response');

/* Definicion de clase */
function AuthRepository(conexion){

    function login(req,res){

        try {

            if(req.body.email && req.body.contrasena){

                var bd = new ConexionBD();
                var parametros = {in:[],out:[]};

                parametros.in.push({ name:'email', type: TYPES.VarChar, val: req.body.email });
                parametros.in.push({ name:'contrasena', type: TYPES.VarChar, val: req.body.contrasena });
                parametros.out.push({ name:'idUsuario', type: TYPES.Int, val: 1 });

                bd.spPostExecute('dbo.feriavirtual_proc_login', parametros,
                    function (error,rowData,outValData) {
                        
                        if(outValData){
                            res.status(200).json(outValData);
                        } else {
                            res.status(403).json({idUsuario:null});
                        }

                    }    
                );

            } else {

                res.status(401).json( { message:'Debes definir los parámetros <email> y <contrasena> en el cuerpo de la petición!' } );

            }

        } catch(err) {

            res.status(401).json( { error:err.message } );

        }
        
    }

    function logout(req,res){

        try {


            res.status(401).json( { error:'No impementado aun mijo' } );

        } catch(err) {

            res.status(401).json( { error:err.message } );

        }

    }

    /* Campos de clase */
    return {
        login,
        logout
    };
}

module.exports = AuthRepository;