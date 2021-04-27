import _infoRepository from './info.repository.js';

export default function(objetoRouter){

    const infoRepository = _infoRepository();

    objetoRouter.route('/info/api-objects/:objectid')
        .get(infoRepository.getAPIObjects);
    
    objetoRouter.route('/info/estados-contrato')
        .get(infoRepository.getEstadosContrato);
    
    objetoRouter.route('/info/estados-usuario')
        .get(infoRepository.getEstadosUsuario);

    objetoRouter.route('/info/estados-venta')
        .get(infoRepository.getEstadosVenta);

    objetoRouter.route('/info/estados-subasta')
        .get(infoRepository.getEstadosSubasta);

    objetoRouter.route('/info/tipos-venta')
        .get(infoRepository.getTiposVenta);

    objetoRouter.route('/info/tipos-subasta')
        .get(infoRepository.getTiposSubasta);

    objetoRouter.route('/info/tipos-producto')
        .get(infoRepository.getTiposProducto);
    
    objetoRouter.route('/info/roles-usuario')
        .get(infoRepository.getRolesUsuario);

    objetoRouter.route('/info/nacionalidades')
        .get(infoRepository.getNacionalidades);
    
}