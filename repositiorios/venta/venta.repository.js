const ConexionBD = require('../../db/oracledbconnector');
const utility = require('../../db/utility/utility');
const genericResponse = require('../../shared/response');
const MensajeException = require('../../db/utility/mensaje.exception');

/* Definicion de clase */
function VentasRepository(datos){
    
    /* Metodos de clase */
    
    function getInfo(req,res){
        
        try {

            res.status(500).json(
                new MensajeException(500,'NotImplemented','No implementado mijo')
            );

        } catch(err) {

            res.status(401).json( { error:err.message } );

        }

    }

    function getVentasPorUsuario(req,res){
        
        try {

            res.status(500).json(
                new MensajeException(500,'NotImplemented','No implementado mijo')
            );

        } catch(err) {

            res.status(401).json( { error:err.message } );

        }
    }

    function getAll(req,res){

        try {

            res.status(500).json(
                new MensajeException(500,'NotImplemented','No implementado mijo')
            );

        } catch(err) {

            res.status(401).json( { error:err.message } );

        }

    }

    function updateInfo(req,res){

        try {

            res.status(500).json(
                new MensajeException(500,'NotImplemented','No implementado mijo')
            );

        } catch(err) {

            res.status(401).json( { error:err.message } );

        }

    }

    /* Campos de clase */
    return {
        getInfo,
        getAll,
        updateInfo,
        getVentasPorUsuario
    };
}

module.exports = VentasRepository;