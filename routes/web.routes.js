const express = require('express'); 

function WebRoutes() {
    const router = express.Router();
    var indexcontroller = require('../controllers/index.controler')(router);
    return router;
}

module.exports = WebRoutes;