import _productoRepository from './producto.repository.js';
import AuthAutenticationService from '../auth/auth.autentication.service.js';

export default function(objetoRouter){

    const productoRepository = _productoRepository();

    /* Gestiono la operacion de obtencion de ventas */
    objetoRouter.route('/productos')
        .get(productoRepository.getProductos);

    /* Objeto para crear un nuevo usuario */
    objetoRouter.route('/producto/nuevo')
        .post(productoRepository.nuevoProducto);

    /* Método que se interpone entre las peticiones a esta url, para evaluar  */
    objetoRouter.use('/producto/:productoid', productoRepository.interceptarProductoPorID);
    
    /* Si el método interceptor evalua positivamente, deriva a estas operaciones  */
    objetoRouter.route('/producto/:productoid')
        .get(productoRepository.getProducto)
        .put(productoRepository.modificarProducto);

}