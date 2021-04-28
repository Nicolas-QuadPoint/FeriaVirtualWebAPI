import Entity from './Entity.js';
import Producto from './Producto.js';

class ParProductoCantidad extends Entity{

    producto = new Producto();
    cantidad = 0;
    
    constructor(){
        super();
    }

    clone(obj={},safe=false){
        
        if(safe){

            this.producto.clone(obj.producto,true);
            this.cantidad = util.isNullOrUndefined(obj.cantidad)? 0 : obj.cantidad;

        } else {

            this.producto.clone(obj.producto,false);
            this.cantidad = obj.cantidad;

        }

    }

    validate(){
        return true;
    }

}

export default ParProductoCantidad;