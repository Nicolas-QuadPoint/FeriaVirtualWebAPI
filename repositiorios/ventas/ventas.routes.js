const _ventasRepository = require('./ventas.repository');

module.exports = function(objetoRouter){

    const ventasRepository = _ventasRepository();

    /* Gestiono la operacion de obtencion de ventas */
    objetoRouter.route('/ventas')
        .get(ventasRepository.getAll);
    
    objetoRouter.route('/ventas/:usuarioid')
        .get(ventasRepository.getVentasPorUsuario);

}