const { json } = require('express');
const ConexionBD = require('../../db/oracledbconnector');
const genericResponse = require('../../shared/response');
const mensajeException = require('../../db/utility/mensaje.exception');

/* Definicion de clase */
function AuthRepository(conexion){

    function login(req,res){

        try {

            if(req.body.email && req.body.contrasena){

                var bd = new ConexionBD();
                var parametros = {
                    
                    usu_email:{ name:'email', type: ConexionBD.dbTypes.VARCHAR, val: req.body.email, dir: ConexionBD.dbTypes.IN },
                    usu_contrasena:{ name:'contrasena', type: ConexionBD.dbTypes.VARCHAR, val: req.body.contrasena, dir: ConexionBD.dbTypes.IN }
                    
                };
                
                //parametros.out.push({ name:'idUsuario', type: dbTypes.NUMBER, val: 1 });

                bd.executeQuery('select * from table( pkg_neg.func_login( :usu_email, :usu_contrasena ) )', parametros,{},

                    function (error,result) {

                        if(error) {

                            console.error("Un error!: %s",error.message);
                            res.status(500).json( new mensajeException(error.errorNum,'ApiError',error.message));

                        }                        
                        if(result){

                            if(result.rows && result.rows[0]){

                                console.log(result);
                                res.status(200).json( { usuario : result.rows[0] });                                

                            } else {

                                res.status(404).json( new mensajeException(
                                    404,
                                    'EmptyRecord',
                                    'El usuario con las credenciales no existe'
                                    )
                                );

                            }

                        }

                    }

                );

            } else {

                res.status(400).json( new mensajeException (
                    400,
                    'ClientError',
                    'Debes definir los parámetros <email> y <contrasena> en el cuerpo de la petición!'
                    )
                );

            }

        } catch(err) {

            res.status(401).json( new mensajeException (
                401,
                'NoAutorizado',
                err.message
                ) 
            );

        }
        
    }

    function logout(req,res){

        try {

            throw new mensajeException (
                500,
                'ApiError',
                'No implementado aún mijo'
            );

        } catch(err) {

            res.status(500).json( err );

        }

    }

    /* Campos de clase */
    return {
        login,
        logout
    };
}

module.exports = AuthRepository;