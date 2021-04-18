const ConexionBD = require('../../db/oracledbconnector');
const utility = require('../../db/utility/utility');
const genericResponse = require('../../shared/response');
const MensajeException = require('../../db/utility/mensaje.exception');

function UsuarioRepository(){

    /* Metodos de clase */

    function nuevoUsuario(req,res){

        try {

            //if(req.body.)

            throw new MensajeException (
                500,
                'ApiError',
                'No implementado aún mijo'
            );

        } catch(err) {

            res.status(401).json( err );

        }

    }

    
    function interceptarUsuarioPorID(req,res,next){

        try {

            var bd = new ConexionBD();
            var usuarioid = Number(req.params.usuarioid);;



            if(req.params.usuarioid && !isNaN(usuarioid)){
                
                var parametros = {
                    
                    idUsuario:{ name:'idUsuario', type: ConexionBD.dbTypes.INT, val: usuarioid, dir: ConexionBD.dbTypes.IN }                    
                };
                
                bd.executeQuery('select * from table( pkg_usuario.func_get_info_usuario( :idUsuario ) )', parametros,{},

                    function (error,result) {
                                                
                        if(error) { //Hay error
                            
                            res.status(500).json(new MensajeException(error.errorNum,'ApiError',error.message));
                        }
                        else if(result.rows && result.rows[0]){ 

                            req.data = result.rows[0];
                            return next();

                        } else {
                            
                            res.status(404).json(
                                new MensajeException(404,'EmptyRecord','El usuario con la id entregada no existe')
                            );

                        }

                    }    
                );

            } else {

                throw new MensajeException(400,'ClientError','Debe indicar el parametro <usuarioid>, y tiene que ser numérico');

            }


        } catch(err){

            res.status(400).json(err);
        }
    }

    function getUsuario(req,res){

        res.status(200).json(req.data);
    }

    function getUsuarios(req,res){
        
        try {

            var bd = new ConexionBD();

            bd.executeQuery('select * from table( pkg_usuario.func_get_all_usuarios() )', {},{},

                function (error,result) {
                                            
                    if(error) { //Hay error
                        
                        res.status(500).json(new MensajeException(error.errorNum,'ApiError',error.message));
                    }
                    else if(result.rows){ 

                        res.status(200).json({ usuarios: result.rows } );

                    } else {
                        
                        res.status(404).json(
                            new MensajeException(404,'EmptyRecord','No hay registros')
                        );

                    }

                }    
            );

        } catch(err) {

            res.status(401).json( err );

        }


    }

    function modificarUsuario(req,res){

        try {

            throw new MensajeException (
                500,
                'ApiError',
                'No implementado aún mijo'
            );

        } catch(err) {

            res.status(401).json( err );

        }


    }

    function deshabilitarUsuario(req,res){

        try {

            throw new MensajeException (
                500,
                'ApiError',
                'No implementado aún mijo'
            );

        } catch(err) {

            res.status(401).json( err );

        }


    }

    /* Campos de clase */
    return {
        //Funciones interceptoras
        interceptarUsuarioPorID,
        //Funciones GET
        getUsuario,
        getUsuarios,
        //Funciones POST
        nuevoUsuario,
        //Funciones PUT
        modificarUsuario,
        //Funciones DELETE
        deshabilitarUsuario
    };
}

module.exports = UsuarioRepository;