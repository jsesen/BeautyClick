'use strict'

const citaModel = require('../models/cita.model'); 
/**
 * 
 * @param {*} request 
 * @param {*} response 
 */
exports.get_categorias = (request, response) => {
    console.log('recibido: GET categorias, request'); 
    citaModel.getCategorias().then((categorias, error) => {
        if (error) {
            throw error.message;
        }
        if (categorias) {
            return response.status(200).send(categorias);
        } else {            
            return response.status(204);//no resultados
        }
    }).catch(error => {
        throw error.message;
    })    
}
exports.get_servicios = (request, response) => {
    console.log('recibido: GET servicios, request'); 
    citaModel.getServicios(request.params.id).then((servicios, error) => { 
        
        if (error) {
            throw error.message;
        }
        if (servicios) {
            return response.status(200).send(servicios);
        } else {
            return response.status(204);//no resultados
        }
    }).catch(error => {
        throw error.message;
    })
}
/**
 * TODO: falta implemntar el modelo de datos y la llamada
 *  
 * @param {*} response 
 */
exports.get_trabajadores_servicio = (request, response) => {

    console.log('recibido: GET trabajadores para un servicio, request'); 
    //return response.status(200).send({id:request.params.id});
    citaModel.getTrabajadoresServicio(request.params.id).then((trabajadores, error) => {

        if (error) {
            throw error.message;
        }
        if (trabajadores) {
            return response.status(200).send(trabajadores);
        } else {
            return response.status(204);//no resultados
        }
    }).catch(error => {
        throw error.message;
    })
}
exports.get_citas_trabajador_dia = (request, response) => {

    console.log('recibido: GET citas para un servicio, request');
    return response.status(200).send({id: request.params.id,trabajador:request.query.trabajador});
    /*citaModel.getCitas().then((products, error) => {
        if (error) {
            throw error.message;
        }
        if (citas) {
            return response.status(200).send(products);
        } else {
            //204 no hay resultados
            return response.status(204);
        }
    }).catch(error => {
        throw error.message;
    })
    */
}
exports.get_citas_cliente = (request, response) => {

    console.log('recibido: GET citas para un cliente, request');
    citaModel.getCitas().then((citas, error) => {
        if (error) {
            throw error.message;
        }
        if (citas) {
            return response.status(200).send(products);
        } else {
            //204 no hay resultados
            return response.status(204);
        }
    }).catch(error => {
        throw error.message;
    })
}
exports.guardar_cita = (request, response) => {
    console.log('recibido PUT: guardar cita de cliente, request');
    //se pasan los datos del nuevo producto a traves de request.body.info al productModel 
    //
    citaModel.addCita(request.body.info).then((product, error) => {
        if (error) {
            throw error.message;
        }
        if (product) {
            return response.status(200).send({ info: true });
        } else {
            console.error('error adding product');
            //500 error interno servidor 
            return response.status(500);
        }
    }).catch(error => {
        throw error.message;
    })
    
}

/*
exports.uploadUserPic = (request, response) => {

    console.log('received loginUser request');

    usersModel.updateUserPic(request.body.user_id, request.files.picture.name).then((user, error) => {

        if (error) {
            throw error.message;
        }

        if (user) {

            userFileModel.updateImageUserFile(user._id, request.files.picture).then((result, error) => {

                if (error) {
                    throw error.message;
                }

                if (result) {
                    return response.status(200).send(user);
                }


            })

        } else {
            return response.status(204);
        }

    }).catch(error => {
        throw error.message
    });

}
*/