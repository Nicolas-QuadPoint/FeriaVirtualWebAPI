import Entity from './Entity.js';

class Rol extends Entity{

    id_rol = 0;
    descripcion = 'rol';

    constructor(){
        super();
    }

    clone(obj={},safe=false){
        
        if(safe){

            this.id_rol = util.isNullOrUndefined(obj.id_rol)? 0 : obj.id_rol;
            this.descripcion = util.isNullOrUndefined(obj.descripcion)? ' ' : obj.descripcion;

        } else {

            this.id_rol = obj.id_rol;
            this.descripcion = obj.descripcion;

        }

    }

    validate(){
        return true;
    }

}

export default Rol;