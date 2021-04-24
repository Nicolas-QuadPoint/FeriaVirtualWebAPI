import ConexionBD, { dbTypes } from '../../db/oracledbconnector';
import { RecordNotFoundException, Exception, DatabaseErrorException, MethodNotImplementedException } from '../../info/exceptions/exceptions';


function ProductoRepository(datos){

    function interceptarProductoPorID(req,res,next){
    
        return next();
    
    }

    function getProducto(req,res){
        
        try {

            if(req.query.productoid){
                
                var conn = new ConexionBD();
                var parametros = {

                    productoid : { name:'productoid', type: dbTypes.INT, val: req.query.productoid, dir: dbTypes.IN }

                };
                
                conn.executeQuery("select * from table( pkg_producto.func_get_producto( :productoid ) )",
                    parametros,{},
                    function(e,results){
                        
                        if(e){
                            
                            res.status(404).json(RecordNotFoundException);
                            console.error(`Un e!:${e.message}`);

                        } else {

                            res.status(200).json(  results.rows[0]  );

                        }

                    });

            } else {


                res.status(400).json( new Exception(400,"ClientException","Debe especificar el campo id del producto en la url!") );

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
                        
                        res.status(500).json( DatabaseErrorException );
                        console.error(`Un e!:${e.message}`);

                    }
                    else if(result.rows){ 
    
                        res.status(200).json({ productos: result.rows } );
    
                    } else {
                        
                        res.status(404).json( RecordNotFoundException );
    
                    }
    
                }    
            );
    
        } catch(e) {
    
            res.status(401).json( e );
    
        }
    
    }
    
    function nuevoProducto(req,res){
        res.status(500).json(
            new MensajeException(500,'NotImplemented','No Implementado mijo')
        );
    }
    
    
    function modificarProducto(req,res){
        res.status(500).json( MethodNotImplementedException );
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