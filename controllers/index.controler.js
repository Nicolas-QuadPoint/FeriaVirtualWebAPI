const path = require('path');

function indexController(req,res){

    try {

        res.status(200).sendFile(path.join(__dirname + '/../views/index.html'));

    } catch(err) {


        res.status(401).end();


    }

}


module.exports = function(objetoRouter){

    objetoRouter.route('/')
        .get(indexController);

}