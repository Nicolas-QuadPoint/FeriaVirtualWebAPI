const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
const apiroutes = require('./routes/api.routes')();
const webroutes = require('./routes/web.routes')();

//Public resources
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

//Converters to json requests
app.use(express.json());

//Routes
app.use('/',webroutes);

//Api Routes
app.use('/api/v1',apiroutes);

//Init the server
app.listen(3000,() => console.log('Servidor iniciado en puerto %d!',3000));