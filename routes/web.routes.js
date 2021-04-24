import { Router } from 'express'; 
import IndexController from '../controllers/index.controler.js';

export default function(){
    const router = Router();
    var indexcontroller = IndexController(router);
    return router;
};