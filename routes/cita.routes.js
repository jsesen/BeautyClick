/**
 * se envia desde la pagina servicios (parametro servicio)
 * GET parametro: servicio , retorna  lista de {año,mes,dia,hora,minutos,trabajador,duracion}
 * 
 * 
 * se envia desde la pagina calendario para guardar la cita
 * POST {año,mes,dia,hora,minutos,servicio,trabajador,cliente}
 * 
 * Desde la pagina login se abre la pagina mis citas 
 * GET parametro: cliente, retorna lista de  {año,mes,dia,hora,minutos,servicio,duracion,trabajador}
 * 
 * FIXME: faltan PUT para modificar citas de cliente y DELETE para borrar desde pagina de mis citas de cliente
 */
'use strict'

const citasController = require('../controllers/user.controller');
//const citasMiddleware = require('../middleware/user.middleware');


exports.citasRoutes = function (app) {
    //retorna citas para un servicio
    app.get('/api/citas-servicio', [citasController.get_citas_servicio]);
    //guardar cita para un servicio, trabajador y cliente
    app.post('/api/cita-trabajador-cliente', [citasController.guardar_cita]);
    // retorna citas de un cliente 
    app.get('/api/citas-cliente', [  citasController.get_citas_cliente]);
    //app.put('/api/upload/user-pic', usersController.uploadUserPic);

}