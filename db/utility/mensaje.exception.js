
function MensajeException(codigo,nombre,mensaje){

    this.codigo = codigo;
    this.nombre = nombre;
    this.mensaje = mensaje;

    return this;
}


module.exports = MensajeException;