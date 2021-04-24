import ConexionBD, { dbTypes } from '../../db/oracledbconnector';
import utility from '../../db/utilities/utility';
import genericResponse from '../../shared/response';
import { MethodNotImplementedException, DatabaseErrorException, RecordNotFoundException, InvalidArgumentException } from '../../info/exceptions/exceptions';

/* Definicion de clase */
function VentasRepository(datos){
    
    /* Metodos de clase */
    function nuevaVenta(req,res){
        
        try {

            var objeto = JSON.parse(req.body);
            
            console.log(req.body);

            res.status(501).json( MethodNotImplementedException );

        } catch(e) {

            res.status(401).json( e );

        }

    }

    function getVenta(req,res){
        
        try {

            var venta_id = Number(req.params.ventaid);

            if(req.params.ventaid && !isNaN(venta_id)){

                var conn = new ConexionBD();

                var parametros = {
                    ventaid:{ name:'ventaid', type: dbTypes.INT, val: venta_id, dir: dbTypes.IN }
                };

                conn.executeQuery("select * from table ( pkg_venta.func_get_venta(:ventaid) )",parametros,{},
                function(e,results){
                    
                    if(e){

                        res.status(500).json( DatabaseErrorException );
                        console.error(`Un error!: ${e.message}`);

                    } else if(results && results.rows[0]) {

                        res.status(200).json( { ventas : results.rows } );

                    } else {

                        res.status(404).json( RecordNotFoundException );

                    }

                });


            } else {

                res.status(400).json( InvalidArgumentException );

            }

        } catch(e) {

            res.status(500).json( e );

        }

    }

    function getVentasPorUsuario(req,res){
        
        try {

            var usu_id = Number(req.params.usuarioid);

            if(req.params.usuarioid && !isNaN(usu_id)){

                var conn = new ConexionBD();

                var parametros = {
                    usuarioid:{ name:'usuarioid', type: dbTypes.INT, val: usu_id, dir: dbTypes.IN }
                };

                conn.executeQuery("select * from table ( pkg_venta.func_get_all_ventas_usuario(:usuarioid) )",parametros,{},
                function(e,results){
                    
                    if(e){

                        res.status(500).json( DatabaseErrorException );
                        console.error(`Un error!: ${e.message}`);

                    } else if(results && results.rows[0]) {

                        res.status(200).json( { ventas : results.rows } );

                    } else {

                        res.status(404).json( RecordNotFoundException );

                    }

                });


            } else {

                res.status(400).json( InvalidArgumentException );

            }

        } catch(e) {

            res.status(500).json( e );

        }
    }

    function getVentas(req,res){

        try {
            
            var conn = new ConexionBD();

            conn.executeQuery("select * from table ( pkg_venta.func_get_all_ventas() )",{},{},
            function(e,results){
                
                if(e){

                    res.status(500).json( DatabaseErrorException );
                    console.error(`Un error!: ${e.message}`);

                } else if(results && results.rows[0]) {

                    res.status(200).json( { ventas : results.rows } );

                } else {

                    res.status(404).json( RecordNotFoundException );

                }

            });

        } catch(e) {

            res.status(500).json( e );

        }

    }

    function updateVenta(req,res){

        try {

            res.status(501).json( MethodNotImplementedException );

        } catch(e) {

            res.status(401).json( e );

        }

    }

    /* Campos de clase */
    return {
        nuevaVenta,
        getVenta,
        getVentas,
        updateVenta,
        getVentasPorUsuario
    };
}

export default VentasRepository;