/**
 * 
 * Definicion se Schemas
 * tabla de citas
 * ------------------
 * id | año | mes | dia| hora | minuto | id trabajador | id cliente | id servicio
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