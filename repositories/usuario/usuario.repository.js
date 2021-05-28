import ConexionBD from '../../db/oracledbconnector.js';
import Ora from 'oracledb';
import ex from '../../info/exceptions/exceptions.js';
import Usuario from '../../entities/Usuario.js';

function UsuarioRepository(data){

    /* Metodos de clase */

    function nuevoUsuario(req,res){

        try {

            var u = new Usuario();
            u.clone(req.body);

            if(u.validate()) {

                console.log('El objeto Usuario es válido!');

                var bd = new ConexionBD();
                var succ = 0;

                /**
                 * 
                 */

                var parametros = {
                    usu_personalID :{ name:'idUsuario', type: ConexionBD.dbTypes.VARCHAR, val: u.personal_id, dir: ConexionBD.dbTypes.IN },
                    usu_nombre :{ name:'usu_nombre', type: ConexionBD.dbTypes.VARCHAR, val: u.nombre, dir: ConexionBD.dbTypes.IN },
                    usu_nombreSegundo :{ name:'usu_nombreSegundo', type: ConexionBD.dbTypes.VARCHAR, val: u.nombre_segundo, dir: ConexionBD.dbTypes.IN },
                    usu_apellidoPat :{ name:'usu_apellidoPat', type: ConexionBD.dbTypes.VARCHAR, val: u.apellido_paterno, dir: ConexionBD.dbTypes.IN },
                    usu_apellidoMat :{ name:'usu_apellidoMat', type: ConexionBD.dbTypes.VARCHAR, val: u.apellido_materno, dir: ConexionBD.dbTypes.IN },
                    usu_fechanac :{ name:'usu_fechanac', type: ConexionBD.dbTypes.VARCHAR, val: u.fecha_nacimiento, dir: ConexionBD.dbTypes.IN },
                    usu_telefono :{ name:'usu_telefono', type: ConexionBD.dbTypes.INT, val: u.telefono, dir: ConexionBD.dbTypes.IN },
                    usu_direccion :{ name:'usu_direccion', type: ConexionBD.dbTypes.VARCHAR, val: u.direccion, dir: ConexionBD.dbTypes.IN },
                    usu_email :{ name:'usu_email', type: ConexionBD.dbTypes.VARCHAR, val: u.email, dir: ConexionBD.dbTypes.IN },
                    usu_passwd :{ name:'usu_passwd', type: ConexionBD.dbTypes.VARCHAR, val: u.contrasena, dir: ConexionBD.dbTypes.IN },
                    usu_salt_passwd :{ name:'usu_salt_passwd', type: ConexionBD.dbTypes.VARCHAR, val: u.salt_contrasena, dir: ConexionBD.dbTypes.IN },
                    usu_idNacionalidad :{ name:'usu_idNacionalidad', type: ConexionBD.dbTypes.INT, val: u.nacionalidad.id_nacionalidad, dir: ConexionBD.dbTypes.IN },
                    usu_idRol :{ name:'usu_idRol', type: ConexionBD.dbTypes.INT, val: u.rol.id_rol, dir: ConexionBD.dbTypes.IN },
                    usu_idEstadoUsuario :{ name:'usu_idEstadoUsuario', type: ConexionBD.dbTypes.INT, val: u.estado_usuario.id_estado_usuario, dir: ConexionBD.dbTypes.IN },
                    exito :{ name:'exito', type: ConexionBD.dbTypes.INT, val: succ, dir: ConexionBD.dbTypes.INOUT }
                };

                bd.executeStoredProcedure(`pkg_usuario.proc_crear_usuario`,parametros,{},
                    function(error,results){

                        if(error){
                            
                            console.error(`Paso algo! ${error}`);
                            res.status(500).json( new ex.DatabaseErrorException() );

                        } else if (results && results.outBinds){
                            
                            res.status(200).json( { id:results.outBinds.exito } );

                        } else {

                            res.status(500).json( new ex.DatabaseErrorException() );

                        }

                    }
                );
                    
                

            } else {
                console.log('El objeto Usuario NO es válido!');
                res.status(400).json( new ex.InvalidArgumentException() );
            }

        } catch(e) {

            if(e instanceof ex.Exception)
                res.status(e.code).json( e );
            else
                res.status(500).json( new ex.APIException() );

            console.error(`Pasó algo!: ${e}`);

        }

    }

    
    function interceptarUsuarioPorID(req,res,next){

        console.log('Pasando por middleware interceptarUsuario!!');

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

                            var exception = new ex.DatabaseErrorException();
                            res.status(exception.code).json(exception.message);
                            console.error(`Un error!: ${e.message}`);

                        }
                        else if(result.rows && result.rows[0]){ 

                            req.data = result.rows[0];
                            next();

                        } else {
                            
                            res.status(404).json( new ex.RecordNotFoundException() );

                        }

                    }    
                );

            } else {

                throw ex.Exception.new(400,'ClientException','Debe indicar el parametro <usuarioid>, y tiene que ser numérico');

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

                        var exception = new ex.DatabaseErrorException();
                        res.status(exception.code).json(exception);
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
                        
                        res.status(404).json( new ex.RecordNotFoundException() );

                    }

                }    
            );

        } catch(e) {

            res.status(401).json( e );

        }


    }

    function modificarUsuario(req,res){

        try {

            throw new ex.MethodNotImplementedException();

        } catch(e) {

            res.status(e.code).json( e );

        }


    }

    function deshabilitarUsuario(req,res){

        try {

            throw new ex.MethodNotImplementedException();

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