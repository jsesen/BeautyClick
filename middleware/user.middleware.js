
const crypto = require('../models/crypto.model');

exports.loginDecrypt = (request,response,next)=>{

    try{
        console.log('received login middleware');
        response.locals = crypto.processLogin(request.body.data,request.body.s,request.body.sign);
               

        if(response.locals !== null){
            
            next();
        }else{
            return response.status(500).send({msg:'error'});
        }
       
    }catch(error){
        throw error.message;
    }
    


}

exports.registerDecrypt = (request,response,next)=>{

    try{
        console.log('received register middleware');
        response.locals = crypto.processRegister(request.body.data,request.body.s,request.body.sign);
                
        next();
        

    }catch(error){
        throw error.message;
    }
    


}
