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
 * nombre | foto | correo electronico | telefono | [servicios] | horario {dias [inicio,salida]}
 * 
 * servicio
 * -----
 * nombre |descripcion | foto | duracion| categorias(object id categorias)
 * 
 * trabajadorServicio
 * trabajador | servicio
 * */


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