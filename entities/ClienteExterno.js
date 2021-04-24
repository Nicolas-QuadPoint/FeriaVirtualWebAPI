import Usuario from './Usuario.js';

class ClienteExterno extends Usuario{

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

export default ClienteExterno;