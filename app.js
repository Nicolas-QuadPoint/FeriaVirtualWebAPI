import express, { static, json } from 'express';
import { join } from 'path';
import { config } from 'dotenv';

const app = express();
const apiroutes = require('./routes/api.routes')();
const webroutes = require('./routes/web.routes')();

/* https://en.wikipedia.org/wiki/List_of_HTTP_status_codes */

//Configuring enviromental values
config();


//Public resources - Todo debajo de la carpeta indicada,
//sera de acceso publico para el usuario
app.use(static(join(__dirname, 'public')));
app.set('views', join(__dirname, 'views'));

//Allow responses to be parsed to JSON.
app.use(json());

//Web Routes
app.use('/',webroutes);

//API Routes
app.use('/api/v1',apiroutes);

//Init the server
app.listen(3000,() => console.log('Servidor iniciado en puerto %d!',3000));