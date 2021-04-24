const Entity = require('./Entity');
const TipoProducto = require('./TipoProducto');

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

module.exports = Producto;