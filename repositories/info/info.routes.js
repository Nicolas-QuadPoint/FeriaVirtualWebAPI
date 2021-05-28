import _infoRepository from './info.repository.js';

export default function(objetoRouter){

    const infoRepository = _infoRepository();

    objetoRouter.route('/api-objects/:objectid')
        .get(infoRepository.getAPIObjects);
    
    objetoRouter.route('/estados-contrato')
        .get(infoRepository.getEstadosContrato);
    
    objetoRouter.route('/estados-usuario')
        .get(infoRepository.getEstadosUsuario);

    objetoRouter.route('/estados-venta')
        .get(infoRepository.getEstadosVenta);

    objetoRouter.route('/estados-subasta')
        .get(infoRepository.getEstadosSubasta);

    objetoRouter.route('/tipos-venta')
        .get(infoRepository.getTiposVenta);

    objetoRouter.route('/tipos-subasta')
        .get(infoRepository.getTiposSubasta);

    objetoRouter.route('/tipos-producto')
        .get(infoRepository.getTiposProducto);
    
    objetoRouter.route('/roles-usuario')
        .get(infoRepository.getRolesUsuario);

    objetoRouter.route('/nacionalidades')
        .get(infoRepository.getNacionalidades);
    
}