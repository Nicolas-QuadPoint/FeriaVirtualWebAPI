const { json } = require('express');
const ConexionBD = require('../../db/oracledbconnector');
const genericResponse = require('../../shared/response');
const ex = require('../../info/exceptions/exceptions');

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

                    function (e,result) {

                        if(e) {

                            console.error("Un e!: %s",e.message);
                            res.status(500).json( ex.DatabaseErrorException );

                        }                        
                        if(result){

                            if(result.rows && result.rows[0]){

                                console.log(result);
                                res.status(200).json( { usuario : result.rows[0] });
                                return;

                            }

                        }

                        res.status(401).json( ex.InvalidCredentialsException );

                    }

                );

            } else {

                res.status(400).json( new ex.Exception (
                    400,
                    'ClientError',
                    'Debes definir los parámetros <email> y <contrasena> en el cuerpo de la petición!'
                    )
                );

            }

        } catch(e) {

            res.status(ex.InvalidCredentialsException.code).json( ex.InvalidCredentialsException );
            console.error(`Un error!: ${e.message}`)

        }
        
    }

    function logout(req,res){

        try {

            throw ex.MethodNotImplementedException;

        } catch(e) {

            res.status(er.code).json( e );

        }

    }

    /* Campos de clase */
    return {
        login,
        logout
    };
}

module.exports = AuthRepository;