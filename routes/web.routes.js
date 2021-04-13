const express = require('express'); 

function webRoutes() {
    const router = express.Router();
    var web = require('../controllers/index.controler')(router);
    return router;
}

module.exports = webRoutes;