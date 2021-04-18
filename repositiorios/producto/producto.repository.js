const ConexionBD = require('../../db/oracledbconnector');
const utility = require('../../db/utility/utility');
const genericResponse = require('../../shared/response');
const MensajeException = require('../../db/utility/mensaje.exception');


function ProductoRepository(datos){

    function interceptarProductoPorID(req,res,next){
    
        return next();
    
    }

    function getProducto(req,res){
        
        try {

            res.status(500).json(
                new MensajeException(500,'NotImplemented','No Implementado mijo')
            );

        } catch(err) {

            res.status(500).json(err);

        }
    }
    
    function getProductos(req,res){
        
        try {
    
            var bd = new ConexionBD();
    
            bd.executeQuery('select * from table( pkg_producto.func_get_all_productos() )', {},{},
    
                function (error,result) {
                                            
                    if(error) { //Hay error
                        
                        res.status(500).json(new MensajeException(error.errorNum,'ApiError',error.message));
                    }
                    else if(result.rows){ 
    
                        res.status(200).json({ productos: result.rows } );
    
                    } else {
                        
                        res.status(404).json(
                            new MensajeException(404,'EmptyRecord','No hay registros')
                        );
    
                    }
    
                }    
            );
    
        } catch(err) {
    
            res.status(401).json( err );
    
        }
    
    }
    
    function nuevoProducto(req,res){
        res.status(500).json(
            new MensajeException(500,'NotImplemented','No Implementado mijo')
        );
    }
    
    
    function modificarProducto(req,res){
        res.status(500).json(
            new MensajeException(500,'NotImplemented','No Implementado mijo')
        );
    }

    return  {
        interceptarProductoPorID,
        getProducto,
        getProductos,
        nuevoProducto,
        modificarProducto
    };
}

module.exports = ProductoRepository;