const express = require('express'); 

function apiRoutes() {
    const router = express.Router();
    var auth = require('../repositiorios/auth/aurh.routes')(router);
    var usuarios = require('../repositiorios/usuarios/usuarios.routes')(router);
    var ventas = require('../repositiorios/ventas/ventas.routes')(router);
    return router;
}

module.exports = apiRoutes;