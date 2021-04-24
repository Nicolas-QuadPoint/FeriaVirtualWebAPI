import Entity from './Entity.js';
import TipoProducto from './TipoProducto.js';

class Producto extends Entity{

    id_producto = 0;
    nombre = 'ninguno';
    volumen = 0.0;
    tipo_producto = new TipoProducto();
    costo_mantencion = 0.0;

    constructor(){
        super();
    }

    buildFromArray(arr = []){

        for(var i = 0; i < arr.length; i++){
            //Do nothing
        }
    }

    validate(){
        return false;
    }

}

export default Producto;