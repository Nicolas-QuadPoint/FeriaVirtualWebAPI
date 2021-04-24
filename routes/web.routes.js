import { Router } from 'express'; 

function WebRoutes() {
    const router = Router();
    var indexcontroller = require('../controllers/index.controler')(router);
    return router;
}

export default WebRoutes;