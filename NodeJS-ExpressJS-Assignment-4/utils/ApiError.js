const urlShortenerLogger=require('./logger');

class ApiError extends Error{
    constructor(statusCode,message) {
        super(message);
        this.statusCode=statusCode;
        this.status=`${statusCode}`.startsWith('4')?'Failure':'Error';
        urlShortenerLogger.error("API Error",{error: message});
        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports=ApiError;
