import Entity from './Entity.js';

class EstadoUsuario extends Entity{

    id_estado_usuario = 0;
    descripcion = 'estado_usuario';

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

export default EstadoUsuario;