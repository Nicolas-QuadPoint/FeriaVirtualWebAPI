import express from 'express';
import AuthRoutes from '../repositories/auth/auth.routes.js';
import UsuariosRoutes from '../repositories/usuario/usuario.routes.js';
import VentasRoutes from '../repositories/venta/venta.routes.js';
import ProductosRoutes from '../repositories/producto/producto.routes.js';
import InfoRoutes from '../repositories/info/info.routes.js';

export default function() {
    const router = express.Router();
    var auth = AuthRoutes(router);
    var usuarios = UsuariosRoutes(router);
    var ventas = VentasRoutes(router);
    var productos = ProductosRoutes(router);
    var info = InfoRoutes(router);
    return router;
}