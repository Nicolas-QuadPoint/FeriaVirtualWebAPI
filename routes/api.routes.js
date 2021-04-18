const express = require('express'); 

function apiRoutes() {
    const router = express.Router();
    var auth = require('../repositiorios/auth/auth.routes')(router);
    var usuarios = require('../repositiorios/usuario/usuario.routes')(router);
    var ventas = require('../repositiorios/venta/venta.routes')(router);
    var productos = require('../repositiorios/producto/producto.routes')(router);
    return router;
}

module.exports = apiRoutes;