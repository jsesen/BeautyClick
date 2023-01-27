'use strict'

const usersModel = require('../models/user.model');
const userFileModel = require('../models/userfile.model');


exports.registerUser = (request,response)=>{

    console.log('received register user request');

    usersModel.registerUser(response.locals).then((user,error)=>{

        if(error){
            throw error.message;
        }

        if(user){

            userFileModel.createDirectory(user).then((res,error)=>{
                
                if(error){
                    throw error.message;
                }
                
                if(res){
                    return response.status(200).send({info:true});
                }               
                
                
            }).catch(error=>{
                throw error.message;
            })
           
        }else{
            return response.status(204);
        }

    }).catch(error=>{
        throw error.message
    });

}

exports.loginUser = (request,response)=>{

    console.log('received loginUser request');
    console.log('response locals: ',response.locals);

    usersModel.loginUser(response.locals).then((user,error)=>{

        if(error){
            throw error.message;
        }

        if(user !== null){
            return response.status(200).send(user);
        }else{
            return response.status(204).send(null);
        }

    }).catch(error=>{
        throw error.message
    });

}

exports.uploadUserPic = (request,response)=>{

    console.log('received loginUser request');    

    usersModel.updateUserPic(request.body.user_id,request.files.picture.name).then((user,error)=>{

        if(error){
            throw error.message;
        }

        if(user){

            userFileModel.updateImageUserFile(user._id,request.files.picture).then((result,error)=>{
                
                if(error){
                    throw error.message;
                }

                if(result){
                    return response.status(200).send(user);
                }
                
               
            })
            
        }else{
            return response.status(204);
        }

    }).catch(error=>{
        throw error.message
    });

}