import Usuario from './Usuario.js';

class Transportista extends Usuario{

    nombre_empresa = '';
    
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

export default Transportista;