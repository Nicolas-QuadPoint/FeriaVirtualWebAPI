import Entity from './Entity.js';

class EstadoVenta extends Entity{

    id_estado_venta = 0;
    descripcion = 'estado_venta';

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

export default EstadoVenta;