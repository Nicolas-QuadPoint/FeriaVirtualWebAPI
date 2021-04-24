const Entity = require('./Entity');

class Nacionalidad extends Entity{

    id_nacionalidad = 0;
    iso = 'cl';
    nombre = 'Chile';
    codigo_telefonico = 56;

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

module.exports = Nacionalidad;