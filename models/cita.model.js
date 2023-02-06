/**
 * 
 * Definicion se Schemas
 * tabla de citas
 * ------------------
 
 * año | mes | dia| hora | minuto | trabajador | cliente | servicio(object id)
  
 * 
 * tabla categorias
 *    {
        "nombre": "Depilación", 
        "descripcion": "", 
        "foto": "/img/categorias/depilacion.png"
    }
 * Hay que crear dos schemas para trabajador y servicio y apuntar a la coleccion user que representa el cliente
 * servicio
 * --------------
 
 * id | nombre | foto:url+jpg | descripcion | duracion: minutos | categoria
 
 * 
 * trabajador
 * -----
 
 * nombre |descripcion | foto | duracion| categorias(object id categorias)
 * 
 * trabajadorServicio
 * trabajador | servicio
 * */
 
 * id| nombre | apellidos | foto:url+jpg | horario: {dias(1-5) [Hinicio,Hsalida] email | telefono |}
 *
 * 
 * relacion trabajador servicio
 * --------------------------
 * id trabajador | id servicio
 * 
 *  */



'use strict'

const mongoose = require('../common/services/mongoose.service').mongoose;
 
const cliente = require('./user.model');

const citasSchema = new mongoose.Schema({
        
    anio:{
        type:mongoose.Schema.Types.Number
    },
    mes:{
        type:mongoose.Schema.Types.Number
    },
    dia:{
        type:mongoose.Schema.Types.Number
    },
    hora:{
        type:mongoose.Schema.Types.Number
    },
    minutos:{
        type:mongoose.Schema.Types.Number
    },
    trabajador:[{
        type:mongoose.Schema.Types.ObjectId, ref:'Trabajadores'
    }],
    cliente:[{
        type:mongoose.Schema.Types.ObjectId, ref:''
    }],
    servicios:[{
        type:mongoose.Schema.Types.ObjectId, ref:'Servicios'
    }]
   
    

},{versionKey:false})

citasSchema.set('toJSON',{virtuals:false});

const Citas = mongoose.model('citas',citasSchema,'citas');

const trabajadoresSchema = new mongoose.Schema({
        
    nombre:{
        type:mongoose.Schema.Types.String
    },
    apellidos:{
        type:mongoose.Schema.Types.String
    },
    email:{
        type:mongoose.Schema.Types.String
    },
    info:{
        type:mongoose.Schema.Types.String
    },
    servicios:[{
        type:mongoose.Schema.Types.ObjectId, ref:'Servicios'
    }],
    foto:{
        type:mongoose.Schema.Types.String
    }
    

},{versionKey:false})

trabajadoresSchema.set('toJSON',{virtuals:false});

const Trabajadores = mongoose.model('trabajadores',trabajadoresSchema,'trabajadores');

const serviciosSchema = new mongoose.Schema({
        
    nombre:{
        type:mongoose.Schema.Types.String
    },
    duracion:{
        type:mongoose.Schema.Types.Number
    },
    descripcion:{
        type:mongoose.Schema.Types.String
    },
    precio:{
        type:mongoose.Schema.Types.Number
    },
    foto:{
        type:mongoose.Schema.Types.String
    },
    categoria:[{
        type:mongoose.Schema.Types.ObjectId, ref:'Categorias'
    }]

},{versionKey:false})

serviciosSchema.set('toJSON',{virtuals:false});

const Servicios = mongoose.model('servicios',serviciosSchema,'servicios');
 
const { Schema } = mongoose;
const cliente = require('./cliente.model');
const categoriasSchema = new Schema({

    nombre: {
        type: Schema.Types.String
    },
    descripcion: {
        type: Schema.Types.String
    },
    foto: {
        type: Schema.Types.String
    } 

}, { versionKey: false })

categoriasSchema.set('toJSON', { virtuals: false });

const Categorias = mongoose.model('categorias', categoriasSchema, 'categorias');
exports.getCategorias = () => {
    return new Promise((resolve, reject) => {
        Categorias.find({}).exec((error, result) => {
            if (error) {
                reject(error.message);
                throw error.message;
            }
            if (result) {
                resolve(result);
            }
        })
    }).catch(error => {
        throw error.message;
    })
}
 
