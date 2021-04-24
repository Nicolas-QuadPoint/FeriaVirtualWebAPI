import Entity from './Entity';

class EstadoContrato extends Entity{

    id_estado_contrato = 0;
    descripcion = 'estado_contrato';

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

export default EstadoContrato;