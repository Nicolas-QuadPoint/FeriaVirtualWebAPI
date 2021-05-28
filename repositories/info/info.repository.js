import ConexionBD from '../../db/oracledbconnector.js';
import Ora from 'oracledb';
import ex from '../../info/exceptions/exceptions.js';
import util from '../../utilities/utilities.js';

/* Información de entidades! */
import Entities from '../../entities/entities.js';

/* Definicion de clase */
function InfoRepository(conexion){

    function simpleRequestManager(qry,tipo,claveResultado,req,res){
        
        try {

            var resultados = [];
            
            util.oraSimpleQueryRequestHandler(
                qry,{},
                resultados,tipo,function(error,success){

                    if(error){
                        console.error(`Algo paso en simpleRequestManager!!: ${error}`);
                        res.status(500).json(new ex.DatabaseErrorException());
                    }
                    else if(success){

                        var respuesta = {};

                        respuesta[claveResultado] = resultados;

                        res.status(200).json( respuesta );

                    } else {
                        res.status(404).json(new ex.RecordNotFoundException());
                    }

                }
            );

        } catch(e) {
            res.status(500).json(new ex.APIException());
            console.error(`Algo paso en simpleRequestManager!!: ${e}`);
        }
        
    }

    function getAPIObjects(req,res){

        var expresionSoloLetras = /^[A-Za-z0-9]{1,}$/;

        try {
            
            console.log(`Objeto a pedir: ${req.params.objectid}`);

            /**
             * ESTO ES PELIGROSO. NO USAR ESTE MÉTODO PARA BUSCAR EN PRODUCCIÓN!!!
             */
            if(req.params.objectid && expresionSoloLetras.test(req.params.objectid)){

                res.status(200).json(new Entities[req.params.objectid]());

            } else {

                res.status(400).json(new ex.InvalidArgumentException());

            }
            
        } catch(e) {

            console.error(`Paso algo!: ${e}`);

            if(e instanceof TypeError){

                res.status(404).json( new ex.RecordNotFoundException() );

            } else {

                res.status(500).json( new ex.APIException() );
                
            }

        }

    }

    function getNacionalidades(req,res){
        simpleRequestManager('select * from table( pkg_info.func_get_nacionalidades() )',
        Entities.Nacionalidad,'nacionalidades',req,res);
    }

    function getEstadosContrato(req,res){
        simpleRequestManager('select * from table( pkg_info.func_get_estados_contrato() )',
        Entities.ParClaveValor,'valores',req,res);
    }

    function getEstadosUsuario(req,res){
        simpleRequestManager('select * from table( pkg_info.func_get_estados_usuario() )',
        Entities.ParClaveValor,'valores',req,res);
    }

    function getEstadosVenta(req,res){
        simpleRequestManager('select * from table( pkg_info.func_get_estados_venta() )',
        Entities.ParClaveValor,'valores',req,res);
    }

    function getEstadosSubasta(req,res){
        simpleRequestManager('select * from table( pkg_info.func_get_estados_subasta() )',
        Entities.ParClaveValor,'valores',req,res);
    }

    function getTiposProducto(req,res){
        simpleRequestManager('select * from table( pkg_info.func_get_tipos_producto() )',
        Entities.ParClaveValor,'valores',req,res);
    }

    function getTiposSubasta(req,res){
        simpleRequestManager('select * from table( pkg_info.func_get_tipos_subasta() )',
        Entities.ParClaveValor,'valores',req,res);
    }

    function getTiposVenta(req,res){
        simpleRequestManager('select * from table( pkg_info.func_get_tipos_venta() )',
        Entities.ParClaveValor,'valores',req,res);
    }

    function getRolesUsuario(req,res){
        simpleRequestManager('select * from table( pkg_info.func_get_roles_usuario() )',
        Entities.ParClaveValor,'valores',req,res);
    }

    /* Campos de clase */
    return {
        getAPIObjects,
        getNacionalidades,
        getEstadosContrato,
        getEstadosUsuario,
        getEstadosVenta,
        getEstadosSubasta,
        getTiposProducto,
        getTiposSubasta,
        getTiposVenta,
        getRolesUsuario
    };
}

export default InfoRepository;