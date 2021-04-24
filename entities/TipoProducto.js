import Entity from './Entity.js';

class TipoProducto extends Entity{

    id_tipo_producto = 0;
    descripcion = 'tipo_producto';

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

export default TipoProducto;