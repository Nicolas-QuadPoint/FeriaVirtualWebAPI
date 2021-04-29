import Entity from './Entity.js';
import TipoProducto from './TipoProducto.js';
import util from '../utilities/utilities.js';

class Producto extends Entity{

    id_producto = 0;
    nombre = 'ninguno';
    volumen = 0.0;
    tipo_producto = new TipoProducto();
    costo_mantencion = 0.0;

    constructor(){
        super();
    }

    clone(obj={},safe=false){
        
        if(safe){

            this.id_producto = util.isNullOrUndefined(obj.id_producto)? 0 : obj.id_producto;
            this.nombre = util.isNullOrUndefined(obj.nombre)? ' ' : obj.nombre;
            this.volumen = util.isNullOrUndefined(obj.cantidad)? 0.0 : obj.cantidad;

            this.tipo_producto.clone(obj.tipo_producto,true);

            this.costo_mantencion = util.isNullOrUndefined(obj.costo_mantencion)? 0.0 : obj.costo_mantencion;

        } else {

            this.id_producto = obj.id_producto;
            this.nombre = obj.nombre;
            this.volumen = obj.cantidad;

            this.tipo_producto.clone(obj.tipo_producto,false);

            this.costo_mantencion = obj.costo_mantencion;

        }

    }

    validate(){

        return (

            ( !util.isNullOrUndefined(this.nombre) ) &&
            ( !util.isNullOrUndefined(this.nombre) && util.isNameValid(this.nombre) ) &&
            ( !util.isNullOrUndefined(this.volumen) && this.volumen > 0.0 ) &&
            ( !util.isNullOrUndefined(this.costo_mantencion) && this.costo_mantencion > 0.0 ) &&
            ( !util.isNullOrUndefined(this.tipo_producto) && this.tipo_producto.validate() )

        );

    }

}

export default Producto;