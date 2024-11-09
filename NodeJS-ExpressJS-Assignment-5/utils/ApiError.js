const employeeLogger = require("./logger");

class ApiError extends Error{
    constructor(statusCode,message){
        super(message)
        this.statusCode=statusCode
        this.status=`${statusCode}`.startsWith('4')?'Failure':'error'
        employeeLogger.error("Fix URl", { error: message });
        Error.captureStackTrace(this,this.constructor)
    }
}


module.exports=ApiError