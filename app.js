const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
const apiroutes = require('./routes/api.routes')();
const webroutes = require('./routes/web.routes')();

/* https://en.wikipedia.org/wiki/List_of_HTTP_status_codes */

//Configuring enviromental values
dotenv.config();


//Public resources - Todo debajo de la carpeta indicada,
//sera de acceso publico para el usuario
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

//Allow responses to be parsed to JSON.
app.use(express.json());

//Web Routes
app.use('/',webroutes);

//API Routes
app.use('/api/v1',apiroutes);

//Init the server
app.listen(3000,() => console.log('Servidor iniciado en puerto %d!',3000));