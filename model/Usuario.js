const TYPES = require('tedious').TYPES;

const Usuario = {

    id_usuario: TYPES.Numeric,
    email: TYPES.VarChar,
    passwd: TYPES.VarChar

};