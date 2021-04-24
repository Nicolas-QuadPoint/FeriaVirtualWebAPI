const Entity = require('./Entity');
const EstadoVenta = require('./EstadoVenta');
const TipoSubasta = require('./TipoSubasta');
const Venta = require('./Venta');

class Subasta extends Entity{

    id_subasta = 0;
    fecha_inicio_subasta = '01-01-2000';
    fecha_fin_subasta = '01-01-2000';
    tipo_subasta = new TipoSubasta();
    estado_subasta = new EstadoVenta();
    venta = new Venta();

    /* Dependiendo del tipo de subasta generada, será una lista de objetos
       OfertaSubastaProductor o OfertaSubastaTrasnportista
     */
    ofertas = [];

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

module.exports = Subasta;