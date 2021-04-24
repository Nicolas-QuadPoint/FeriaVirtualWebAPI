const Entity = require('./Entity');

class TipoVenta extends Entity{

    id_tipo_venta = 0;
    descripcion = 'tipo_venta';

    constructor(){
        super();
    }

    buildFromArray(arr = []){

        for(var i = 0; i < arr.length; i++){
            //Do nothing
        }
    }

    validate(){
        return true;
    }

}

module.exports = TipoVenta;