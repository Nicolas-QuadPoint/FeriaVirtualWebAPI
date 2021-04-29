import ConexionBD from '../../db/oracledbconnector.js';
import ex from '../../info/exceptions/exceptions.js';
import Producto from '../../entities/Producto.js';


function ProductoRepository(datos){

    function interceptarProductoPorID(req,res,next){
    
        return next();
    
    }

    function getProducto(req,res){
        
        try {

            if(req.query.productoid){
                
                var conn = new ConexionBD();
                var parametros = {

                    productoid : { name:'productoid', type: ConexionBD.dbTypes.INT, val: req.query.productoid, dir: ConexionBD.dbTypes.IN }

                };
                
                conn.executeQuery("select * from table( pkg_producto.func_get_producto( :productoid ) )",
                    parametros,{},
                    function(e,results){
                        
                        if(e){
                            
                            res.status(404).json(new ex.RecordNotFoundException());
                            console.error(`Un e!:${e.message}`);

                        } else {

                            res.status(200).json(  results.rows[0]  );

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