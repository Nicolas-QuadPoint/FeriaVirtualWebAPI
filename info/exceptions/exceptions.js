
const RecordNotFoundException = 
{ code : 404, name : "RecordNotFoundException", message : "The record has not found in the collection."};

const InvalidCredentialsException = 
{ code : 401, name : "InvalidCredentialsException", message : "Either email or password are not correct."};

const InvalidArgumentException = 
{ code : 400, name : "InvalidArgumentException", message : "The data sended are not match the required by the method"};

const DatabaseErrorException = 
{ code : 500, name : "DatabaseErrorException", message : "An error in the database has ocurred"};

const MethodNotImplementedException =
{ code : 501, name : "MethodNotImplementedException", message : "Aún no implementado, mijo"};

const APIException =
{ code : 500, name : "APIException", message : "API internal error, check the log!"};

const InvalidAccessException = 
{ code : 403, name : "InvalidAccessException", message : "You tried to access without autentication. This is not allowed."};

const MethodGoneException = 
{ code : 410, name : "MethodGoneException", message : "This method will be removed in future release. Please, update your application"};

function Exception(code,name,message){

    this.code = code;
    this.name = name;
    this.message = message;

    return this;
}


module.exports = {
    Exception,
    RecordNotFoundException,
    InvalidCredentialsException,
    InvalidArgumentException,
    DatabaseErrorException,
    InvalidAccessException,
    MethodGoneException,
    MethodNotImplementedException,
    APIException
};