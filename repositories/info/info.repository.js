const { json } = require('express');
const ex = require('../../info/exceptions/exceptions');

/* Información de entidades! */
const Entities = require('../../entities/FeriaVirtualWebAPIEntities');

/* Definicion de clase */
function InfoRepository(conexion){

    function getAPIObjects(req,res){

        var expresionSoloLetras = /^[A-Za-z0-9]{1,}$/;

        try {

            /**
             * ESTO ES PELIGROSO. NO USAR ESTE MÉTODO PARA BUSCAR EN PRODUCCIÓN!!!
             */
            if(req.params.objectid && expresionSoloLetras.test(req.params.objectid)){

                res.status(200).json(new Entities[req.params.objectid]());

            } else {

                res.status(400).json(ex.InvalidArgumentException);

            }
            
        } catch(e) {

            if(e instanceof TypeError){
                res.status(404).json( ex.RecordNotFoundException );
            } else {
                res.status(500).json( ex.APIException );
            }

            console.error(`Pasó algo!: ${e}`);

        }

    }

    /* Campos de clase */
    return {
        getAPIObjects
    };
}

module.exports = InfoRepository;