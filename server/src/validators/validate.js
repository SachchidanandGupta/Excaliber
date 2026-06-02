const {validationResult} = require("express-validator");
const AppError = require("../utils/appError");

function validate(req,res,next){
    const error =  validationResult(req);
    if(!error.isEmpty()){
       throw new AppError(error[0],400);
    }
    next();
}

module.exports = validate;