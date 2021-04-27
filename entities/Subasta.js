import Entity from './Entity.js';
import EstadoVenta from './EstadoVenta.js';
import TipoSubasta from './TipoSubasta.js';
import Venta from './Venta.js';

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

}

export default Subasta;