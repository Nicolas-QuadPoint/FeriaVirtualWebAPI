
export const RecordNotFoundException = 
{ code : 404, name : "RecordNotFoundException", message : "The record was not found in the collection."};

export const InvalidCredentialsException = 
{ code : 401, name : "InvalidCredentialsException", message : "Either email or password are not correct."};

export const InvalidArgumentException = 
{ code : 400, name : "InvalidArgumentException", message : "The data sended are not match the required by the method"};

export const DatabaseErrorException = 
{ code : 500, name : "DatabaseErrorException", message : "An error in the database has ocurred"};

export const MethodNotImplementedException =
{ code : 501, name : "MethodNotImplementedException", message : "Aún no implementado, mijo"};

export const APIException =
{ code : 500, name : "APIException", message : "API internal error, check the log!"};

export const InvalidAccessException = 
{ code : 403, name : "InvalidAccessException", message : "You tried to access without autentication. This is not allowed."};

export const MethodGoneException = 
{ code : 410, name : "MethodGoneException", message : "This method will be removed in future release. Please, update your application"};

export class Exception {

    code = 0;
    name = 'Exception';
    message = 'Generic Exception';

    constructor(code,name,message){
        this.code = code;
        this.name = name;
        this.message = message;
    }

}


export default {
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