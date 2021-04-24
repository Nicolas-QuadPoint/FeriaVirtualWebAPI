import Entity from './Entity';
import Usuario from './Usuario';
import EstadoVenta from './EstadoVenta';
import TipoVenta from './TipoVenta';
import ParProductoCantidad from './ParProductoCantidad';

class Venta extends Entity{

    id_venta = 0;
    fecha_inicio_venta = '01-01-2000';
    fecha_fin_venta = '01-01-2000';
    comentarios_venta = 'Comentarios.';
    monto_total = 0;
    comision = 0.0;
    usuario_autor = new Usuario();
    estado_venta = new EstadoVenta();
    tipo_venta = new TipoVenta();
    productos_venta = [
        new ParProductoCantidad(),
        new ParProductoCantidad()
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

export default Venta;