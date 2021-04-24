const Entity = require('./Entity');
const Subasta = require('./Subasta');
const Transportista = require('./Transportista');

class OfertaSubastaTransportista extends Entity{

    id_subasta_productor = 0;
    descripcion_propuesta = 'descripcion_propuesta';
    fecha = '01-01-2000';
    transportista = new Transportista();
    seleccionado = false;
    subasta = new Subasta();

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

module.exports = OfertaSubastaTransportista;