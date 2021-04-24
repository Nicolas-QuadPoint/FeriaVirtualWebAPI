import Entity from './Entity';

class TipoSubasta extends Entity{

    id_tipo_subasta = 0;
    descripcion = 'tipo_subasta';

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

export default TipoSubasta;