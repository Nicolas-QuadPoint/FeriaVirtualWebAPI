import Entity from './Entity';
import Subasta from './Subasta';
import Producto from './Producto';
import Productor from './Productor';

class OfertaSubastaProductor extends Entity{

    id_subasta_productor = 0;
    unidades_producto = 0;
    precio_unidad = 0;
    producto = new Producto();
    productor = new Productor();
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

export default OfertaSubastaProductor;