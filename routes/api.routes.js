const express = require('express'); 

function ApiRoutes() {
    const router = express.Router();
    var auth = require('../repositories/auth/auth.routes')(router);
    var usuarios = require('../repositories/usuario/usuario.routes')(router);
    var ventas = require('../repositories/venta/venta.routes')(router);
    var productos = require('../repositories/producto/producto.routes')(router);
    var info = require('../repositories/info/info.routes')(router);
    return router;
}

module.exports = ApiRoutes;