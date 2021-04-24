const Usuario = require('./Usuario');

class Productor extends Usuario{

    productos_asociados = [];

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

module.exports = Productor;