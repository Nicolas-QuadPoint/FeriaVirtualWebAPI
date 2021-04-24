import Entity from './Entity.js';
import Subasta from './Subasta.js';
import Transportista from './Transportista.js';

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

export default OfertaSubastaTransportista;