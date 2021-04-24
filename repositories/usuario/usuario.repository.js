import ConexionBD from '../../db/oracledbconnector.js';
import Ora from 'oracledb';
import ex from '../../info/exceptions/exceptions.js';
import Usuario from '../../entities/Usuario.js';

function UsuarioRepository(data){

    /* Metodos de clase */

    function nuevoUsuario(req,res){

        try {

            //if(req.body.)
            res.status(501).json( new Usuario());
            //throw ex.MethodNotImplementedException;

        } catch(e) {

            res.status(e.code).json( e );

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

                    function (e,result) {
                                                
                        if(e) { //Hay error?
                            
                            res.status(ex.DatabaseErrorException).json(ex.DatabaseErrorException);
                            console.error(`Un error!: ${e.message}`);
                        }
                        else if(result.rows && result.rows[0]){ 

                            req.data = result.rows[0];
                            return next();

                        } else {
                            
                            res.status(404).json( ex.RecordNotFoundException );

                        }

                    }    
                );

            } else {

                throw new ex.Exception(400,'ClientException','Debe indicar el parametro <usuarioid>, y tiene que ser numérico');

            }


        } catch(e){

            res.status(400).json(e);
        }
    }

    function getUsuario(req,res){

        res.status(200).json(req.data);
    }

    function getUsuarios(req,res){
        
        try {

            var bd = new ConexionBD();

            bd.executeQuery('select * from table( pkg_usuario.func_get_all_usuarios() )', {},
                { outFormat : Ora.OUT_FORMAT_ARRAY },

                function (e,result) {
                                            
                    if(e) { //Hay error?
                        
                        res.status(ex.DatabaseErrorException.code).json(ex.DatabaseErrorException);
                        console.error(`Un error!: ${e.message}`);
                    }
                    else if(result.rows){ //Aquí transformo el resultado a objetos!!

                        var arr_usuarios = [];
                        result.rows.forEach(function(value,index,array){

                            var u = new Usuario();
                            u.buildFromArray(result.rows[index]);

                            arr_usuarios.push(u);

                        });

                        res.status(200).json({ usuarios: arr_usuarios } );
                        

                    } else {
                        
                        res.status(404).json( ex.RecordNotFoundException );

                    }

                }    
            );

        } catch(e) {

            res.status(401).json( e );

        }


    }

    function modificarUsuario(req,res){

        try {

            throw nex.MethodNotImplementedException;

        } catch(e) {

            res.status(e.code).json( e );

        }


    }

    function deshabilitarUsuario(req,res){

        try {

            throw ex.MethodNotImplementedException;

        } catch(e) {

            res.status(401).json( e );

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

export default UsuarioRepository;