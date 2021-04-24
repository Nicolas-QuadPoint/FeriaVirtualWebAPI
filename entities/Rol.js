import Entity from './Entity.js';

class Rol extends Entity{

    id_rol = 0;
    description = 'rol';

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

export default Rol;