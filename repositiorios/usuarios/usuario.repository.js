const ConexionBD = require('../../db/sqlserverconnector');
const utility = require('../../db/utility/utility');
const TYPES = require('tedious').TYPES;
const genericResponse = require('../../shared/response');

function UsuarioRepository(){

    /* Metodos de clase */
    
    function interceptGetUser(req,res,next){

        try {

            var bd = new ConexionBD();            
            var parametros = {in:[],out:[]};

            if(req.params.usuarioid){
                
                parametros.in.push({ name:'idUsuario', type: TYPES.Numeric, val: req.params.usuarioid });
                
                bd.spPostExecute('dbo.feriavirtual_proc_get_info_usuario', parametros,
                    function (error,rowData) {
                                                
                        if(error) { //Hay error
                            throw {message:'No se pudo mijo: ' + error.message};
                        }
                        else if(Object.keys(rowData).length == 0){ //No hay datos

                            req.data = { usuario:null };
                            return next();
                        }
                        else { //Hay datos

                            req.data = { usuario:rowData[0] };
                            return next();

                        }

                    }    
                );

            } else {

                throw {message:'No se pudo mijo, no existe el parametro :usuarioid'};

            }


        } catch(err){

            console.error(err.message);
            res.status(401).json({error:'No se pudo mijo'});
        }
    }

    function getUser(req,res){
        res.status(200).json(req.data);
    }

    function getAll(req,res){
        
        try {

            res.status(401).json( { error:'No impementado aun mijo' } );

        } catch(err) {

            res.status(401).json( { error:err.message } );

        }

    }

    function updateUser(req,res){

        try {

            res.status(401).json( { error:'No impementado aun mijo' } );

        } catch(err) {

            res.status(401).json( { error:err.message } );

        }

    }

    /* Campos de clase */
    return {
        interceptGetUser,
        getUser,
        getAll,
        updateUser
    };
}

module.exports = UsuarioRepository;