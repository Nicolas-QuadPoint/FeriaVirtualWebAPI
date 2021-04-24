import Usuario from './Usuario.js';

class Minorista extends Usuario{

    nombre_minorista = 'nombre minorista';

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

export default Minorista;