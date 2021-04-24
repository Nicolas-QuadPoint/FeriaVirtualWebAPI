const Entity = require('./Entity');
const EstadoContrato = require('./EstadoContrato');
const EstadoUsuario = require('./EstadoUsuario');
const Nacionalidad = require('./Nacionalidad');
const Rol = require('./Rol');

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

    validate(){
        return false;
    }

}

module.exports = Usuario;