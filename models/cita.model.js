/**
 * 
 * Definicion se Schemas
 * tabla de citas
 * ------------------
 
 * año | mes | dia| hora | minuto | trabajador | cliente | servicio(object id)
  
 * 
 * Hay que crear dos schemas para trabajador y servicio y apuntar a la coleccion user que representa el cliente
 * trabajador
 * --------------
 
 * id | nombre | foto:url+jpg | descripcion | duracion: minutos | categoria
 
 * 
 * servicio
 * -----
 
 * nombre |descripcion | foto | duracion| categorias(object id categorias)
 * 
 * trabajadorServicio
 * trabajador | servicio
 * 
 
// * id| nombre | apellidos | foto:url+jpg | horario: {dias(1-5) [Hinicio,Hsalida] email | telefono |}
 //*
 //* 
 //* relacion trabajador servicio
 //* --------------------------
 //* id trabajador | id servicio
 //* 
 //*  */


'use strict'

const mongoose = require('../common/services/mongoose.service').mongoose; 
 
const { Schema } = mongoose;
const cliente = require('./cliente.model');
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
 

const categoriasSchema = new Schema({

    nombre: {
        type: Schema.Types.String
    },
    minutos:{
        type:mongoose.Schema.Types.Number
    },
    foto: {
        type: Schema.Types.String
    }

}, { versionKey: false })

categoriasSchema.set('toJSON', { virtuals: false });

const Categorias = mongoose.model('categorias', categoriasSchema, 'categorias');

serviciosSchema.set('toJSON',{virtuals:false});
 
/**
 * 
 * @returns lista de categorias
 */
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
 
/**
 * 
 * @param {*} id de la categoria a la que pertenece el servicio
 * @returns servicios que pertencen a la categoria del parametro id
 */
exports.getServicios = async (id_categoria) => {
    try {
        return await new Promise((resolve, reject) => {
            Servicios.find().populate({ model: 'categoria', match: { _id: id_categoria } }).exec((error, result_1) => {
                if (error) {
                    reject(error.message);
                    throw error.message;
                }
                if (result_1) {
                    resolve(result_1);
                }
            });
        });
    } catch (error_1) {
        throw error_1.message;
    }
}
