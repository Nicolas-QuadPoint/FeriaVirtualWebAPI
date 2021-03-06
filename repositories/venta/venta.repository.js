import ConexionBD from '../../db/oracledbconnector.js';
import utility from '../../utilities/utilities.js';
import genericResponse from '../../shared/response.js';
import ex from '../../info/exceptions/exceptions.js';
import ObjetoVentaSimple from '../../entities/ObjetoVentaSimple.js';
import Venta from '../../entities/Venta.js';
import Ora from 'oracledb';
import ParProductoCantidad from '../../entities/ParProductoCantidad.js';

/**
 * 
 * Clase que posee las operaciones con las cuales gestionar 
 * ventas.
 * 
 * @param {Object} conexion Objeto que no tiene uso y que no debe 
 * tomarse en cuenta.
 * @return Una instancia de VentasRepository.
 */
function VentasRepository(conexion){
    
    /* Metodos de clase */

    /**
     * 
     * Función que permite crear una nueva Venta a la base de datos, iniciando 
     * el proceso de venta. Los datos de venta a crear deben estar en el 
     * cuerpo de la petición. Ahora mismo no hace nada. 
     * 
     * TODO: Crear la lógica para crear el objeto Venta para insertarla en 
     * la base de datos. 
     * 
     * @param {Request} req Objeto entregado por express para obtener datos 
     * de la petición.
     * @param {Response} res Objeto entregado por express para responder la 
     * petición.
     */
    function nuevaVenta(req,res){
        
        try {

            //var objeto = JSON.parse(req.body);
            
            //console.log(req.body);

            res.status(501).json( new ex.MethodNotImplementedException() );

        } catch(e) {

            res.status(401).json( e );

        }

    }

    /**
     * 
     * Función que permite obtener una venta por su ID. La información de 
     * venta es detallada, permitiendo obtener muchos más datos asociados, 
     * como el detalle de productos que son solicitados en la venta.
     * 
     * @param {Request} req Objeto entregado por express para obtener datos 
     * de la petición.
     * @param {Response} res Objeto entregado por express para responder la 
     * petición.
     */
    function getVenta(req,res){
       
        try {

            var venta_id = Number(req.params.ventaid);

            if(req.params.ventaid && !isNaN(venta_id)){ 

                var conn = new ConexionBD();

                //'tobj_descripcion_producto_venta'
                var parametros = {
                    p_id_venta:{ name:'p_id_venta', type: ConexionBD.dbTypes.INT, val: venta_id, dir: ConexionBD.dbTypes.IN },
                    p_info_venta:{ name:'p_info_venta', type: Ora.DB_TYPE_CURSOR, dir: ConexionBD.dbTypes.OUT },
                    p_lista_productos_venta:{ name:'p_lista_productos_venta', type: Ora.DB_TYPE_CURSOR, dir: ConexionBD.dbTypes.OUT }
                };

                conn.executeStoredProcedure("pkg_venta.proc_get_info_venta",
                parametros,{},
                function(e,results){
                    
                    if(e){

                        res.status(500).json( new ex.DatabaseErrorException() );
                        console.error(`Un error!: ${e.message}`);

                    } else if(results && results.outBinds) {

                        //Recuperamos los cursores!
                        var cursor_info_venta = results.outBinds.p_info_venta;
                        var cursor_productos_venta = results.outBinds.p_lista_productos_venta;
                        
                        //Este cursor SIEMPRE tendrá una fila!
                        cursor_info_venta.getRows(1,function(err,fila_venta){
                            
                            if(fila_venta && fila_venta[0]){

                                /**
                                 * Aquí vemos si podemos ver mas filas de productos!
                                 * Como no se cuantas filas hay para recuperar, mejor 
                                 * recupero todas de un zarpaso! El valor de esta funcion 
                                 * es estimada y por nada del mundo sera sobrepasada!!!
                                 */
                                cursor_productos_venta.getRows(65535,function(err,filas_productos){

                                    if(filas_productos){

                                        //console.log(filas_productos);
                                        
                                        /**
                                         * Aquí construyo el objeto de Ventas!!!
                                         */
                                        let objetoVenta = new Venta();
                                        console.log(fila_venta);
                                        objetoVenta.buildFromArray(fila_venta[0]);

                                        filas_productos.forEach( producto => {
                                            let nuevoParProductoCantidad = new ParProductoCantidad();
                                            nuevoParProductoCantidad.buildFromArray(producto);
                                            objetoVenta.productos_venta.push(nuevoParProductoCantidad);
                                        });

                                        res.status(200).json(objetoVenta);

                                    } else {

                                        if(err){console.log(err);}
                                        res.status(404).json(new ex.RecordNotFoundException());

                                    }

                                    /** Cerramos el cursor cursor_productos_venta */
                                    cursor_productos_venta.close(function(err){});

                                });

                            } else {

                                if(err){console.log(err);}
                                res.status(404).json(new ex.RecordNotFoundException());

                            }

                            /** Cerramos el cursor cursor_info_venta */
                            cursor_info_venta.close(function(err){});
                        });

                    } else {

                        res.status(404).json( new ex.RecordNotFoundException() );

                    }

                });


            } else {

                res.status(400).json( new ex.InvalidArgumentException() );

            }

        } catch(e) {

            res.status(500).json( e );

        }

    }

    /**
     * 
     * Función que busca las ventas asociadas al ID del usuario indicado en 
     * la ruta de la petición, y devuelve una lista de registros de venta 
     * encontrados, en formato JSON.
     * 
     * @param {Request} req Objeto entregado por express para obtener datos 
     * de la petición.
     * @param {Response} res Objeto entregado por express para responder la 
     * petición.
     */
    function getVentasPorUsuario(req,res){
        
        try {

            var usu_id = Number(req.params.usuarioid);

            if(req.params.usuarioid && !isNaN(usu_id)){

                var conn = new ConexionBD();

                var parametros = {
                    usuarioid:{ name:'usuarioid', type: ConexionBD.dbTypes.INT, val: usu_id, dir: ConexionBD.dbTypes.IN }
                };

                conn.executeQuery("select * from table ( pkg_venta.func_get_all_ventas_usuario(:usuarioid) )",parametros,{},
                function(e,results){
                    
                    if(e){

                        res.status(500).json( new ex.DatabaseErrorException() );
                        console.error(`Un error!: ${e.message}`);

                    } else if(results && results.rows[0]) {

                        res.status(200).json( { ventas : results.rows } );

                    } else {

                        res.status(404).json( new ex.RecordNotFoundException());

                    }

                });


            } else {

                res.status(400).json( new ex.InvalidArgumentException() );

            }

        } catch(e) {

            res.status(500).json( e );

        }
    }


    /**
     * 
     * Función que retorna una lista de todas las ventas creadas hasta el 
     * momento en la base de datos. El resultado de venta es simple y no 
     * contiene los detalles de la venta como lo hace la función getVenta. 
     * 
     * 
     * 
     * @param {Request} req Objeto entregado por express para obtener datos 
     * de la petición.
     * @param {Response} res Objeto entregado por express para responder la 
     * petición.
     */
    function getVentas(req,res){

        try {
            
            var conn = new ConexionBD();

            conn.executeQuery('select * from table (pkg_venta.func_get_all_ventas_simple() )',{}, 
            { outFormat : Ora.OUT_FORMAT_ARRAY },
            function(e,result){
                
                if(e){

                    res.status(500).json( new ex.DatabaseErrorException() );
                    console.error(`Un error!: ${e.message}`);

                } else if(result && result.rows) {
                    
                    var arr_ventas = [];
                    result.rows.forEach(function(value,index,array){
                        
                        var itemVentaSimple = new ObjetoVentaSimple();
                        itemVentaSimple.buildFromArray(result.rows[index]);
                        arr_ventas.push(itemVentaSimple);

                    });

                    
                    res.status(200).json( { ventas : arr_ventas } );

                } else {

                    res.status(404).json( new ex.RecordNotFoundException() );

                }

            });

        } catch(e) {

            res.status(500).json( e );
            console.error(e);

        }

    }

    /**
     * 
     * Función que actualiza el registro de venta, obteniendo los datos a 
     * modificar en el cuerpo de la petición. Ahora mismo no hace nada.
     * 
     * TODO: Agregar la lógica para modficar el registro de venta.
     * 
     * @param {Request} req Objeto entregado por express para obtener datos 
     * de la petición.
     * @param {Response} res Objeto entregado por express para responder la 
     * petición.
     */
    function updateVenta(req,res){

        try {

            res.status(501).json( new ex.MethodNotImplementedException() );

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