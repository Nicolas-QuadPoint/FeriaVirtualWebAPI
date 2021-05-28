import ConexionBD from '../../db/oracledbconnector.js';
import Usuario from '../../entities/Usuario.js';
import { DatabaseErrorException, 
    InvalidCredentialsException, 
    Exception, 
    MethodNotImplementedException, 
    RecordNotFoundException } 
    from '../../info/exceptions/exceptions.js';

/* Para creacion de tokens de autenticacion!!! */
import DotEnv from 'dotenv';
import JWT from 'jsonwebtoken';
import BCrypt from 'bcryptjs';


//Configuring enviromental values
DotEnv.config();

//Check for early errors
if(DotEnv.error){
    throw DotEnv.error;
}


/* Definicion de clase */
function AuthRepository(conexion){

    function login(req,res){

        try {
            
            if(req.body.email && req.body.contrasena){

                //console.log( JSON.stringify(req.body) );

                var bd = new ConexionBD();
                
                /*
                var crearSalt = BCrypt.genSaltSync(10);
                var ncontrasena = BCrypt.hashSync(req.body.contrasena,crearSalt);
                
                console.log('[Contraseña]: ',req.body.contrasena);
                console.log('[Salt de contraseña para hash]: ',crearSalt);
                console.log('[Hash generada por contraseña con salt]: ',ncontrasena);
                */

                var parametros = {
                    
                    usu_email:{ name:'email', type: ConexionBD.dbTypes.VARCHAR, val: req.body.email, dir: ConexionBD.dbTypes.IN },
                    usu_contrasena:{ name:'contrasena', type: ConexionBD.dbTypes.VARCHAR, val: req.body.contrasena, dir: ConexionBD.dbTypes.IN }
                    
                };

                console.log( JSON.stringify(parametros) );

                bd.executeQuery('select * from table(pkg_neg.func_login( :usu_email, :usu_contrasena ))', parametros,{},

                    function (e,result) {

                        if(e) {

                            console.error("Un error!: %s",e.message);
                            res.status(500).json( new DatabaseErrorException() );

                        } else if(result){

                            //console.log(result);

                            if(result.rows[0]){
                            
                                var u = new Usuario();
                                u.buildFromArray(result.rows[0]);

                                var tokenUsuario = JWT.sign({id:u.id_usuario},process.env.WEBTOKEN_SECRET_KEY,{expiresIn:84600});

                                res.status(200).json( { token_usuario: tokenUsuario, usuario : u });

                            } else {
                                res.status(404).json( new RecordNotFoundException() );
                            }

                        } else {

                            res.status(401).json( new InvalidCredentialsException() );

                        }

                    }

                );

            } else {

                res.status(400).json( new Exception (
                    400,
                    'ClientError',
                    'Debes definir los parámetros <email> y <contrasena> en el cuerpo de la petición!'
                    )
                );

            }

        } catch(e) {

            var ex = new InvalidCredentialsException();

            res.status(ex.code).json( ex );
            console.error(`Un error!: ${e.message}`)

        }
        
    }

    function logout(req,res){

        try {

            throw new MethodNotImplementedException();

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

export default AuthRepository;