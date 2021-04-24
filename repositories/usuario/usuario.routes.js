import _usuarioRepository from './usuario.repository';

/* https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/ */

export default function(objetoRouter){

    const usuarioRepository = _usuarioRepository();

    objetoRouter.route('/usuarios')
        .get(usuarioRepository.getUsuarios);

    objetoRouter.route('/usuarios/nuevo-productor')
        .post(usuarioRepository.nuevoUsuario);
    
    objetoRouter.route('/usuarios/nuevo-cliente')
        .post(usuarioRepository.nuevoUsuario);
    
    objetoRouter.route('/usuarios/nuevo-admin')
        .post(usuarioRepository.nuevoUsuario);


    /* Método que se interpone entre las peticiones a esta url, para evaluar  */
    objetoRouter.use('/usuario/:usuarioid', usuarioRepository.interceptarUsuarioPorID);
    
    /* Si el método interceptor evalua positivamente, deriva a estas operaciones  */
    objetoRouter.route('/usuario/:usuarioid')
        .get(usuarioRepository.getUsuario)
        .put(usuarioRepository.modificarUsuario)
        .delete(usuarioRepository.deshabilitarUsuario);

}