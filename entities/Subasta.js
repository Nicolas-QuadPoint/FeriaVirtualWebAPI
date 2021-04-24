import Entity from './Entity';
import EstadoVenta from './EstadoVenta';
import TipoSubasta from './TipoSubasta';
import Venta from './Venta';

class Subasta extends Entity{

    id_subasta = 0;
    fecha_inicio_subasta = '01-01-2000';
    fecha_fin_subasta = '01-01-2000';
    tipo_subasta = new TipoSubasta();
    estado_subasta = new EstadoVenta();
    venta = new Venta();

    //Tendrá registros solo si la subasta es para productores
    ofertas_productores = [

        //new OfertaSubastaProductor()

    ];

    //Tendrá registros solo si la subasta es para transportistas
    ofertas_transportistas = [

       // new OfertaSubastaTransportista()

    ];

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

export default Subasta;