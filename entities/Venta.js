const Entity = require('./Entity');
const Usuario = require('./Usuario');
const EstadoVenta = require('./EstadoVenta');
const TipoVenta = require('./TipoVenta');

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
    productos_venta = [];

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

module.exports = Venta;