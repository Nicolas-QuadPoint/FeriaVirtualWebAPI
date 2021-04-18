const express = require('express'); 

function webRoutes() {
    const router = express.Router();
    var indexcontroller = require('../controllers/index.controler')(router);
    return router;
}

module.exports = webRoutes;