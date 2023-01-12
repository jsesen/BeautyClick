/**
 * 
 * Definicion se Schemas
 * tabla de citas
 * ------------------
 * año | mes | dia| hora | minuto | trabajador | cliente | servicio
 * 
 * Hay que crear dos schemas para trabajador y servicio y apuntar a la coleccion user que representa el cliente
 * trabajador
 * --------------
 * nombre | foto | correo electronico | telefono | [servicios]
 * 
 * servicio
 * -----
 * nombre | apellidos | email | telefono | foto | horario {dias [inicio,salida]}
 * */


'use strict'

const mongoose = require('../common/services/mongoose.service').mongoose;
const cliente = require('./user.model');