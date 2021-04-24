import Path from 'path';
import URL from 'url';

const __dirname = URL.fileURLToPath(import.meta.url);

function indexController(req,res){

    try {

        console.log(__dirname);

        res.status(200).sendFile(Path.join(__dirname + '/../../views/index.html'));

    } catch(err) {

        res.status(401).end();

    }

}


export default function(objetoRouter){

    objetoRouter.route('/')
        .get(indexController);

}