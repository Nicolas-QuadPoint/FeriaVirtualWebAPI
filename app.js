import express from 'express';
import Path from 'path';
import URL from 'url';
import DotEnv from 'dotenv';
import WebRoutes from './routes/web.routes.js';
import APIRoutes from './routes/api.routes.js';

const app = express();
const apiRoutes = APIRoutes();
const webRoutes = WebRoutes();

/* https://stackoverflow.com/a/62892482 */
const __dirname = URL.fileURLToPath(import.meta.url);

//Configuring enviromental values
DotEnv.config();


//Public resources - Todo debajo de la carpeta indicada,
//sera de acceso publico para el usuario
app.use(express.static(Path.join(__dirname, '../public')));
app.set('views', Path.join(__dirname, '../views'));

//Usamos las cookies
//app.use(cookieParser());

//Allow responses to be parsed to JSON.
app.use(express.json());

//Web Routes
app.use('/',webRoutes);

//API Routes
app.use('/api/v1',apiRoutes);

//Init the server
app.listen(3000,() => console.log('Servidor iniciado en puerto %d!',3000));