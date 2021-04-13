const _usuarioRepository = require('./usuario.repository');
const conexionBD = require('../../db/sqlserverconnector');

module.exports = function(objetoRouter){

    const usuarioRepository = _usuarioRepository();

    /* Gestiono la operacion de obtencion de ventas */
    objetoRouter.route('/usuario')
        .get(usuarioRepository.getAll);

    objetoRouter.use('/usuario/:usuarioid', usuarioRepository.interceptGetUser);
    
    objetoRouter.route('/usuario/:usuarioid')
        .get(usuarioRepository.getUser)
        .put(usuarioRepository.updateUser);

}