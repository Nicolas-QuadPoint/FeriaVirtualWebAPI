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


//Configuring enviromental values
DotEnv.config();

//Check for early errors
if(DotEnv.error){
    throw DotEnv.error;
}


/**
 * AuthRepository
 * 
 * Clase que maneja las peticiones indicadas en el archivo 
 * auth.routes.js.
 * 
 * Básicamente, hace dos cosas: login y logout.
 * 
 * 
 * @param {Object} conexion Objeto sin usar que correspondería a una conexión 
 * a la base de datos, pero hasta el momento no es necesario.
 * @return La instancia de clase AuthRepository
 */
function AuthRepository(conexion){


    /**
     * 
     * Esta funcion permite autenticar al usuario al sistema, 
     * mediante el envío de credenciales.
     * Para que esto funcione, el usuario debe enviar una petición
     * con un objeto json que representan sus credenciales:
     * 
     * {
     *    "email":"ejemplo@email.com", 
     *    "contrasena":"contrasena" 
     * }
     * 
     * Esta funcion lee los contenidos de este objeto, y realiza 
     * la autenticación desde la fuente de datos (base de datos), 
     * y en base a su respuesta, se decantan por dos opciones: 
     * 
     * - Opción afirmativa: Si las credenciales son válidas, entonces 
     * esta función creará un 'token' para que el usuario autenticado 
     * realice operaciones con recursos protegidos, todo esto durante 
     * un lapso de tiempo definido en el token (un día en este caso), 
     * además de un objeto Usuario con todos sus datos (a excepción de 
     * la contraseña, por supuesto). 
     * 
     * - Opción negativa: Si en caso contrario las credenciales no 
     * son válidas, entonces se creará un objeto de Exception para 
     * responder al cliente, estableciendo el código de respuesta http 
     * a 401 (Unauthorized), 404 (Not found), o 500 (API o BD error) 
     * dependiendo del error generado. Como se puede intuir, el token
     * no es generado en este caso. 
     * 
     * 
     * @param {Request} req Objeto entregado por express 
     * para manejar la petición
     * @param {Response} res Objeto entregado por express 
     * para responder la petición
     * 
     */
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

                            console.log(result);

                            if(result.rows[0]){
                            
                                var u = new Usuario();
                                u.buildFromArray(result.rows[0]);

                                var tokenUsuario = JWT.sign({id:u.id_usuario},process.env.WEBTOKEN_SECRET_KEY,{expiresIn:84600});
                                console.log({ token_usuario: tokenUsuario, usuario : u });
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

    /**
     * TODO: Implementar la mecánica de cierre de sesión en la web api, 
     * invalidando el token por ejemplo
     * 
     * @param {Request} req Objeto entregado por express para 
     * manejar la petición
     * @param {Response} res Objeto entregado por express para 
     * responder la petición
     * 
     */
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