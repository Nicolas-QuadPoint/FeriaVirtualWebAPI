const Entity = require('./Entity');

class EstadoSubasta extends Entity{

    id_estado_subasta = 0;
    descripcion = 'estado_subasta';

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

module.exports = EstadoSubasta;