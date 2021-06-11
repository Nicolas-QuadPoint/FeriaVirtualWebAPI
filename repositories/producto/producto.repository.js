import ConexionBD from '../../db/oracledbconnector.js';
import ex from '../../info/exceptions/exceptions.js';
import Producto from '../../entities/Producto.js';


/**
 * ProductoRepository
 * 
 * Contiene las operaciones para obtener, modificar y 
 * crear productos en la base de datos.
 * 
 * @param {Object} conexion Objeto sin usar que no debe tomarse 
 * en cuenta por ahora.
 * @return Una instancia de la clase ProductoRepository
 */
function ProductoRepository(conexion){

    /**
     * Funcion interceptor que capta toda petición que incluya 
     * la ruta productos/:productoid en su ruta. Por ahora 
     * no hace mucho, así que puede que sea removida en un 
     * futuro. 
     * 
     * @param {Request} req Objeto entregado por express para 
     * obtener datos de la petición.
     * @param {Response} res Objeto entregado por express para 
     * responder la petición.
     * @param {Function} next Funcion que permite continuar con la 
     * petición. 
     * @return Un objeto entregado por express
     */
    function interceptarProductoPorID(req,res,next){
    
        return next();
    
    }

    /**
     * 
     * Obtiene un objeto Producto de la base de datos, y la 
     * devuelve al usuario en forma de objeto JSON. Si sucede algo, 
     * retorna un objeto Exception y el código de respuesta http 
     * variará dependiendo del error generado. 
     * 
     * @param {Request} req Objeto entregado por express para 
     * obtener datos de la petición.
     * @param {Response} res Objeto entregado por express para 
     * responder la petición.
     */
    function getProducto(req,res){
        
        try {

            if(req.params.productoid){
                
                var idProd = Number(req.params.productoid);
                var conn = new ConexionBD();
                var parametros = {

                    productoid : { name:'productoid', type: ConexionBD.dbTypes.INT, val: idProd, dir: ConexionBD.dbTypes.IN }

                };
                
                conn.executeQuery("select * from table( pkg_producto.func_get_producto( :productoid ) )",
                    parametros,{},
                    function(e,result){
                        
                        if(e){
                            
                            res.status(404).json(new ex.RecordNotFoundException());
                            console.error(`Un error en getProducto!:${e.message}`);

                        } else if(result && result.rows[0]) {
                            
                            var p = new Producto();
                            p.buildFromArray(result.rows[0]);
                            res.status(200).json({ producto : p });

                        }

                    });

            } else {


                res.status(400).json( ex.Exception.new(400,"ClientException","Debe especificar el campo id del producto en la url!") );

            }

        } catch(e) {

            res.status(500).json(e);
            console.error(`Un e!:${e.message}`);

        }
    }
    
    /**
     * 
     * Obtiene la lista de productos de la base de datos, entregando 
     * como resultado un array de objetos JSON al cliente, o un 
     * objeto Exception en caso de error. 
     * 
     * @param {Request} req Objeto entregado por express para 
     * obtener datos de la petición.
     * @param {Response} res Objeto entregado por express para 
     * responder la petición.
     */
    function getProductos(req,res){
        
        try {
    
            var bd = new ConexionBD();
    
            bd.executeQuery('select * from table( pkg_producto.func_get_all_productos() )', {},{},
    
                function (e,result) {
                                            
                    if(e) { //Hay e
                        
                        res.status(500).json( new ex.DatabaseErrorException() );
                        console.error(`Un e!:${e.message}`);

                    }
                    else if(result.rows){ 
    
                        res.status(200).json({ productos: result.rows } );
    
                    } else {
                        
                        res.status(404).json( new ex.RecordNotFoundException() );
    
                    }
    
                }    
            );
    
        } catch(e) {
    
            res.status(401).json( e );
    
        }
    
    }
    
    /**
     * Permite crear un nuevo objeto Producto y guardarlo en 
     * la base de datos. 
     * El cliente debe enviar un objeto Producto con sus datos, 
     * en forma de objeto JSON en el cuerpo de la petición. 
     * Esta función lee dichos datos y recrea el objeto para así 
     * insertarlo en la base de datos. 
     * 
     * Si la creación de producto es exitosa, un objeto del tipo 
     * ResultadoID será devuelto, con el ID del producto insertado, 
     * o un objeto Exception en caso de error. 
     * 
     * @param {Request} req Objeto entregado por express para 
     * obtener datos de la petición.
     * @param {Response} res Objeto entregado por express para 
     * responder la petición.
     */
    function nuevoProducto(req,res){

        try{

            var p = new Producto();
            var succ = 0;
            p.clone(req.body);

            var parametros = {
                p_nombre:{ name:'p_nombre', type: ConexionBD.dbTypes.VARCHAR, val:p.nombre, dir: ConexionBD.dbTypes.IN },
                p_volumen:{ name:'p_volumen', type: ConexionBD.dbTypes.INT, val:p.volumen, dir: ConexionBD.dbTypes.IN },
                p_tipo_producto:{ name:'p_tipo_producto', type: ConexionBD.dbTypes.INT, val:p.tipo_producto.id_tipo_producto, dir: ConexionBD.dbTypes.IN },
                p_costo_mantencion:{ name:'p_costo_mantencion', type: ConexionBD.dbTypes.INT, val:p.costo_mantencion, dir: ConexionBD.dbTypes.IN },
                exito:{ name:'exito', type: ConexionBD.dbTypes.INT, val:succ, dir: ConexionBD.dbTypes.INOUT }
            };

            if(p.validate()){

                bd.executeStoredProcedure(`pkg_producto.proc_crear_producto`,parametros,{},
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

                res.status(400).json( new ex.InvalidArgumentException() );

            }

        } catch(e) {

            res.status(500).json( new ex.APIException() );
        }

    }
    
    /**
     * 
     * TODO: Crear la lógica que permita modificar el producto 
     * en la base de datos! 
     * 
     * @param {Request} req Objeto entregado por express para 
     * obtener datos de la petición.
     * @param {Response} res Objeto entregado por express para 
     * responder la petición.
     */
    function modificarProducto(req,res){
        res.status(500).json( new ex.MethodNotImplementedException() );
    }

    return  {
        interceptarProductoPorID,
        getProducto,
        getProductos,
        nuevoProducto,
        modificarProducto
    };
}

export default ProductoRepository;