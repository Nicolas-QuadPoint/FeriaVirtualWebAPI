import { join } from 'path';

function indexController(req,res){

    try {

        res.status(200).sendFile(join(__dirname + '/../views/index.html'));

    } catch(err) {

        res.status(401).end();

    }

}


export default function(objetoRouter){

    objetoRouter.route('/')
        .get(indexController);

}