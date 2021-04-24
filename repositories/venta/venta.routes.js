import _ventasRepository from './venta.repository';

export default function(objetoRouter){

    const ventasRepository = _ventasRepository();

    /* Gestiono la operacion de obtencion de ventas */
    objetoRouter.route('/ventas')
        .get(ventasRepository.getVentas);

    objetoRouter.route('/ventas/nuevo')
        .post(ventasRepository.nuevaVenta);
    
    objetoRouter.route('/ventas/:ventaid')
        .get(ventasRepository.getVenta)
        .put(ventasRepository.updateVenta);

    objetoRouter.route('/ventas/usuario/:usuarioid')
        .get(ventasRepository.getVentasPorUsuario)

}