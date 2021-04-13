const sqlserver = require('../../db/sqlserverconnector');
const utility = require('../../db/utility/utility');
const TYPES = require('tedious').TYPES;
const genericResponse = require('../../shared/response');

/* Definicion de clase */
function VentasRepository(conexiondb){
    
    /* Metodos de clase */
    
    function getInfo(req,res){
        
        try {

            res.status(401).json( { error:'No impementado aun mijo' } );

        } catch(err) {

            res.status(401).json( { error:err.message } );

        }

    }

    function getVentasPorUsuario(req,res){
        
        try {

            res.status(401).json( { error:'No impementado aun mijo' } );

        } catch(err) {

            res.status(401).json( { error:err.message } );

        }
    }

    function getAll(req,res){

        try {

            res.status(401).json( { error:'No impementado aun mijo' } );

        } catch(err) {

            res.status(401).json( { error:err.message } );

        }

    }

    function updateInfo(req,res){

        try {

            res.status(401).json( { error:'No impementado aun mijo' } );

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