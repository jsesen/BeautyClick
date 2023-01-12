
const crypto = require('../models/crypto.model');

exports.loginDecrypt = (request,response,next)=>{

    try{
        console.log('received login middleware');
        response.locals.eou = crypto.decryptField(request.body.eou);
        response.locals.password = crypto.decryptField(request.body.password);
        

        if(response.locals.eou !== undefined && response.locals.password !== undefined){
            next();
        }

    }catch(error){
        throw error.message;
    }
    


}

exports.registerDecrypt = (request,response,next)=>{

    try{
        console.log('received register middleware');
        response.locals.name = crypto.decryptField(request.body.name);
        response.locals.username = crypto.decryptField(request.body.username);
        response.locals.user_image = crypto.decryptField(request.body.user_image);
        response.locals.email = crypto.decryptField(request.body.email);
        response.locals.password = crypto.decryptField(request.body.password);
                
        next();
        

    }catch(error){
        throw error.message;
    }
    


}
