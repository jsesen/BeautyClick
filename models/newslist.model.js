'use strict'

const mongoose = require('../common/services/mongoose.service').mongoose;
const { Schema } = mongoose;

const newslistSchema = new Schema({
        
    email:{
        type: Schema.Types.String
    }    

},{versionKey:false})

newslistSchema.set('toJSON',{virtuals:false});

const Newslist = mongoose.model('newslist',newslistSchema,'newslist');

exports.isEmailSubscribed = (email)=>{

    return new Promise((resolve,reject)=>{

        console.log('received email', email);        
        email = email.toLowerCase();        

        Newslist.findOne({email : email}).exec((error,result)=>{
            
            if(error){
                console.log('vamos a reject');
                reject(error.message);
                console.log('vamos a throw');
                throw error.message;
            }            
            if(result){
                console.log('Result es: ', result);
                resolve(result);
            }else{
                resolve(undefined);
            }
        })
 
    }).catch(error=>{
        throw error.message;
    })
          
}



exports.addEmail = (email)=>{

    return new Promise((resolve,reject)=>{

        console.log('received email', email);                
        email = email.toLowerCase();        

        const emailNewslist = new Newslist({email:email});

        emailNewslist.save().then(result =>{
                        
            if(result){
                resolve(result);
            }else{
                resolve(undefined);
            }
        }).catch(error=>{ throw error.message; })

    }).catch(error=>{
        throw error.message;
    })
       
    
}

exports.deleteEmail = (email)=>{

    return new Promise((resolve,reject)=>{

        console.log('received email', email);                
        email = email.toLowerCase();        
        
        Newslist.deleteMany({email:email}).exec((error,result)=>{
            
            if(error){
                console.log('vamos a reject');
                reject(error.message);
                console.log('vamos a throw');
                throw error.message;
            }            
            if(result){
                console.log('Result es: ', result);
                resolve(result);
            }else{
                resolve(undefined);
            }
        })
 
    }).catch(error=>{
        throw error.message;
    })

       
    
}