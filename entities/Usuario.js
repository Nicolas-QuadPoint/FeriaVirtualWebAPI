import Entity from './Entity.js';
import EstadoContrato from './EstadoContrato.js';
import EstadoUsuario from './EstadoUsuario.js';
import Nacionalidad from './Nacionalidad.js';
import Rol from './Rol.js';

import util from '../utilities/utilities.js';

class Usuario extends Entity{

    id_usuario = 0;
    personal_id = '111111111';
    nombre = 'Usuario'
    nombre_segundo = 'Nombre segundo';
    apellido_paterno = 'Apellido paterno';
    apellido_materno = 'Apellido materno';
    fecha_nacimiento  = '01-01-2000';
    telefono = 123456789;
    direccion = 'Direccion';
    email  = 'email@domain.cc';
    contrasena  = 'Contraseña';
    salt_contrasena = 'Salt Contraseña';
    nacionalidad = new Nacionalidad();
    rol = new Rol();
    estado_usuario = new EstadoUsuario();
    estado_contrato = new EstadoContrato();

    constructor(){
        super();
    }

    buildFromArray(arr = []){

        this.id_usuario = arr[0];
        this.personal_id = arr[1];
        this.nombre = arr[2];
        this.nombre_segundo = arr[3];
        this.apellido_paterno = arr[4];
        this.apellido_materno = arr[5];
        this.fecha_nacimiento  = arr[6];
        this.telefono = arr[7];
        this.direccion = arr[8];
        this.email  = arr[9];
        //Por temas de seguridad, estos valores deben ser
        //instanciados manualmente
        //this.contrasena  = arr[10];
        //this.salt_contrasena = arr[11];
        this.nacionalidad.id_nacionalidad = arr[10];
        this.nacionalidad.nombre = arr[11];
        this.nacionalidad.iso = arr[12];
        this.nacionalidad.codigo_telefonico = arr[13];
        this.rol.id_rol = arr[14];
        this.rol.descripcion = arr[15];
        this.estado_usuario.id_estado_usuario = arr[16];
        this.estado_usuario.descripcion = arr[17];
        this.estado_contrato.id_estado_contrato = arr[18];
        this.estado_contrato.descripcion = arr[19];

    }

    clone(obj = {},safe = false){

        if(safe){

            this.id_usuario = util.isNullOrUndefined(obj.id_usuario)? 0 : obj.id_usuario;
            this.personal_id = util.isNullOrUndefined(obj.personal_id)? 0 : obj.personal_id;
            this.nombre = util.isNullOrUndefined(obj.nombre)? ' ' : obj.nombre;
            this.nombre_segundo = util.isNullOrUndefined(obj.nombre_segundo)? ' ' : obj.nombre_segundo;
            this.apellido_paterno = util.isNullOrUndefined(obj.apellido_paterno)? ' ' : obj.apellido_paterno;
            this.apellido_materno = util.isNullOrUndefined(obj.apellido_materno)? ' ' : obj.apellido_materno;
            this.fecha_nacimiento  = util.isNullOrUndefined(obj.fecha_nacimiento)? ' ' : obj.fecha_nacimiento;
            this.telefono = util.isNullOrUndefined(obj.telefono)? 0 : obj.telefono;
            this.direccion = util.isNullOrUndefined(obj.direccion)? ' ' : obj.direccion;
            this.email  = util.isNullOrUndefined(obj.email)? ' ' : obj.email;
            this.contrasena  = util.isNullOrUndefined(obj.contrasena)? ' ' : obj.contrasena;
            this.salt_contrasena = util.isNullOrUndefined(obj.id_usuario)? 0 : obj.id_usuario;
            
            this.nacionalidad.clone(obj.nacionalidad,true);
            this.rol.clone(obj.rol,true);
            this.estado_usuario.clone(obj.estado_usuario,true);
            this.estado_contrato.clone(obj.estado_contrato,true);

        } else {

            this.id_usuario = obj.id_usuario;
            this.personal_id = obj.personal_id;
            this.nombre = obj.nombre;
            this.nombre_segundo = obj.nombre_segundo;
            this.apellido_paterno = obj.apellido_paterno;
            this.apellido_materno = obj.apellido_materno;
            this.fecha_nacimiento  = obj.fecha_nacimiento;
            this.telefono = obj.telefono;
            this.direccion = obj.direccion;
            this.email  = obj.email;
            this.contrasena  = obj.contrasena;
            this.salt_contrasena = obj.salt_contrasena;

            this.nacionalidad.clone(obj.nacionalidad,false);
            this.rol.clone(obj.rol,false);
            this.estado_usuario.clone(obj.estado_usuario,false);
            this.estado_contrato.clone(obj.estado_contrato,false);
        }

    }

    validate(){
        return (

            ( !util.isNullOrUndefined(this.id_usuario) )&&
            ( !util.isNullOrUndefined(this.personal_id) ) &&
            ( !util.isNullOrUndefined(this.nombre) && util.isNameValid(this.nombre) ) &&
            ( !util.isNullOrUndefined(this.nombre_segundo) && util.isNameValid(this.nombre_segundo) ) &&
            ( !util.isNullOrUndefined(this.apellido_paterno) && util.isNameValid(this.apellido_paterno) ) &&
            ( !util.isNullOrUndefined(this.apellido_materno) && util.isNameValid(this.apellido_materno) ) &&
            ( !util.isNullOrUndefined(this.fecha_nacimiento) ) &&
            ( !util.isNullOrUndefined(this.telefono) ) &&
            ( !util.isNullOrUndefined(this.direccion) ) &&
            ( !util.isNullOrUndefined(this.email) && util.isEmailValid(this.email) ) &&
            ( !util.isNullOrUndefined(this.contrasena) ) &&
            ( !util.isNullOrUndefined(this.salt_contrasena) ) &&
            ( this.nacionalidad.validate() ) &&
            ( this.rol.validate() ) &&
            ( this.estado_usuario.validate() ) &&
            ( this.estado_contrato.validate() )


        );
    }

}

export default Usuario;